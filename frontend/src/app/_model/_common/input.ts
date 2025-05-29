export interface GenInput {
  label: string;
  icon: string;
  type:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'date'
    | 'time'
    | 'tel'
    | 'url'
    | 'select';
  placeholder: string;
  formControlName: string;
  labelKey?: string;
  valueKey?: string;
  options?: any[];
}
