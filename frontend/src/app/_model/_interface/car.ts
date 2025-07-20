import { Model } from './model';

export interface Cars {
  id: string;
  vin: string;
  assembly_date: string;
  status: string;
  model_id: Model;
}
