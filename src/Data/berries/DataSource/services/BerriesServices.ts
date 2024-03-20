import { Response } from "@/Data/shared/Response";

import { Data } from "../Entity/Berries";

export interface BerriesServices {
  getBerries(limit: number, offset: number): Promise<Response<Data>>;
}
