export interface CarModel {
  id: string;
  name: string;
  generation: number;
  release_year: number;
}
export function isCarModel(obj: any): obj is CarModel {
  return (
    !!obj &&
    typeof obj === 'object' &&
    'release_year' in obj &&
    'generation' in obj &&
    typeof obj.release_year === 'number' &&
    typeof obj.generation === 'number' &&
    'id' in obj &&
    'name' in obj
  );
}
