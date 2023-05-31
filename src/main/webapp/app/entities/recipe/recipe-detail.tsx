import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './recipe.reducer';

export const RecipeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const recipeEntity = useAppSelector(state => state.recipe.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="recipeDetailsHeading">
          <Translate contentKey="recipeFoodApp.recipe.detail.title">Recipe</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="recipeFoodApp.recipe.name">Name</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="recipeFoodApp.recipe.description">Description</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.description}</dd>
          <dt>
            <span id="cookingTime">
              <Translate contentKey="recipeFoodApp.recipe.cookingTime">Cooking Time</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.cookingTime}</dd>
          <dt>
            <span id="rate">
              <Translate contentKey="recipeFoodApp.recipe.rate">Rate</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.rate}</dd>
          <dt>
            <span id="imageUrl">
              <Translate contentKey="recipeFoodApp.recipe.imageUrl">Image Url</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.imageUrl}</dd>
          <dt>
            <span id="creationDate">
              <Translate contentKey="recipeFoodApp.recipe.creationDate">Creation Date</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.creationDate}</dd>
          <dt>
            <Translate contentKey="recipeFoodApp.recipe.categorie">Categorie</Translate>
          </dt>
          <dd>{recipeEntity.categorie ? recipeEntity.categorie.id : ''}</dd>
          <dt>
            <Translate contentKey="recipeFoodApp.recipe.ingredient">Ingredient</Translate>
          </dt>
          <dd>{recipeEntity.ingredient ? recipeEntity.ingredient.id : ''}</dd>
          <dt>
            <Translate contentKey="recipeFoodApp.recipe.user">User</Translate>
          </dt>
          <dd>{recipeEntity.user ? recipeEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/recipe" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/recipe/${recipeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default RecipeDetail;
