import { useEffect, useState } from "react";
import CheckoutHeader from "./CheckoutHeader";
import axios from "axios";
import "./CheckoutPage.css";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";

export default function CheckoutPage({ cart, setCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);

      response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };

    fetchCheckoutData();
  }, []);

  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="https://supersimple.dev/images/cart-favicon.png"
      />
      <title>Checkout</title>

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          {deliveryOptions.length > 0 && (
            <OrderSummary
              deliveryOptions={deliveryOptions}
              cart={cart}
              setCart={setCart}
            />
          )}

          {paymentSummary && <PaymentSummary paymentSummary={paymentSummary} />}
        </div>
      </div>
    </>
  );
}
