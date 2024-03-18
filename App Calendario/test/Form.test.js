import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Question from "../ruta/a/Question";
import {
  actualizarPeso,
  actualizarPreferencias,
  verPreferencias,
} from "../ruta/a/api/ASUserPreferences";

jest.mock("../ruta/a/api/ASUserPreferences", () => ({
  actualizarPeso: jest.fn(),
  actualizarPreferencias: jest.fn(),
  verPreferencias: jest.fn(),
}));

describe("Componente Question", () => {
  beforeEach(() => {
    actualizarPeso.mockClear();
    actualizarPreferencias.mockClear();
    verPreferencias.mockClear();
  });

  it("renderiza el componente correctamente sin campo de texto", async () => {
    const navigationMock = { navigate: jest.fn() };
    const routeMock = {
      params: {
        question: "¿Cual es tu peso?",
        next: "SiguientePregunta",
        backgroundColor: "white",
        answer1: "Respuesta 1",
        answer2: "Respuesta 2",
        answer3: "Respuesta 3",
        answer4: "Respuesta 4",
        text: false,
        placeholder: "",
        secondColor: "black",
      },
      name: "Pregunta",
    };

    const { getByText } = render(
      <Question navigation={navigationMock} route={routeMock} />
    );

    fireEvent.press(getByText("Respuesta 1"));

    await waitFor(() => {
      expect(actualizarPeso).toHaveBeenCalledWith("Respuesta 1");
      expect(navigationMock.navigate).toHaveBeenCalledWith("SiguientePregunta");
    });
  });

  it("renderiza el componente correctamente con campo de texto", async () => {
    const navigationMock = { navigate: jest.fn() };
    const routeMock = {
      params: {
        question: "¿Cuál es tu nombre?",
        next: "SiguientePregunta",
        backgroundColor: "white",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        text: true,
        placeholder: "Ingresa tu nombre",
        secondColor: "black",
      },
      name: "Pregunta",
    };

    const { getByPlaceholderText, getByText } = render(
      <Question navigation={navigationMock} route={routeMock} />
    );

    const input = getByPlaceholderText("Ingresa tu nombre");
    fireEvent.changeText(input, "John Doe");

    fireEvent.press(getByText("Siguiente"));

    await waitFor(() => {
      expect(actualizarPreferencias).toHaveBeenCalledWith(
        "Pregunta",
        "John Doe"
      );
      expect(navigationMock.navigate).toHaveBeenCalledWith("SiguientePregunta");
    });
  });

  it("llama a verPreferencias al montar el componente", async () => {
    const navigationMock = { navigate: jest.fn() };
    const routeMock = {
      params: {
        question: "¿Cual es tu peso?",
        next: "SiguientePregunta",
        backgroundColor: "white",
        answer1: "Respuesta 1",
        answer2: "Respuesta 2",
        answer3: "Respuesta 3",
        answer4: "Respuesta 4",
        text: false,
        placeholder: "",
        secondColor: "black",
      },
      name: "Pregunta",
    };

    const { getByText } = render(
      <Question navigation={navigationMock} route={routeMock} />
    );

    await waitFor(() => {
      expect(verPreferencias).toHaveBeenCalled();
    });
  });
});
