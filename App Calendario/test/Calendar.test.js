import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Calendar from "../ruta/a/Calendar";
import { getCalendar } from "../ruta/a/api/ASCalendar";

jest.mock("../ruta/a/api/ASCalendar", () => ({
  getCalendar: jest.fn(),
}));

describe("Componente Calendar", () => {
  beforeEach(() => {
    getCalendar.mockClear();
  });

  it("renderiza el componente correctamente", async () => {
    getCalendar.mockReturnValueOnce({
      "2024-01-28": [{ name: "Desayuno", extra: "Extra 1" }],
      "2024-01-29": [{ name: "Almuerzo", extra: "Extra 2" }],
    });

    const { getByText, getByTestId } = render(<Calendar />);

    await waitFor(() => {
      expect(getByText("Desayuno")).toBeDefined();
      expect(getByTestId("item-2024-01-28")).toBeDefined();
      expect(getByText("Almuerzo")).toBeDefined();
      expect(getByTestId("item-2024-01-29")).toBeDefined();
    });
  });

  it("navega a PlanDetail cuando se presiona un elemento", async () => {
    getCalendar.mockReturnValueOnce({
      "2024-01-28": [{ name: "Desayuno", extra: "Extra 1" }],
    });

    const mockNavigation = { navigate: jest.fn() };
    const { getByTestId } = render(<Calendar navigation={mockNavigation} />);
    const item = getByTestId("item-2024-01-28");
    item.props.onPress();

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith("PlanDetail", {
        extra: "Extra 1",
        date: "2024-01-28",
      });
    });
  });
});
