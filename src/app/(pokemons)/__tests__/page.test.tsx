import { fireEvent, getByText, render, screen } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Page from "../page";

import "@/__mocks__/intersectionObserverMock";
import { usePokemonsVM } from "../usePokemonsVM";

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
    const { asFragment } = render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );

    expect(asFragment).toMatchSnapshot();
  });

  it("renders a list of pokemon", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );

    const list = screen.getAllByRole("listitem");

    expect(list.length).toEqual(2);
  });

  it("searches for pokemons", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );

    const input = screen.getByPlaceholderText("Search pokemons");

    fireEvent.change(input, { target: { value: "Pikachu" } });

    expect(input).toHaveValue("Pikachu");
  });
});
