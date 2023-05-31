export interface ICategorie {
  id?: number;
  name?: string | null;
  description?: string | null;
  creationDate?: string | null;
}

export const defaultValue: Readonly<ICategorie> = {};
