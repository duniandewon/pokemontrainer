import { Response as RemoteResponse } from "@/Data/shared/Response";
import { Data } from "../Entity/Berries";

import { Berry } from "@/Domain/berries/Model/Berry";
import { Response } from "@/Domain/shared/Response";

export function mapFromRemote(
  BerryEntity: RemoteResponse<Data>
): Response<Berry[]> {
  return {
    data: BerryEntity.data.pokemon_v2_berry.map((berry) => ({
      id: berry.pokemon_v2_item.id,
      name: berry.pokemon_v2_item.name,
      firmness: berry.pokemon_v2_berryfirmness.name,
      image: berry.pokemon_v2_item.pokemon_v2_itemsprites[0].sprites.default,
    })),
    meta: {
      hasNext: BerryEntity.meta?.hasNext || false,
      nextOffset: BerryEntity.meta?.nextOffset || 0,
    },
  };
}
