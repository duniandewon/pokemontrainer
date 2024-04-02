import { ReactNode } from "react";
import { act } from "react-dom/test-utils";
import { renderHook, waitFor } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useChoosePokemon } from "../useChoosePokemon";
import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockPokemon = {
  id: 1,
  image: "/pokemon.png",
  maxWeight: 20,
  name: "pokemon",
  nextEvolution: 2,
  prevMeal: "",
  stats: {
    attack: 1,
    defense: 2,
    hp: 3,
    speed: 4,
    weight: 5,
  },
};

const prevPokemon = {
  id: 2,
  image: "/bulbasaur.png",
  maxWeight: 15,
  name: "bulbasaur",
  nextEvolution: 3,
  prevMeal: "",
  stats: {
    attack: 2,
    defense: 3,
    hp: 4,
    speed: 5,
    weight: 6,
  },
};

describe("useChoosePokemon", () => {
  it("calls mutate function with pokemon parameter", async () => {
    queryClient.setQueryData(["my-pokemon"], prevPokemon);

    const { result } = renderHook(() => useChoosePokemon(), { wrapper });

    await act(() => result.current.mutateAsync(mockPokemon));

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toBe(true);

    expect(queryClient.getQueryData<PokemonDetail>(["my-pokemon"])).toEqual(
      mockPokemon
    );
  });

  // it("restores previous pokemon on error", async () => {
  //   const setQueryDataMock = jest.fn();

  //   queryClient.setQueryData = setQueryDataMock;

  //   queryClient.setQueryData(["my-pokemon"], prevPokemon);

  //   const { result } = renderHook(() => useChoosePokemon(), { wrapper });

  //   jest.spyOn(result.current, "mutateAsync").mockImplementationOnce(() => {
  //     throw new Error("Choose Pokemon Failed");
  //   });

  //   await act(() => result.current.mutateAsync(mockPokemon));

  //   await waitFor(() => result.current.isError);

  //   expect(setQueryDataMock).toHaveBeenCalledWith(["my-pokemon"], prevPokemon);
  // });
});
