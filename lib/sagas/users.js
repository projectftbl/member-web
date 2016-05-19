import { push } from 'react-router-redux';
import { info, error } from 'frieze';
import { reset } from 'redux-form';
import { take, put, select } from 'redux-saga/effects';

import { memberSelector, FETCH_SUCCESS, SET_PRIMARY_SUCCESS } from '../ducks/members';
import { fetch, INVITE_SUCCESS } from '../ducks/users';
import { clear } from '../ducks/search';

export function* fetchUsersOnFetchMember() {
  while(true) {
    yield take(FETCH_SUCCESS);
    yield put(fetch(yield select(memberSelector)));
  }
};

export function* fetchUsersOnSetPrimary() {
  while(true) {
    yield take(SET_PRIMARY_SUCCESS);
    yield put(fetch(yield select(memberSelector)));
  }
};

export function* invited() {
  while(true) {
    const { meta } = yield take(INVITE_SUCCESS);

    yield put(info(`You have successfully invited ${meta.email}.`));
    yield put(push('/member/access'));
    yield put(reset('users'));
    yield put(clear());
  }
};
