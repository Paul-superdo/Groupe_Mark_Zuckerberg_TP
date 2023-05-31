import rule from 'app/entities/rule/rule.reducer';
import profile from 'app/entities/profile/profile.reducer';
import ingredient from 'app/entities/ingredient/ingredient.reducer';
import categorie from 'app/entities/categorie/categorie.reducer';
import recipe from 'app/entities/recipe/recipe.reducer';
import comments from 'app/entities/comments/comments.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  rule,
  profile,
  ingredient,
  categorie,
  recipe,
  comments,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
