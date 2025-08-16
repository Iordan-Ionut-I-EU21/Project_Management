import { Cars } from '../_model/_interface/car';
import { Machines } from '../_model/_interface/machine';
import { ProcessLog } from '../_model/_interface/process-log';
import { User } from '../_model/_interface/user';

export type ViewData = ProcessLog | Cars | Machines | User;
