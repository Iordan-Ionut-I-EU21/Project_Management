import { Machines } from "./machine";
import { Parts } from "./parts";

export interface PartProduction {
  id: string;
  produced_date: string;
  quantity: number;
  machine_id: Machines;
  part_id: Parts;
}