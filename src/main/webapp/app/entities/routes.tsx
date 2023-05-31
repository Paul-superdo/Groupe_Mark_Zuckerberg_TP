import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Rule from './rule';
import Profile from './profile';
import Ingredient from './ingredient';
import Categorie from './categorie';
import Recipe from './recipe';
import Comments from './comments';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="rule/*" element={<Rule />} />
        <Route path="profile/*" element={<Profile />} />
        <Route path="ingredient/*" element={<Ingredient />} />
        <Route path="categorie/*" element={<Categorie />} />
        <Route path="recipe/*" element={<Recipe />} />
        <Route path="comments/*" element={<Comments />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
