import { fireEvent, render, screen } from "@testing-library/react";

import { PokemonItem } from "../_components/PokemonItem";

const mockPokemon = {
  id: 1,
  name: "Pikachu",
  image: "/pikachu.png",
};

const mockPokemonWithNoImage = {
  id: 1,
  name: "Pikachu",
  image: "",
};

describe("PokemonItem", () => {
  it("renders pokemon item correctly", () => {
    const props = {
      pokemon: mockPokemon,
      isSelected: false,
      onChange: jest.fn(),
    };

    render(<PokemonItem {...props} />);

    const pokemon = screen.getByAltText(mockPokemon.name);

    expect(pokemon).toBeInTheDocument();
  });

  it("renders PokemonItem without image", () => {
    const props = {
      pokemon: mockPokemonWithNoImage,
      isSelected: false,
      onChange: jest.fn(),
    };

    render(<PokemonItem {...props} />);

    const placeholderText = screen.getByText(
      `${mockPokemon.name} image place holder`
    );

    expect(placeholderText).toBeInTheDocument();
  });

  it("trigers change event on input", () => {
    const props = {
      pokemon: mockPokemon,
      isSelected: false,
      onChange: jest.fn(),
    };

    render(<PokemonItem {...props} />);

    const input = screen.getByRole("radio", { name: /pikachu/i });

    fireEvent.click(input);

    expect(props.onChange).toHaveBeenCalled();
  });
});
