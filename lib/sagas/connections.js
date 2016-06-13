import { take, put, select } from 'redux-saga/effects';

import { memberSelector, CREATE_SUCCESS, FETCH_SUCCESS, SET_PRIMARY_SUCCESS } from '../ducks/members';
import { fetch, RESET } from '../ducks/connections';

export function* resetConnections() {
  while(true) {
    yield take(CREATE_SUCCESS);
    yield put({ type: RESET });
  }
};

export function* fetchConnectionsOnFetchMember() {
  while(true) {
    yield take(FETCH_SUCCESS);
    yield put(fetch(yield select(memberSelector)));
  }
};

export function* fetchConnectionsOnSetPrimary() {
  while(true) {
    yield take(SET_PRIMARY_SUCCESS);
    yield put(fetch(yield select(memberSelector)));
  }
};
