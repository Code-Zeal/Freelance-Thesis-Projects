import React from "react";
import { render, fireEvent } from "react-native-testing-library";
import Progress from "./Progress";

describe("Componente Progress", () => {
  it("renderiza correctamente el gráfico de línea", () => {
    const { getByTestId } = render(<Progress />);
    const lineChart = getByTestId("line-chart");
    expect(lineChart).toBeDefined();
  });

  it("muestra el peso actual", () => {
    const { getByText } = render(<Progress />);
    const pesoActual = getByText("Peso actual:");
    expect(pesoActual).toBeDefined();
  });

  it("abre el modal al presionar el botón de actualizar peso", () => {
    const { getByText, getByTestId } = render(<Progress />);
    const actualizarPesoButton = getByText("Actualizar Peso");
    fireEvent.press(actualizarPesoButton);
    const modal = getByTestId("weight-modal");
    expect(modal).toBeDefined();
  });

  it("actualiza el peso correctamente", () => {
    const { getByText, getByTestId } = render(<Progress />);
    const actualizarPesoButton = getByText("Actualizar Peso");
    fireEvent.press(actualizarPesoButton);
    const input = getByTestId("weight-input");
    fireEvent.changeText(input, "75");
    const guardarButton = getByText("Guardar");
    fireEvent.press(guardarButton);
    const pesoActualizado = getByText("75 kg");
    expect(pesoActualizado).toBeDefined();
  });
});
