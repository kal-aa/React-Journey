import CartItemContainer from "./CartItemContainer";

export default function OrderSummary({ deliveryOptions, cart, loadCart }) {
  return (
    <div className="order-summary">
      {
        // deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          return (
            <CartItemContainer
              key={cartItem.productId}
              cartItem={cartItem}
              deliveryOptions={deliveryOptions}
              loadCart={loadCart}
            />
          );
        })
      }
    </div>
  );
}
