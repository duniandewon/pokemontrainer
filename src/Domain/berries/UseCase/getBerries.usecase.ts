import { berriesRepositoryImpl } from "@/Data/berries/Repository/BerriesRepositoryImpl";
import { Berries } from "../Model/Berry";

import { BerriesRepository } from "../Repository/berry.repository";

export interface GetBerriesUseCase {
  invoke(limit: number, offset: number): Promise<Berries>;
}

export function getBerriesUseCase(
  berriesRepo: BerriesRepository = berriesRepositoryImpl()
): GetBerriesUseCase {
  const invoke = async (limit: number, offset: number) => {
    const berries = await berriesRepo.getBerries(limit, offset);

    return berries;
  };

  return { invoke };
}
