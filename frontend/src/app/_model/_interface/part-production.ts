import { isMachine, Machines } from './machine';
import { isParts, Parts } from './parts';

export interface PartProduction {
  id: string;
  produced_date: string;
  quantity: number;
  machine_id: Machines;
  part_id: Parts;
}

export function isPartProduction(obj: any): obj is PartProduction {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.produced_date === 'string' &&
    typeof obj.quantity === 'number' &&
    isMachine(obj.machine_id) &&
    isParts(obj.part_id)
  );
}
