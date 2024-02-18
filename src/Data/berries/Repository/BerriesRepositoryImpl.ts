import { BerriesRepository } from "@/Domain/berries/Repository/berry.repository";

import { BerriesDataSource } from "../DataSource/BerriesDataSource";
import { entityToBerriesDto } from "../DataSource/Api/Dto/entityToBerriesDto";
import { berriesApiImpl } from "../DataSource/Api/BerriesApiImpl";

export function berriesRepositoryImpl(
  dataSource: BerriesDataSource = berriesApiImpl()
): BerriesRepository {
  const getBerries = async (limit: number, offset: number) => {
    const berries = await dataSource.getBerries(limit, offset);

    return entityToBerriesDto(berries);
  };

  return {
    getBerries,
  };
}
