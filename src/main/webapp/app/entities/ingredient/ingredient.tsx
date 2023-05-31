import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IIngredient } from 'app/shared/model/ingredient.model';
import { getEntities } from './ingredient.reducer';

export const Ingredient = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const ingredientList = useAppSelector(state => state.ingredient.entities);
  const loading = useAppSelector(state => state.ingredient.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="ingredient-heading" data-cy="IngredientHeading">
        <Translate contentKey="recipeFoodApp.ingredient.home.title">Ingredients</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="recipeFoodApp.ingredient.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/ingredient/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="recipeFoodApp.ingredient.home.createLabel">Create new Ingredient</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {ingredientList && ingredientList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="recipeFoodApp.ingredient.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="recipeFoodApp.ingredient.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="recipeFoodApp.ingredient.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="recipeFoodApp.ingredient.portions">Portions</Translate>
                </th>
                <th>
                  <Translate contentKey="recipeFoodApp.ingredient.creationDate">Creation Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ingredientList.map((ingredient, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/ingredient/${ingredient.id}`} color="link" size="sm">
                      {ingredient.id}
                    </Button>
                  </td>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.description}</td>
                  <td>{ingredient.portions}</td>
                  <td>{ingredient.creationDate}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/ingredient/${ingredient.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/ingredient/${ingredient.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/ingredient/${ingredient.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="recipeFoodApp.ingredient.home.notFound">No Ingredients found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Ingredient;
