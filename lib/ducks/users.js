import assign from 'lodash/object/assign';
import union from 'lodash/array/union';
import without from 'lodash/array/without';
import Authorizer from '@ftbl/authorize';
import { RESOURCE } from '@ftbl/resource';
import { entitiesSelector, LIMIT } from '@ftbl/entities';
import { memberSelector } from './members';
import { SIGN_OUT_SUCCESS } from '@ftbl/session-web';
import { Schema, normalize, arrayOf } from 'normalizr';

export const schema = new Schema('users');

export const FETCH = 'ftbl/member/users/FETCH';
export const FETCH_SUCCESS = 'ftbl/member/users/FETCH_SUCCESS';
export const FETCH_FAILED = 'ftbl/member/users/FETCH_FAILED';

export const ADD = 'ftbl/member/users/ADD';
export const ADD_SUCCESS = 'ftbl/member/users/ADD_SUCCESS';
export const ADD_FAILED = 'ftbl/member/users/ADD_FAILED';

export const REMOVE = 'ftbl/member/users/REMOVE';
export const REMOVE_SUCCESS = 'ftbl/member/users/REMOVE_SUCCESS';
export const REMOVE_FAILED = 'ftbl/member/users/REMOVE_FAILED';

export const INVITE = 'ftbl/member/users/INVITE';
export const INVITE_SUCCESS = 'ftbl/member/users/INVITE_SUCCESS';
export const INVITE_FAILED = 'ftbl/member/users/INVITE_FAILED';

const initialState = { 
  fetching: false
, fetched: false
, inviting: false
, data: []
, error: null 
, meta: { 
    query: { 
      limit: LIMIT 
    }
  }
};

const ERRORS = {
  500: 'Server error'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case FETCH:
    return assign({}, state, { fetching: true, fetched: false, error: null });

  case FETCH_SUCCESS:
    return assign({}, state, { data: action.payload.result, fetching: false, fetched: true, meta: action.meta });

  case FETCH_FAILED:
    return assign({}, state, { fetching: false, fetched: false, error: ERRORS[action.payload.status] });

  case INVITE:
    return assign({}, state, { inviting: true });

  case ADD_SUCCESS:
  case INVITE_SUCCESS:
    return assign({}, state, { inviting: false, data: union(state.data, [ action.payload.result ]) });

  case REMOVE_SUCCESS:
    return assign({}, state, { data: without(state.data, action.meta.user.id) });

  case ADD_FAILED:
  case REMOVE_FAILED:
  case INVITE_FAILED:
    return assign({}, state, { inviting: false, fetching: false, error: ERRORS[action.payload.status] });

  case SIGN_OUT_SUCCESS:
    return initialState;

  default:
    return state;
  }
};

export const usersSelector = entitiesSelector(state => state.member.users, 'users');

export function fetch(member, query = { page: 1, limit: LIMIT }) {
  if (member == null) return;

  return {
    [RESOURCE]: {
      types: [ FETCH, FETCH_SUCCESS, FETCH_FAILED ]
    , payload: {
        url: `/members/${member.id}/users`
      , method: 'get'
      , query
      , normalize: r => normalize(r.users, arrayOf(schema))
      }
    , meta: { query }
    }
  };
};

export function search(query) {
  return (dispatch, getState) => {
    const member = memberSelector(getState());

    return dispatch(fetch(member, query));
  }
};

export function list(member) {
  return (dispatch, getState) => {
    const state = usersSelector(getState());

    if (state.data.length) return;

    return dispatch(fetch(member));
  }
};

export function add(member, user, right) {
  if (right == null) right = Authorizer.permissions.ReadOnly;

  return {
    [RESOURCE]: {
      types: [ ADD, ADD_SUCCESS, ADD_FAILED ]
    , payload: {
        url: `/members/${member.id}/users`
      , method: 'post'
      , data: { user: { id: user.id }, right }
      , normalize: r => normalize(r.user, schema)
      }
    }
  };
};

export function invite(member, email, right) {
  if (right == null) right = Authorizer.permissions.ReadOnly;

  return {
    [RESOURCE]: {
      types: [ INVITE, INVITE_SUCCESS, INVITE_FAILED ]
    , payload: {
        url: `/members/${member.id}/users`
      , method: 'post'
      , data: { user: { email }, right }
      , normalize: r => normalize(r.user, schema)
      }
    , meta: { member, email }
    }
  };
};

export function remove(member, user) {
  if (member.createdBy === user.id) return;

  return {
    [RESOURCE]: {
      types: [ REMOVE, REMOVE_SUCCESS, REMOVE_FAILED ]
    , payload: {
        url: `/members/${member.id}/users/${user.id}`
      , method: 'del'
      }
    , meta: { user }
    }
  };
};

