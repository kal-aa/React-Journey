import { Link, useParams } from "react-router";
import Header, { type HeaderProps } from "../components/Header";
import "./TrackingPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export type Product = {
  id: string;
  name: string;
  image: string;
  keywords: string[];
  rating: {
    stars: number;
    count: number;
  };
};

export type OrderProduct = {
  productId: string;
  quantity: number;
  estimatedDeliveryTimeMs: number;
  product: Product;
};

export type Order = {
  id: string;
  orderTimeMs: number;
  totalCostCents: number;
  products: OrderProduct[];
  createdAt: string;
  updatedAt: string;
};

export default function TrackingPage({ cart }: HeaderProps) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setOrder(response.data);
    };

    fetchOrderData();
  }, [orderId]);

  if (!order) return null;

  const orderProduct = order.products.find(
    (product) => product.productId === productId,
  );

  if (!orderProduct) return null;

  // There is something wrong here
  const totalDeliveryTime =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  const deliveryPercent = (timePassedMs / totalDeliveryTime) * 100;

  let status = "";
  if (deliveryPercent < 33) status = "isPreparing";
  else if (deliveryPercent < 100) status = "isShipped";
  else status = "isDelivered";
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
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${
                status === "isPreparing" && "current-status"
              }`}
            >
              Preparing
            </div>
            <div
              className={`progress-label ${
                status === "isShipped" && "current-status"
              }`}
            >
              Shipped
            </div>
            <div
              className={`progress-label ${
                status === "isDelivered" && "current-status"
              }`}
            >
              Delivered
            </div>
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
