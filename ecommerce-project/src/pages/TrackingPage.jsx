import { Link, useParams } from "react-router";
import Header from "../components/Header";
import "./TrackingPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export default function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setOrder(response.data);
    };

    fetchOrderData();
  }, [orderId, productId]);

  if (!order) return null;

  const product = order.products.find(
    (product) => product.productId === productId,
  );

  // There is something wrong here
  const totalDeliveryTime = product.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  const deliveryPercent = (timePassedMs / totalDeliveryTime) * 100;

  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="https://supersimple.dev/images/tracking-favicon.png"
      />

      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent > 100 ? "Arrived on" : "Arriving on"}{" "}
            {dayjs(product.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">{product.product.name}</div>

          <div className="product-info">Quantity: {product.quantity}</div>

          <img className="product-image" src={product.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
