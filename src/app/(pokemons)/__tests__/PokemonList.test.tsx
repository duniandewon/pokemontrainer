import { render, screen } from "@testing-library/react";

import { PokemonsList } from "../_components/PokemonsList";

import "@/__mocks__/intersectionObserverMock";

const mockPokemons = [
  { id: 1, name: "Pikachu", image: "/pikachu.png" },
  { id: 2, name: "Charmander", image: "/charmander.png" },
  { id: 3, name: "Bulbasaur", image: "/bulbasaur.png" },
];

describe("PokemonList", () => {
  it("renders a list of pokemon", () => {
    const props = {
      pokemons: mockPokemons,
      selectedPokemonId: 1,
      onLoadMore: jest.fn(),
      onSelectPokemon: jest.fn(),
    };

    render(<PokemonsList {...props} />);

    const list = screen.getAllByRole("listitem");

    expect(list.length).toEqual(3);
  });
});
