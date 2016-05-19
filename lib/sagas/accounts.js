import { error } from 'frieze';
import { take, put, select } from 'redux-saga/effects';

import { memberSelector, FETCH_SUCCESS, SET_PRIMARY_SUCCESS } from '../ducks/members';
import { fetch, CONNECT_FAILED } from '../ducks/accounts';

export function* connect() {
  while(true) {
    const { payload } = yield take(CONNECT_FAILED);
    
    if (payload.status === 404) {
      yield put(error('That account is already connected to another member.'));
    } else {
      yield put(error('There was an error connecting your account.'));
    }
  }
};

export function* fetchAccountsOnFetchMember() {
  while(true) {
    yield take(FETCH_SUCCESS);
    yield put(fetch(yield select(memberSelector)));
  }
};

export function* fetchAccountsOnSetPrimary() {
  while(true) {
    yield take(SET_PRIMARY_SUCCESS);
    yield put(fetch(yield select(memberSelector)));
  }
};
