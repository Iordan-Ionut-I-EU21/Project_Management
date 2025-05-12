export interface Alert {
  message: string;
  type: AlertEnum;
}

export enum AlertEnum {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}
