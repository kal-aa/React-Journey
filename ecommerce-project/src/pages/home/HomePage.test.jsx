import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HomePage from "./HomePage";
import axios from "axios";
import userEvent from "@testing-library/user-event";

vi.mock("axios");

describe("HomePage component", () => {
  let loadCart;
  let user;

  beforeEach(() => {
    loadCart = vi.fn();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/products") {
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"],
            },
          ],
        };
      }
    });

    user = userEvent.setup();
  });

  it("displays the products correctly", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const productContainers = await screen.findAllByTestId("product-container");
    expect(productContainers.length).toBe(2);

    const productOneName = within(productContainers[0]).getByText(
      "Black and Gray Athletic Cotton Socks - 6 Pairs",
    );
    expect(productOneName).toBeInTheDocument();

    const productTwoName = within(productContainers[1]).getByText(
      "Intermediate Size Basketball",
    );
    expect(productTwoName).toBeInTheDocument();
  });

  it("adds product to the cart", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const productContainers = await screen.findAllByTestId("product-container");

    function elements(element, index) {
      return within(productContainers[index]).getByTestId(element);
    }
    const firstQuantitySelector = elements("quantity-selector", 0);
    const secondQuantitySelector = elements("quantity-selector", 1);

    await user.selectOptions(firstQuantitySelector, "2");
    await user.selectOptions(secondQuantitySelector, "3");

    const firstAddToCartButton = elements("add-to-cart-button", 0);
    const secondAddToCartButton = elements("add-to-cart-button", 1);

    await user.click(firstAddToCartButton);
    await user.click(secondAddToCartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    });

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 3,
    });

    expect(loadCart).toHaveBeenCalledTimes(2);
  });
});
