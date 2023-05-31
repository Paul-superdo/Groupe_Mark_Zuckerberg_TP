export interface IIngredient {
  id?: number;
  name?: string | null;
  description?: string | null;
  portions?: number | null;
  creationDate?: string | null;
}

export const defaultValue: Readonly<IIngredient> = {};
