import dayjs from "dayjs";
import { useState } from "react";
import { formatMoney } from "../../utils/money";
import axios from "axios";
import DeliveryOptions from "./DeliveryOptions";

export default function CartItemContainer({
  cartItem,
  deliveryOptions,
  loadCart,
}) {
  const [quantity, setQuantity] = useState(1);
  const [isUpdateQutntity, setIsUpdateQuantity] = useState(false);

  const selectedDeliveryOption = deliveryOptions.find(
    (deliveryOption) => deliveryOption.id === cartItem.deliveryOptionId,
  );

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  ("START HERE, NOT UPDATING PROPELY");

  const updateCartQuantity = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity,
      deliveryOptionId: cartItem.deliveryOptionId,
    });

    await loadCart();
  };

  return (
    <div key={cartItem.id} className="cart-item-container">
      <div className="delivery-date">
        Delivery date:{" "}
        {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
          "dddd, MMMM D",
        )}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={cartItem.product.image} />

        <div className="cart-item-details">
          <div className="product-name">{cartItem.product.name}</div>
          <div className="product-price">
            {formatMoney(cartItem.product.priceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity:{" "}
              <span className="quantity-label">
                {!isUpdateQutntity && cartItem.quantity}
              </span>
            </span>
            <span
              className="update-quantity-link link-primary"
              onClick={() => setIsUpdateQuantity(true)}
            >
              {isUpdateQutntity ? (
                <input
                  type="number"
                  style={{ width: "20%" }}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      await updateCartQuantity();
                      setIsUpdateQuantity(false);
                    }
                  }}
                />
              ) : (
                "Update"
              )}
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={deleteCartItem}
            >
              Delete
            </span>
          </div>
        </div>

        <DeliveryOptions
          cartItem={cartItem}
          deliveryOptions={deliveryOptions}
          loadCart={loadCart}
        />
      </div>
    </div>
  );
}
