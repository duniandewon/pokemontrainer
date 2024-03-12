import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Page from "../page";

import "@/__mocks__/intersectionObserverMock";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../usePokemonsVM", () => ({
  usePokemonsVM: () => ({
    pokemons: [
      { id: 1, name: "Bulbasaur" },
      { id: 2, name: "Charmander" },
    ],
    hasNext: true,
    selectedPokemon: -1,
    onSearchPokemons: jest.fn(),
    onSelectPokemon: jest.fn(),
    choosePokemon: jest.fn(),
    fetchNextPage: jest.fn(),
  }),
}));

describe("Page", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  it("renders properly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );
  });

  it("renders a list of pokemon", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );

    const bulbasaur = screen.getByAltText("Bulbasaur");

    expect(bulbasaur).toBeInTheDocument();
  });
});
