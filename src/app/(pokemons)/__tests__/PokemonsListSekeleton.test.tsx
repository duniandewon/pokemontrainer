import { render } from "@testing-library/react";
import { PokemonsListSekeleton } from "../_components/PokemonsListSekeleton";

describe("PokemonsListSekeleton", () => {
  it("renders PokemonsListSekeleton correctly", () => {
    render(<PokemonsListSekeleton />);
  });
});
