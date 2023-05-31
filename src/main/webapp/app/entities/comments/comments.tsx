import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IComments } from 'app/shared/model/comments.model';
import { getEntities } from './comments.reducer';

export const Comments = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const commentsList = useAppSelector(state => state.comments.entities);
  const loading = useAppSelector(state => state.comments.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="comments-heading" data-cy="CommentsHeading">
        <Translate contentKey="recipeFoodApp.comments.home.title">Comments</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="recipeFoodApp.comments.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/comments/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="recipeFoodApp.comments.home.createLabel">Create new Comments</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {commentsList && commentsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="recipeFoodApp.comments.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="recipeFoodApp.comments.contenteText">Contente Text</Translate>
                </th>
                <th>
                  <Translate contentKey="recipeFoodApp.comments.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="recipeFoodApp.comments.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="recipeFoodApp.comments.recipe">Recipe</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {commentsList.map((comments, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/comments/${comments.id}`} color="link" size="sm">
                      {comments.id}
                    </Button>
                  </td>
                  <td>{comments.contenteText}</td>
                  <td>{comments.date}</td>
                  <td>{comments.user ? comments.user.id : ''}</td>
                  <td>{comments.recipe ? <Link to={`/recipe/${comments.recipe.id}`}>{comments.recipe.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/comments/${comments.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/comments/${comments.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/comments/${comments.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="recipeFoodApp.comments.home.notFound">No Comments found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Comments;
