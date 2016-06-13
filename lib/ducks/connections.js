import assign from 'lodash/object/assign';
import union from 'lodash/array/union';
import without from 'lodash/array/without';
import isArray from 'lodash/lang/isArray';
import { RESOURCE } from '@ftbl/resource';
import { entitiesSelector, LIMIT } from '@ftbl/entities';
import { memberSelector } from './members';
import { SIGN_OUT_SUCCESS } from '@ftbl/session-web';
import { Schema, normalize, arrayOf } from 'normalizr';

export const schema = new Schema('connections');

export const FETCH = 'ftbl/member/connections/FETCH';
export const FETCH_SUCCESS = 'ftbl/member/connections/FETCH_SUCCESS';
export const FETCH_FAILED = 'ftbl/member/connections/FETCH_FAILED';

export const ADD = 'ftbl/member/connections/ADD';
export const ADD_SUCCESS = 'ftbl/member/connections/ADD_SUCCESS';
export const ADD_FAILED = 'ftbl/member/connections/ADD_FAILED';

export const REMOVE = 'ftbl/member/connections/REMOVE';
export const REMOVE_SUCCESS = 'ftbl/member/connections/REMOVE_SUCCESS';
export const REMOVE_FAILED = 'ftbl/member/connections/REMOVE_FAILED';

export const RESET = 'ftbl/member/connections/RESET';

const initialState = { 
  fetching: false
, fetched: false
, connecting: false
, disconnecting: false
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
    return assign({}, state, { fetching: true, fetched: false });

  case FETCH_SUCCESS:
    return assign({}, state, { data: action.payload.result, fetching: false, fetched: true });

  case FETCH_FAILED:
    return assign({}, state, { fetching: false, fetched: true });

  case ADD:
    return assign({}, state, { connecting: true });

  case ADD_SUCCESS:
    return assign({}, state, { connecting: false, data: union([ action.payload.result ], state.data) });

  case ADD_FAILED:
    return assign({}, state, { error: ERRORS[action.payload.status], connecting: false });

  case REMOVE:
    return assign({}, state, { disconnecting: true });

  case REMOVE_SUCCESS:
    return assign({}, state, { disconnecting: false, data: without(state.data, action.meta.connection.id) });

  case REMOVE_FAILED:
    return assign({}, state, { error: ERRORS[action.payload.status], disconnecting: false });

  case RESET:
  case SIGN_OUT_SUCCESS:
    return initialState;

  default:
    return state;
  }
};

export const connectionsSelector = entitiesSelector(state => state.member.connections, 'connections', 'connectedTo.name');

export function fetch(member, query = { page: 1, limit: LIMIT }) {
  if (member == null) return;

  return {
    [RESOURCE]: {
      types: [ FETCH, FETCH_SUCCESS, FETCH_FAILED ]
    , payload: {
        url: `/members/${member.id}/connections`
      , method: 'get'
      , query
      , normalize: r => normalize(r.connections, arrayOf(schema))
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
    const state = connectionsSelector(getState());

    if (state.data.length) return;

    return dispatch(fetch(member));
  }
};

export function change(member, connection, type) {
  return (dispatch, getState) => {
    dispatch(remove(member, connection));
    dispatch(add(member, { memberId: connection.connectedTo.id, type }))
  }
};

export function add(member, connection) {
  return {
    [RESOURCE]: {
      types: [ ADD, ADD_SUCCESS, ADD_FAILED ]
    , payload: {
        url: `/members/${member.id}/connections`
      , method: 'post'
      , data: { connection }
      , normalize: r => normalize(r.connection, schema)
      }
    }
  };
};

export function remove(member, connection) {
  return {
    [RESOURCE]: {
      types: [ REMOVE, REMOVE_SUCCESS, REMOVE_FAILED ]
    , payload: {
        url: `/members/${member.id}/connections/${connection.connectedTo.id}`
      , query: { type: connection.type }
      , method: 'del'
      }
    , meta: { connection }
    }
  };
};
