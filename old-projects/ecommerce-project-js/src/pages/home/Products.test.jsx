import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Product from "./Product";
import axios from "axios";

vi.mock("axios"); // mock the entire mock axios npm

describe("Product component", () => {
  let product;
  let loadCart;
  let user;

  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

    loadCart = vi.fn();

    user = userEvent.setup();
  });

  it("displays the product details correctly", () => {
    const ratingImgSrc = `images/ratings/rating-${product.rating.stars * 10}.png`;

    render(<Product product={product} loadCart={loadCart} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText("$10.90")).toBeInTheDocument();
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      product.image,
    );
    expect(screen.getByTestId("product-rating-stars-image")).toHaveAttribute(
      "src",
      ratingImgSrc,
    );
    expect(screen.getByText("87")).toBeInTheDocument();
  });

  it("Adds a product to the cart", async () => {
    render(<Product product={product} loadCart={loadCart} />);

    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: product.id,
      quantity: 1,
    });
    expect(loadCart).toHaveBeenCalled();
  });

  it("selects a quantity", async () => {
    render(<Product loadCart={loadCart} product={product} />);

    const quantitySelector = screen.getByTestId("quantity-selector");
    expect(quantitySelector).toHaveValue("1");

    await user.selectOptions(quantitySelector, "3");
    expect(quantitySelector).toHaveValue("3");

    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: product.id,
      quantity: 3,
    });

    expect(loadCart).toHaveBeenCalled();
  });
});
