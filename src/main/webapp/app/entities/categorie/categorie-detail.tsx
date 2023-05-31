import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './categorie.reducer';

export const CategorieDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const categorieEntity = useAppSelector(state => state.categorie.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="categorieDetailsHeading">
          <Translate contentKey="recipeFoodApp.categorie.detail.title">Categorie</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{categorieEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="recipeFoodApp.categorie.name">Name</Translate>
            </span>
          </dt>
          <dd>{categorieEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="recipeFoodApp.categorie.description">Description</Translate>
            </span>
          </dt>
          <dd>{categorieEntity.description}</dd>
          <dt>
            <span id="creationDate">
              <Translate contentKey="recipeFoodApp.categorie.creationDate">Creation Date</Translate>
            </span>
          </dt>
          <dd>{categorieEntity.creationDate}</dd>
        </dl>
        <Button tag={Link} to="/categorie" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/categorie/${categorieEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CategorieDetail;
