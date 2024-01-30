import { BerryEntity } from "./Api/Entity/BerryEntity";

export interface BerriesDataSource {
  getBerries(limit: number, offset: number): Promise<BerryEntity>;
}
