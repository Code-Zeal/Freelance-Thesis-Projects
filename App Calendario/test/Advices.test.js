import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Advices from "../ruta/al/Advices";
import { obtenerConsejos } from "../ruta/al/api/ASFeeling";

jest.mock("../ruta/al/api/ASFeeling", () => ({
  obtenerConsejos: jest.fn(),
}));

describe("Componente Advices", () => {
  beforeEach(() => {
    obtenerConsejos.mockClear();
  });

  it("renderiza el componente correctamente", async () => {
    obtenerConsejos.mockResolvedValueOnce([
      { consejo: "Consejo 1", imagen: "imagen1.jpg" },
      { consejo: "Consejo 2", imagen: "imagen2.jpg" },
    ]);

    const { getByText, getByTestId } = render(<Advices />);

    await waitFor(() => {
      expect(getByText("Consejos para ti")).toBeDefined();
      expect(getByTestId("advice-0")).toBeDefined();
      expect(getByTestId("advice-1")).toBeDefined();
    });
  });

  it("navega a AdviceForm cuando se presiona el botón", async () => {
    obtenerConsejos.mockResolvedValueOnce([]);

    const { getByTestId } = render(<Advices />);
    const button = getByTestId("advice-form-button");
    button.props.onPress();

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith("AdviceForm");
    });
  });
});
