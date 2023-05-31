import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './comments.reducer';

export const CommentsDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const commentsEntity = useAppSelector(state => state.comments.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="commentsDetailsHeading">
          <Translate contentKey="recipeFoodApp.comments.detail.title">Comments</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{commentsEntity.id}</dd>
          <dt>
            <span id="contenteText">
              <Translate contentKey="recipeFoodApp.comments.contenteText">Contente Text</Translate>
            </span>
          </dt>
          <dd>{commentsEntity.contenteText}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="recipeFoodApp.comments.date">Date</Translate>
            </span>
          </dt>
          <dd>{commentsEntity.date}</dd>
          <dt>
            <Translate contentKey="recipeFoodApp.comments.user">User</Translate>
          </dt>
          <dd>{commentsEntity.user ? commentsEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="recipeFoodApp.comments.recipe">Recipe</Translate>
          </dt>
          <dd>{commentsEntity.recipe ? commentsEntity.recipe.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/comments" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/comments/${commentsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CommentsDetail;
