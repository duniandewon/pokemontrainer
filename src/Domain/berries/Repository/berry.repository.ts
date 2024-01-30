import { Berry } from "../Model/Berry";

export interface BerriesRepository {
  getBerries(limit: number, offset:number): Promise<Berry>;
}
