import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Member, Select, Profile, Connect, Access, Manage, User, Add } from './handlers';

export default function(Authorize) {
  return (
    <Route path='member' component={Authorize()(Member)}>
      <IndexRoute component={Profile} />
      <Route path='select' component={Select} />
      <Route path='profile' component={Profile} />
      <Route path='connect' component={Connect} />
      <Route path='access' component={Access}>
        <IndexRoute component={Manage} />
        <Route path='manage' component={Manage} />
        <Route path='add' component={User} />
      </Route>
      <Route path='add' component={Add} />
    </Route>
  );
};