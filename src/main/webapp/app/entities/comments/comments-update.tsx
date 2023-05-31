import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IRecipe } from 'app/shared/model/recipe.model';
import { getEntities as getRecipes } from 'app/entities/recipe/recipe.reducer';
import { IComments } from 'app/shared/model/comments.model';
import { getEntity, updateEntity, createEntity, reset } from './comments.reducer';

export const CommentsUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const recipes = useAppSelector(state => state.recipe.entities);
  const commentsEntity = useAppSelector(state => state.comments.entity);
  const loading = useAppSelector(state => state.comments.loading);
  const updating = useAppSelector(state => state.comments.updating);
  const updateSuccess = useAppSelector(state => state.comments.updateSuccess);

  const handleClose = () => {
    navigate('/comments');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
    dispatch(getRecipes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...commentsEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user.toString()),
      recipe: recipes.find(it => it.id.toString() === values.recipe.toString()),
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
          ...commentsEntity,
          user: commentsEntity?.user?.id,
          recipe: commentsEntity?.recipe?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="recipeFoodApp.comments.home.createOrEditLabel" data-cy="CommentsCreateUpdateHeading">
            <Translate contentKey="recipeFoodApp.comments.home.createOrEditLabel">Create or edit a Comments</Translate>
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
                  id="comments-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('recipeFoodApp.comments.contenteText')}
                id="comments-contenteText"
                name="contenteText"
                data-cy="contenteText"
                type="text"
              />
              <ValidatedField label={translate('recipeFoodApp.comments.date')} id="comments-date" name="date" data-cy="date" type="text" />
              <ValidatedField id="comments-user" name="user" data-cy="user" label={translate('recipeFoodApp.comments.user')} type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="comments-recipe"
                name="recipe"
                data-cy="recipe"
                label={translate('recipeFoodApp.comments.recipe')}
                type="select"
              >
                <option value="" key="0" />
                {recipes
                  ? recipes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/comments" replace color="info">
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

export default CommentsUpdate;
