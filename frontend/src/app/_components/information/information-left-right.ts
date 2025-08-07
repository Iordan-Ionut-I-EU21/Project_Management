export interface InformationLeftRight {
  left: Information[];
  right: Information[];
}

interface Information {
  name: string;
  icon: string;
  answer: string;
}
