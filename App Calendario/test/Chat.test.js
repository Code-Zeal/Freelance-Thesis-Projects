import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Chat from "./Chat"; // Asegúrate de que la ruta al componente sea correcta

// Mocks necesarios para las librerías utilizadas en el componente
jest.mock("expo-font");
jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));
jest.mock("moment/locale/es", () => jest.requireActual("moment/locale/es"));

describe("<Chat />", () => {
  let useFontsSpy, useEffectSpy;

  beforeEach(() => {
    // Mock de useFonts
    useFontsSpy = jest.spyOn(require("expo-font"), "useFonts");
    useFontsSpy.mockReturnValue([true]);

    // Mock del global setTimeout para controlar la API asincrónica
    jest.useFakeTimers();

    // Mock de useEffect para inicializar el componente correctamente
    useEffectSpy = jest.spyOn(React, "useEffect");
    useEffectSpy.mockImplementation((f) => f());
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("renderiza correctamente después de cargar las fuentes", () => {
    const { getByText } = render(<Chat />);

    // Verificar que el mensaje inicial se renderiza
    expect(getByText("¡Hola! ¿En qué puedo ayudarte?")).toBeTruthy();
  });

  it("maneja el envío de un nuevo mensaje", () => {
    const { getByText } = render(<Chat />);
    const pregunta = "¿Qué es la anorexia nerviosa?";

    fireEvent.press(getByText(pregunta));

    // Avanzar los timers para simular la respuesta después del timeout
    jest.advanceTimersByTime(1500);

    // Verificar que el mensaje de respuesta se haya enviado
    expect(
      getByText(/la anorexia nerviosa es un trastorno alimenticio/)
    ).toBeTruthy();
  });

  // Añadir más pruebas según la lógica y las funcionalidades de tu componente
});
