import { IUser } from 'app/shared/model/user.model';
import { IRecipe } from 'app/shared/model/recipe.model';

export interface IComments {
  id?: number;
  contenteText?: string | null;
  date?: string | null;
  user?: IUser | null;
  recipe?: IRecipe | null;
}

export const defaultValue: Readonly<IComments> = {};
