import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICategorie } from 'app/shared/model/categorie.model';
import { getEntity, updateEntity, createEntity, reset } from './categorie.reducer';

export const CategorieUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const categorieEntity = useAppSelector(state => state.categorie.entity);
  const loading = useAppSelector(state => state.categorie.loading);
  const updating = useAppSelector(state => state.categorie.updating);
  const updateSuccess = useAppSelector(state => state.categorie.updateSuccess);

  const handleClose = () => {
    navigate('/categorie');
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
      ...categorieEntity,
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
          ...categorieEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="recipeFoodApp.categorie.home.createOrEditLabel" data-cy="CategorieCreateUpdateHeading">
            <Translate contentKey="recipeFoodApp.categorie.home.createOrEditLabel">Create or edit a Categorie</Translate>
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
                  id="categorie-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('recipeFoodApp.categorie.name')}
                id="categorie-name"
                name="name"
                data-cy="name"
                type="text"
              />
              <ValidatedField
                label={translate('recipeFoodApp.categorie.description')}
                id="categorie-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('recipeFoodApp.categorie.creationDate')}
                id="categorie-creationDate"
                name="creationDate"
                data-cy="creationDate"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/categorie" replace color="info">
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

export default CategorieUpdate;
