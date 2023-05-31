import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IIngredient } from 'app/shared/model/ingredient.model';
import { getEntity, updateEntity, createEntity, reset } from './ingredient.reducer';

export const IngredientUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const ingredientEntity = useAppSelector(state => state.ingredient.entity);
  const loading = useAppSelector(state => state.ingredient.loading);
  const updating = useAppSelector(state => state.ingredient.updating);
  const updateSuccess = useAppSelector(state => state.ingredient.updateSuccess);

  const handleClose = () => {
    navigate('/ingredient');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...ingredientEntity,
      ...values,
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
          ...ingredientEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="recipeFoodApp.ingredient.home.createOrEditLabel" data-cy="IngredientCreateUpdateHeading">
            <Translate contentKey="recipeFoodApp.ingredient.home.createOrEditLabel">Create or edit a Ingredient</Translate>
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
                  id="ingredient-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('recipeFoodApp.ingredient.name')}
                id="ingredient-name"
                name="name"
                data-cy="name"
                type="text"
              />
              <ValidatedField
                label={translate('recipeFoodApp.ingredient.description')}
                id="ingredient-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('recipeFoodApp.ingredient.portions')}
                id="ingredient-portions"
                name="portions"
                data-cy="portions"
                type="text"
              />
              <ValidatedField
                label={translate('recipeFoodApp.ingredient.creationDate')}
                id="ingredient-creationDate"
                name="creationDate"
                data-cy="creationDate"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/ingredient" replace color="info">
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

export default IngredientUpdate;
