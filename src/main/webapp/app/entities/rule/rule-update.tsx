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
import { IRule } from 'app/shared/model/rule.model';
import { MyRule } from 'app/shared/model/enumerations/my-rule.model';
import { getEntity, updateEntity, createEntity, reset } from './rule.reducer';

export const RuleUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const ruleEntity = useAppSelector(state => state.rule.entity);
  const loading = useAppSelector(state => state.rule.loading);
  const updating = useAppSelector(state => state.rule.updating);
  const updateSuccess = useAppSelector(state => state.rule.updateSuccess);
  const myRuleValues = Object.keys(MyRule);

  const handleClose = () => {
    navigate('/rule');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...ruleEntity,
      ...values,
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
          ruleName: 'Adim',
          ...ruleEntity,
          user: ruleEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="recipeFoodApp.rule.home.createOrEditLabel" data-cy="RuleCreateUpdateHeading">
            <Translate contentKey="recipeFoodApp.rule.home.createOrEditLabel">Create or edit a Rule</Translate>
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
                  id="rule-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('recipeFoodApp.rule.ruleName')}
                id="rule-ruleName"
                name="ruleName"
                data-cy="ruleName"
                type="select"
              >
                {myRuleValues.map(myRule => (
                  <option value={myRule} key={myRule}>
                    {translate('recipeFoodApp.MyRule.' + myRule)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('recipeFoodApp.rule.ruleDescription')}
                id="rule-ruleDescription"
                name="ruleDescription"
                data-cy="ruleDescription"
                type="text"
              />
              <ValidatedField
                label={translate('recipeFoodApp.rule.creationDate')}
                id="rule-creationDate"
                name="creationDate"
                data-cy="creationDate"
                type="text"
              />
              <ValidatedField id="rule-user" name="user" data-cy="user" label={translate('recipeFoodApp.rule.user')} type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/rule" replace color="info">
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

export default RuleUpdate;
