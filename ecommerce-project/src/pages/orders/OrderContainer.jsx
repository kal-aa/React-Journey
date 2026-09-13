import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import { Fragment } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function OrderContainer({ order, loadCart }) {
  const navigate = useNavigate();

  const buyAgain = async (productId) => {
    console.log("hi");
    await axios.post(`/api/cart-items`, {
      productId,
      quantity: 1,
    });

    await loadCart();

    navigate("/checkout");
  };

  return (
    <div className="order-container">
      <div className="order-header">
        <div className="order-header-left-section">
          <div className="order-date">
            <div className="order-header-label">Order Placed:</div>
            <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
          </div>
          <div className="order-total">
            <div className="order-header-label">Total:</div>
            <div>{formatMoney(order.totalCostCents)}</div>
          </div>
        </div>

        <div className="order-header-right-section">
          <div className="order-header-label">Order ID:</div>
          <div>{order.id}</div>
        </div>
      </div>

      <div className="order-details-grid">
        {/* start here */}

        {order.products.map((orderProduct) => {
          const product = orderProduct.product;

          return (
            <Fragment key={orderProduct.productId}>
              <div className="product-image-container">
                <img src={product.image} />
              </div>

              <div className="product-details">
                <div className="product-name">{product.name}</div>
                <div className="product-delivery-date">
                  Arriving on:{" "}
                  {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
                </div>
                <div className="product-quantity">
                  Quantity: {orderProduct.quantity}
                </div>
                <button
                  className="buy-again-button button-primary"
                  onClick={() => buyAgain(product.id)}
                >
                  <img
                    className="buy-again-icon"
                    src="images/icons/buy-again.png"
                  />
                  <span className="buy-again-message">Add to Cart</span>
                </button>
              </div>

              <div className="product-actions">
                <a href={`/tracking/${order.id}/${product.id}`}>
                  <button className="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
