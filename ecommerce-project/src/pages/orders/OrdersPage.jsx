import { Fragment, useEffect, useState } from "react";
import Header from "../../components/Header";
import "./OrdersPage.css";
import axios from "axios";
import OrderContainer from "./OrderContainer";

export default function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
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
            return <OrderContainer key={order.id} order={order} />;
          })}
        </div>
      </div>
    </>
  );
}
