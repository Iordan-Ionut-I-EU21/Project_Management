import { CANCELLED } from 'dns';

export const Urls = {
  ///MACHINE
  MACHINE_NAME: { url: 'dashboard/machine', code: 'machine_id.name' },
  MACHINE_ID: { url: 'dashboard/machine', code: 'machine_id.id' },

  ///PROCESS
  PROCESS_ID: { url: 'dashboard/process', code: 'id' },

  //CARS
  CARS_VIN: { url: 'dashboard/car', code: 'vin' },
  CARS_ID: { url: 'dashboard/car', code: 'id' },

  //USER
  USER_ID: { url: 'dashboard/user', code: 'employee_id.user_id.id' },
  USER_NAME: { url: 'dashboard/user', code: 'employee_id.user_id.username' },
  USER_EMAIL: { url: 'dashboard/user', code: 'employee_id.user_id.email' },
};
