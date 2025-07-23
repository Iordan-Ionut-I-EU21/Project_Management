import { Model } from './model';

export interface Cars {
  id: string;
  vin: string;
  assembly_date: string;
  status: string;
  model_id: Model;
}
export function isCars(obj: any): obj is Cars {
  return (
    !!obj &&
    typeof obj === 'object' &&
    'model_id' in obj &&
    obj.model_id &&
    typeof obj.model_id.id === 'string'
  );
}
