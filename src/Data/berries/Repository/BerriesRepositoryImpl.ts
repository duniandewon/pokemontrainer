import { BerriesRepository } from "@/Domain/berries/Repository/berry.repository";

import { berriesApiImpl } from "../DataSource/api/BerriesApi";
import { BerriesServices } from "../DataSource/services/BerriesServices";
import { mapFromRemote } from "../DataSource/mapper/mapFromRemote";

export function berriesRepositoryImpl(
  dataSource: BerriesServices = berriesApiImpl()
): BerriesRepository {
  const getBerries = async (limit: number, offset: number) => {
    const berries = await dataSource.getBerries(limit, offset);

    return mapFromRemote(berries);
  };

  return {
    getBerries,
  };
}
