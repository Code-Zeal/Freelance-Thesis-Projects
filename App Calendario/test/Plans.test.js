import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Plans from "../ruta/a/Plans";
import { GetPlans } from "../ruta/a/api/getPlans";

jest.mock("../ruta/a/api/getPlans", () => ({
  GetPlans: jest.fn(),
}));

describe("Componente Plans", () => {
  beforeEach(() => {
    GetPlans.mockClear();
  });

  it("renderiza el componente correctamente", async () => {
    GetPlans.mockReturnValueOnce([
      { nombre: "Plan 1", imagen: "imagen1.jpg" },
      { nombre: "Plan 2", imagen: "imagen2.jpg" },
    ]);

    const { getByText, getByTestId } = render(<Plans />);

    await waitFor(() => {
      expect(getByText("Planes")).toBeDefined();
      expect(getByTestId("plan-0")).toBeDefined();
      expect(getByTestId("plan-1")).toBeDefined();
    });
  });

  it("navega a Plan cuando se presiona el plan", async () => {
    GetPlans.mockReturnValueOnce([]);

    const mockNavigation = { navigate: jest.fn() };
    const { getByTestId } = render(<Plans navigation={mockNavigation} />);
    const plan = getByTestId("plan-0");
    plan.props.onPress();

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith(
        "Plan",
        expect.any(Object)
      );
    });
  });
});
