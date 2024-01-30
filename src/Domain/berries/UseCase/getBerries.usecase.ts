import { Berry } from "../Model/Berry";

import { BerriesRepository } from "../Repository/berry.repository";

interface GetBerriesUseCase {
  invoke(limit: number, offset: number): Promise<Berry>;
}

export function getBerriesUseCase(
  berriesRepo: BerriesRepository
): GetBerriesUseCase {
  const invoke = async (limit: number, offset: number) => {
    const berries = await berriesRepo.getBerries(limit, offset);

    return berries;
  };

  return { invoke };
}
