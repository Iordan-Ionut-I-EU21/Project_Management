import { CarsStatus } from '../../_model/_enum/cars-status';
import { MachineStatus } from '../../_model/_enum/machine-status';
import { ProcessLogStatus } from '../../_model/_enum/process-log-status';
import { Cars } from '../../_model/_interface/car';

export type VALIDATE_STATUS = MachineStatus | ProcessLogStatus | CarsStatus;
