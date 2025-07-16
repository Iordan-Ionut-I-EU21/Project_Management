import { Model } from "./model";

export interface Car {
  id: string;
  vin: string;
  assembly_date: string;
  status: string;
  model_id: Model;
}
