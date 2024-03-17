import { ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { VirtualizedList } from "../VirtualizedList";

const mockedPokemons = [
  { id: 1, name: "Bulbasaur", image: "/bulbasaur.png" },
  { id: 2, name: "Charmander", image: "/charmander.png" },
  { id: 3, name: "Squirtle", image: "/squirtle.png" },
];

const mockedSelectedPokemonId = 1;
const mockedHasNext = true;
const mockedOnLoadMore = jest.fn();
const mockedOnSelectPokemon = jest.fn();

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

describe("VirtualizedList", () => {
  it("renders a list of pokemons", () => {
    render(
      <VirtualizedList
        pokemons={mockedPokemons}
        selectedPokemonId={mockedSelectedPokemonId}
        hasNext={mockedHasNext}
        onLoadMore={mockedOnLoadMore}
        onSelectPokemon={mockedOnSelectPokemon}
      />
    );

    mockedPokemons.forEach((pokemon) => {
      expect(screen.getByAltText(pokemon.name)).toBeInTheDocument();
    });
  });

    it("calls onSelectPokemon when a pokemon is clicked", () => {
      render(
        <VirtualizedList
          pokemons={mockedPokemons}
          selectedPokemonId={mockedSelectedPokemonId}
          hasNext={mockedHasNext}
          onLoadMore={mockedOnLoadMore}
          onSelectPokemon={mockedOnSelectPokemon}
        />
      );

      fireEvent.click(screen.getByAltText("Bulbasaur"));

      expect(mockedOnSelectPokemon).toHaveBeenCalledWith(1);
    });
});
