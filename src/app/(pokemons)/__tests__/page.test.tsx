import { ReactNode } from "react";

import { render, screen } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Page from "../page";


jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../usePokemonsVM", () => ({
  usePokemonsVM: () => ({
    pokemons: [
      { id: 1, name: "Bulbasaur", image: "/bulbasaur.png" },
      { id: 2, name: "Charmander", image: "/charmander.png" },
      { id: 3, name: "Squirtle", image: "/squirtle.png" },
    ],
    hasNext: true,
    selectedPokemon: -1,
    onSearchPokemons: jest.fn(),
    onSelectPokemon: jest.fn(),
    choosePokemon: jest.fn(),
    fetchNextPage: jest.fn(),
  }),
}));

type AutoSizerModule = typeof import("react-virtualized-auto-sizer");

jest.mock<AutoSizerModule>("react-virtualized-auto-sizer", () => ({
  __esModule: true,
  ...jest.requireActual<AutoSizerModule>("react-virtualized-auto-sizer"),
  default: jest.fn().mockImplementation(({ children }) => {
    return (children as (size: { width: number; height: number }) => ReactNode)(
      {
        width: 500,
        height: 1000,
      }
    );
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

    const bulbasaur = screen.getByAltText("Bulbasaur");

    expect(bulbasaur).toBeInTheDocument();
  });
});
