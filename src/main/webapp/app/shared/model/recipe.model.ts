import { ICategorie } from 'app/shared/model/categorie.model';
import { IIngredient } from 'app/shared/model/ingredient.model';
import { IUser } from 'app/shared/model/user.model';

export interface IRecipe {
  id?: number;
  name?: string | null;
  description?: string | null;
  cookingTime?: string | null;
  rate?: number | null;
  imageUrl?: string | null;
  creationDate?: string | null;
  categorie?: ICategorie | null;
  ingredient?: IIngredient | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IRecipe> = {};
