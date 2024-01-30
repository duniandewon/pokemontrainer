import { Berry } from "@/Domain/berries/Model/Berry";
import { BerryEntity } from "../Entity/BerryEntity";

export function entityToBerriesDto(BerryEntity: BerryEntity): Berry {
  return {
    data: BerryEntity.data.pokemon_v2_berry.map((berry) => ({
      id: berry.pokemon_v2_item.id,
      name: berry.pokemon_v2_item.name,
      firmness: berry.pokemon_v2_berryfirmness.name,
      image: berry.pokemon_v2_item.pokemon_v2_itemsprites[0].sprites.default,
    })),
    meta: {
      hasNext: BerryEntity.meta.hasNext,
      nextOffset: BerryEntity.meta.nextOffset,
    },
  };
}
