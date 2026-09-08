import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

export default function DeliveryOptions({
  deliveryOptions,
  cartItem,
  setCart,
}) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>

      {deliveryOptions.map((deliveryOption) => {
        let priceString = "FREE SHIPPING";

        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)} - shipping`;
        }
        return (
          <div key={deliveryOption.id} className="delivery-option">
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() =>
                setCart((prevCart) =>
                  prevCart.map((cart) =>
                    cart.productId === cartItem.productId
                      ? {
                          ...cart,
                          deliveryOptionId: deliveryOption.id,
                        }
                      : cart,
                  ),
                )
              }
              className="delivery-option-input"
              name={`deliver-option${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM, D",
                )}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
