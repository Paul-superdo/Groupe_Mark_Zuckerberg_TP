import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Rule from './rule';
import RuleDetail from './rule-detail';
import RuleUpdate from './rule-update';
import RuleDeleteDialog from './rule-delete-dialog';

const RuleRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Rule />} />
    <Route path="new" element={<RuleUpdate />} />
    <Route path=":id">
      <Route index element={<RuleDetail />} />
      <Route path="edit" element={<RuleUpdate />} />
      <Route path="delete" element={<RuleDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default RuleRoutes;
