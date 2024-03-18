import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Articles from "../ruta/a/Articles";
import { getArticles } from "../ruta/a/api/extraInfo";

jest.mock("../ruta/a/api/extraInfo", () => ({
  getArticles: jest.fn(),
}));

describe("Componente Articles", () => {
  beforeEach(() => {
    getArticles.mockClear();
  });

  it("renderiza el componente correctamente", async () => {
    getArticles.mockReturnValueOnce([
      { title: "Artículo 1", image: "imagen1.jpg" },
      { title: "Artículo 2", image: "imagen2.jpg" },
    ]);

    const { getByText, getByTestId } = render(<Articles />);

    await waitFor(() => {
      expect(getByText("Artículos")).toBeDefined();
      expect(getByTestId("article-0")).toBeDefined();
      expect(getByTestId("article-1")).toBeDefined();
    });
  });

  it("navega a Article cuando se presiona el artículo", async () => {
    getArticles.mockReturnValueOnce([]);

    const mockNavigation = { navigate: jest.fn() };
    const { getByTestId } = render(<Articles navigation={mockNavigation} />);
    const article = getByTestId("article-0");
    article.props.onPress();

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith(
        "Article",
        expect.any(Object)
      );
    });
  });
});
