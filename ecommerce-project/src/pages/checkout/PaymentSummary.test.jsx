import { beforeEach, describe, expect, it, vi } from "vitest";
import PaymentSummary from "./PaymentSummary";
import { MemoryRouter } from "react-router";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("axios");

describe("PaymentSummary component", () => {
  let loadCart;
  let paymentSummary;
  let user;

  beforeEach(() => {
    loadCart = vi.fn();
    paymentSummary = {
      totalItems: 6,
      productCostCent: 6672,
      shippingCostCents: 0,
      totalCostBeforeTaxCents: 6672,
      taxCents: 667,
      totalCostCents: 7339,
    };

    user = userEvent.setup();
  });

  it("renders payment summary", async () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const placeOrderButton = screen.getByTestId("place-order-button");
    await user.click(placeOrderButton);

    expect(screen.getByTestId("shipping-money")).toHaveTextContent("$0");
    expect(screen.getByTestId("tax-money")).toHaveTextContent("$6.67");
    expect(screen.getByTestId("total-money")).toHaveTextContent("$73.39");
    expect(axios.post).toHaveBeenCalledWith("/api/orders");
  });
});
