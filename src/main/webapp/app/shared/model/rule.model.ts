import { IUser } from 'app/shared/model/user.model';
import { MyRule } from 'app/shared/model/enumerations/my-rule.model';

export interface IRule {
  id?: number;
  ruleName?: MyRule | null;
  ruleDescription?: string | null;
  creationDate?: string | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IRule> = {};
