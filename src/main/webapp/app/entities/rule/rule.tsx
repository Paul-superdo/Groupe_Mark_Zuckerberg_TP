import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IRule } from 'app/shared/model/rule.model';
import { getEntities } from './rule.reducer';

export const Rule = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const ruleList = useAppSelector(state => state.rule.entities);
  const loading = useAppSelector(state => state.rule.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="rule-heading" data-cy="RuleHeading">
        <Translate contentKey="recipeFoodApp.rule.home.title">Rules</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="recipeFoodApp.rule.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/rule/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="recipeFoodApp.rule.home.createLabel">Create new Rule</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {ruleList && ruleList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="recipeFoodApp.rule.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="recipeFoodApp.rule.ruleName">Rule Name</Translate>
                </th>
                <th>
                  <Translate contentKey="recipeFoodApp.rule.ruleDescription">Rule Description</Translate>
                </th>
                <th>
                  <Translate contentKey="recipeFoodApp.rule.creationDate">Creation Date</Translate>
                </th>
                <th>
                  <Translate contentKey="recipeFoodApp.rule.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ruleList.map((rule, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/rule/${rule.id}`} color="link" size="sm">
                      {rule.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`recipeFoodApp.MyRule.${rule.ruleName}`} />
                  </td>
                  <td>{rule.ruleDescription}</td>
                  <td>{rule.creationDate}</td>
                  <td>{rule.user ? rule.user.id : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/rule/${rule.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/rule/${rule.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/rule/${rule.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="recipeFoodApp.rule.home.notFound">No Rules found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Rule;
