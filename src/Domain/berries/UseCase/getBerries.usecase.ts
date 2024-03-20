import { berriesRepositoryImpl } from "@/Data/berries/Repository/BerriesRepositoryImpl";

import { BerriesRepository } from "../Repository/berry.repository";
import { Response } from "@/Domain/shared/Response";
import { Berry } from "../Model/Berry";

export interface GetBerriesUseCase {
  invoke(limit: number, offset: number): Promise<Response<Berry[]>>;
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
