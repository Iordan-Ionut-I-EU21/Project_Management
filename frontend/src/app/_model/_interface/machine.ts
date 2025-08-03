import { MachineStatus } from '../_enum/machine-status';

export interface Machines {
  id: string;
  name: string;
  type: string;
  status: MachineStatus;
  last_maintenance: Date;
}
export function isMachine(obj: any): obj is Machines {
  return (
    !!obj &&
    typeof obj === 'object' &&
    'last_maintenance' in obj &&
    obj.last_maintenance &&
    typeof obj.type === 'string'
  );
}
