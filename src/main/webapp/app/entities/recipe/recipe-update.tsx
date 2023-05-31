import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICategorie } from 'app/shared/model/categorie.model';
import { getEntities as getCategories } from 'app/entities/categorie/categorie.reducer';
import { IIngredient } from 'app/shared/model/ingredient.model';
import { getEntities as getIngredients } from 'app/entities/ingredient/ingredient.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IRecipe } from 'app/shared/model/recipe.model';
import { getEntity, updateEntity, createEntity, reset } from './recipe.reducer';

export const RecipeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const categories = useAppSelector(state => state.categorie.entities);
  const ingredients = useAppSelector(state => state.ingredient.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const recipeEntity = useAppSelector(state => state.recipe.entity);
  const loading = useAppSelector(state => state.recipe.loading);
  const updating = useAppSelector(state => state.recipe.updating);
  const updateSuccess = useAppSelector(state => state.recipe.updateSuccess);

  const handleClose = () => {
    navigate('/recipe');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCategories({}));
    dispatch(getIngredients({}));
    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...recipeEntity,
      ...values,
      categorie: categories.find(it => it.id.toString() === values.categorie.toString()),
      ingredient: ingredients.find(it => it.id.toString() === values.ingredient.toString()),
      user: users.find(it => it.id.toString() === values.user.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...recipeEntity,
          categorie: recipeEntity?.categorie?.id,
          ingredient: recipeEntity?.ingredient?.id,
          user: recipeEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="recipeFoodApp.recipe.home.createOrEditLabel" data-cy="RecipeCreateUpdateHeading">
            <Translate contentKey="recipeFoodApp.recipe.home.createOrEditLabel">Create or edit a Recipe</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="recipe-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('recipeFoodApp.recipe.name')} id="recipe-name" name="name" data-cy="name" type="text" />
              <ValidatedField
                label={translate('recipeFoodApp.recipe.description')}
                id="recipe-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('recipeFoodApp.recipe.cookingTime')}
                id="recipe-cookingTime"
                name="cookingTime"
                data-cy="cookingTime"
                type="text"
              />
              <ValidatedField label={translate('recipeFoodApp.recipe.rate')} id="recipe-rate" name="rate" data-cy="rate" type="text" />
              <ValidatedField
                label={translate('recipeFoodApp.recipe.imageUrl')}
                id="recipe-imageUrl"
                name="imageUrl"
                data-cy="imageUrl"
                type="text"
              />
              <ValidatedField
                label={translate('recipeFoodApp.recipe.creationDate')}
                id="recipe-creationDate"
                name="creationDate"
                data-cy="creationDate"
                type="text"
              />
              <ValidatedField
                id="recipe-categorie"
                name="categorie"
                data-cy="categorie"
                label={translate('recipeFoodApp.recipe.categorie')}
                type="select"
              >
                <option value="" key="0" />
                {categories
                  ? categories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="recipe-ingredient"
                name="ingredient"
                data-cy="ingredient"
                label={translate('recipeFoodApp.recipe.ingredient')}
                type="select"
              >
                <option value="" key="0" />
                {ingredients
                  ? ingredients.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="recipe-user" name="user" data-cy="user" label={translate('recipeFoodApp.recipe.user')} type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/recipe" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default RecipeUpdate;
