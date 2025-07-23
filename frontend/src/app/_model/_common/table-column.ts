export interface TableColumn {
  key: string;
  code: string;
  label: string;
  type?: 'text' | 'button' | 'icon' | 'custom' | 'link';
  link?: {
    url: string;
    code: string;
  };
  pipe?: 'date';
  buttons?: {
    buttonText?: string;
    buttonColor?: string;
    icon?: string;
    onClick?: (row: any) => void;
  }[];
  isActive?: boolean;
  passed?: boolean;
}
