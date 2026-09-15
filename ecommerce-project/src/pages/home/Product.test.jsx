import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Product from "./Product";

describe("Product component", () => {
  it("displays the product details correctly", () => {
    const product = {
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

    const loadCart = vi.fn(); // create a fake function (mock)
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
});
