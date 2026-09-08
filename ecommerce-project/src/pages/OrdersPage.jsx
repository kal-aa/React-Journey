import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./OrdersPage.css";
import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../utils/money";

export default function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="https://supersimple.dev/images/orders-favicon.png"
      />
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.TimeMs).format("MMMM D")}</div>
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

                  {order.products.map((product) => {
                    return (
                      <div key={product.id}>
                        <div className="product-image-container">
                          <img src="images/products/athletic-cotton-socks-6-pairs.jpg" />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            Black and Gray Athletic Cotton Socks - 6 Pairs
                          </div>
                          <div className="product-delivery-date">
                            Arriving on: August 15
                          </div>
                          <div className="product-quantity">Quantity: 1</div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <a href="/tracking">
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
