
import { Response } from "@/Domain/shared/Response";
import { Berry } from "../Model/Berry";

export interface BerriesRepository {
  getBerries(limit: number, offset: number): Promise<Response<Berry[]>>;
}
