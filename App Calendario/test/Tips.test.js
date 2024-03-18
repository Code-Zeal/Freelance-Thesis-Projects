import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Tips from "../ruta/a/Tips";
import { getTips } from "../ruta/a/api/extraInfo";

jest.mock("../ruta/a/api/extraInfo", () => ({
  getTips: jest.fn(),
}));

describe("Componente Tips", () => {
  beforeEach(() => {
    getTips.mockClear();
  });

  it("renderiza el componente correctamente", async () => {
    getTips.mockReturnValueOnce([
      { title: "Consejo 1", image: "imagen1.jpg" },
      { title: "Consejo 2", image: "imagen2.jpg" },
    ]);

    const { getByText, getByTestId } = render(<Tips />);

    await waitFor(() => {
      expect(getByText("Tips")).toBeDefined();
      expect(getByTestId("tip-0")).toBeDefined();
      expect(getByTestId("tip-1")).toBeDefined();
    });
  });

  it("navega a Tip cuando se presiona el consejo", async () => {
    getTips.mockReturnValueOnce([]);

    const mockNavigation = { navigate: jest.fn() };
    const { getByTestId } = render(<Tips navigation={mockNavigation} />);
    const tip = getByTestId("tip-0");
    tip.props.onPress();

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith(
        "Tip",
        expect.any(Object)
      );
    });
  });
});
