import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './rule.reducer';

export const RuleDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const ruleEntity = useAppSelector(state => state.rule.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="ruleDetailsHeading">
          <Translate contentKey="recipeFoodApp.rule.detail.title">Rule</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.id}</dd>
          <dt>
            <span id="ruleName">
              <Translate contentKey="recipeFoodApp.rule.ruleName">Rule Name</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.ruleName}</dd>
          <dt>
            <span id="ruleDescription">
              <Translate contentKey="recipeFoodApp.rule.ruleDescription">Rule Description</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.ruleDescription}</dd>
          <dt>
            <span id="creationDate">
              <Translate contentKey="recipeFoodApp.rule.creationDate">Creation Date</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.creationDate}</dd>
          <dt>
            <Translate contentKey="recipeFoodApp.rule.user">User</Translate>
          </dt>
          <dd>{ruleEntity.user ? ruleEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/rule" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/rule/${ruleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default RuleDetail;
