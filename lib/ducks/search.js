import assign from 'lodash/object/assign';
import { RESOURCE } from '@ftbl/resource';
import { entitiesSelector, entitiesReducer, LIMIT } from '@ftbl/entities';
import { Schema, normalize, arrayOf } from 'normalizr';

export const schema = new Schema('users');

export const SEARCH = 'ftbl/member/search/FETCH';
export const SUCCESS = 'ftbl/member/search/SUCCESS';
export const FAILED = 'ftbl/member/search/FAILED';
export const CLEAR = 'ftbl/member/search/CLEAR';

export default entitiesReducer([ SEARCH, SUCCESS, FAILED, CLEAR ]);

export const resultsSelector = entitiesSelector(state => state.member.search, 'users');

export function search(data) {
  const query = assign({}, { q: '', page: 1, limit: LIMIT }, data);

  return {
    [RESOURCE]: {
      types: [ SEARCH, SUCCESS, FAILED ]
    , payload: {
        url: '/users/search'
      , method: 'get'
      , query
      , normalize: r => normalize(r.users, arrayOf(schema))
      }
    , meta: { query }
    }
  };
};

export function clear() {
  return { type: CLEAR };
};