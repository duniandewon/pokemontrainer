import { Berries } from "../Model/Berry";

export interface BerriesRepository {
  getBerries(limit: number, offset: number): Promise<Berries>;
}
