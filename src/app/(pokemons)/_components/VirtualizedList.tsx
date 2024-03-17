import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";

import { Pokemon } from "@/Domain/pokemon/Model/Pokemon";
import { useCallback, useMemo } from "react";
import { PokemonItem } from "./PokemonItem";

interface Props {
  pokemons: Pokemon[];
  selectedPokemonId: number;
  hasNext: boolean;
  onLoadMore: () => void;
  onSelectPokemon: (pokemonId: number) => void;
}

export function VirtualizedList({
  pokemons,
  selectedPokemonId,
  hasNext,
  onLoadMore,
  onSelectPokemon,
}: Props) {
  const isItemsLoaded = useCallback(
    (index: number) => !hasNext || !!pokemons[index],
    [hasNext, pokemons]
  );

  const itemCount = useMemo(
    () => (hasNext ? pokemons.length + 1 : pokemons.length),
    [hasNext, pokemons.length]
  );

  const getIndex = useCallback(
    (rowIndex: number, columnIndex: number) => rowIndex * 4 + columnIndex,
    []
  );

  return (
    <div className="h-full w-full">
      <AutoSizer
        defaultWidth={500}
        style={{ height: "100%", position: "relative", width: "100%" }}
      >
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemsLoaded}
            itemCount={itemCount}
            loadMoreItems={onLoadMore}
          >
            {({ onItemsRendered, ref }) => (
              <Grid
                ref={ref}
                columnCount={4}
                columnWidth={width / 4}
                rowHeight={100}
                rowCount={pokemons.length}
                width={width}
                height={height}
                onItemsRendered={({
                  visibleRowStartIndex,
                  visibleRowStopIndex,
                  visibleColumnStartIndex,
                  visibleColumnStopIndex,
                  overscanRowStopIndex,
                  overscanRowStartIndex,
                  overscanColumnStopIndex,
                  overscanColumnStartIndex,
                }) => {
                  onItemsRendered({
                    overscanStartIndex: getIndex(
                      overscanRowStartIndex,
                      overscanColumnStartIndex
                    ),
                    overscanStopIndex: getIndex(
                      overscanRowStopIndex,
                      overscanColumnStopIndex
                    ),
                    visibleStartIndex: getIndex(
                      visibleRowStartIndex,
                      visibleColumnStartIndex
                    ),
                    visibleStopIndex: getIndex(
                      visibleRowStopIndex,
                      visibleColumnStopIndex
                    ),
                  });
                }}
              >
                {({ rowIndex, columnIndex, style }) => {
                  const index = getIndex(rowIndex, columnIndex);

                  const pokemon = pokemons[index];

                  if (!pokemon) return;

                  return (
                    <div style={style}>
                      <PokemonItem
                        onClick={onSelectPokemon}
                        pokemon={pokemon}
                        isSelected={pokemon.id === selectedPokemonId}
                      />
                    </div>
                  );
                }}
              </Grid>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
}
