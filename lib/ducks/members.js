import assign from 'lodash/object/assign';
import union from 'lodash/array/union';
import find from 'lodash/collection/find';
import { createSelector } from 'reselect';
import { RESOURCE } from '@ftbl/resource';
import { entitiesSelector } from '@ftbl/entities';
import { SIGN_OUT_SUCCESS } from '@ftbl/session-web';
import { Schema, normalize, arrayOf } from 'normalizr';
import { config } from '@ftbl/support';

export const schema = new Schema('members');

export const FETCH = 'ftbl/member/member/FETCH';
export const FETCH_SUCCESS = 'ftbl/member/member/FETCH_SUCCESS';
export const FETCH_FAILED = 'ftbl/member/member/FETCH_FAILED';

export const CREATE = 'ftbl/member/member/CREATE';
export const CREATE_SUCCESS = 'ftbl/member/member/CREATE_SUCCESS';
export const CREATE_FAILED = 'ftbl/member/member/CREATE_FAILED';

export const UPDATE = 'ftbl/member/member/UPDATE';
export const UPDATE_SUCCESS = 'ftbl/member/member/UPDATE_SUCCESS';
export const UPDATE_FAILED = 'ftbl/member/member/UPDATE_FAILED';

export const SET_PRIMARY = 'ftbl/member/member/SET_PRIMARY';
export const SET_PRIMARY_SUCCESS = 'ftbl/member/member/SET_PRIMARY_SUCCESS';
export const SET_PRIMARY_FAILED = 'ftbl/member/member/SET_PRIMARY_FAILED';

const ERRORS = {
  403: 'Not authorized'
, 500: 'Error fetching member'
};

const initialState = { 
  data: []
, primary: null
, error: null
, changing: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case FETCH:
    return assign({}, state);
  case FETCH_SUCCESS:
    const { members } = action.payload.entities
        , member = find(members, { primary: true })
        , primary = member ? member.id : action.payload.result[0];
    
    return assign({}, state, { data: action.payload.result, primary, error: null });
  
  case UPDATE:
    return assign({}, state, { error: null, changing: true });
  
  case UPDATE_SUCCESS:
  case CREATE_SUCCESS:
    return assign({}, state, { data: union([ action.payload.result ], state.data)
                             , primary: action.payload.result, error: null, changing: false });

  case FETCH_FAILED:
  case CREATE_FAILED:
  case UPDATE_FAILED:
    return assign({}, state, { error: ERRORS[action.payload.status], changing: false });

  case SET_PRIMARY_SUCCESS:
    return assign({}, state, { primary: action.payload.result, error: null });
    
  case SIGN_OUT_SUCCESS:
    return initialState;
  default:
    return state;
  }
};

export const membersSelector = entitiesSelector(state => state.member.members, 'members');

export const primarySelector = state => state.member.members.primary;

export const memberSelector = createSelector([ primarySelector, membersSelector ], (primary, members) => {
  return find(members.data, { id: primary }) || members.data[0];
});

export function fetch(user) {
  if (user == null) return;
  
  return {
    [RESOURCE]: {
      types: [ FETCH, FETCH_SUCCESS, FETCH_FAILED ]
    , payload: {
        url: `/members?userid=${user.id}`
      , method: 'get'
      , normalize: r => normalize(r.members, arrayOf(schema))
      }
    }
  };
};

export function create(data) {
  data.license = config('license').toString();

  return {
    [RESOURCE]: {
      types: [ CREATE, CREATE_SUCCESS, CREATE_FAILED ]
    , payload: {
        url: '/members'
      , method: 'post'
      , data: { member: data }
      , normalize: r => normalize(r.member, schema)
      }
    , meta: data
    }
  };
};

export function update(member, data) {
  return {
    [RESOURCE]: {
      types: [ UPDATE, UPDATE_SUCCESS, UPDATE_FAILED ]
    , payload: {
        url: `/members/${member.id}`
      , method: 'put'
      , data: { member: data }
      , normalize: r => normalize(r.member, schema)
      }
    }
  };
};

export function setPrimary(member, user) {
  return {
    [RESOURCE]: {
      types: [ SET_PRIMARY, SET_PRIMARY_SUCCESS, SET_PRIMARY_FAILED ]
    , payload: {
        url: `/members/${member.id}/users/${user.id}`
      , method: 'put'
      , normalize: r => normalize(r.member, schema)
      }
    }
  };
};
