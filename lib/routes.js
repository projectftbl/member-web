import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Member, Select, Profile, Connect, Add } from './handlers';
import * as access from './handlers/access';
import * as connections from './handlers/connections';

export default function(Authorize) {
  return (
    <Route path='member' component={Authorize()(Member)}>
      <IndexRoute component={Profile} />
      <Route path='select' component={Select} />
      <Route path='profile' component={Profile} />
      <Route path='connect' component={Connect} />
      
      <Route path='access' component={access.Access}>
        <IndexRoute component={access.Manage} />
        <Route path='manage' component={access.Manage} />
        <Route path='add' component={access.Add} />
      </Route>
      
      <Route path='connections' component={connections.Connections}>
        <IndexRoute component={connections.Manage} />
        <Route path='manage' component={connections.Manage} />
        <Route path='add' component={connections.Add} />
      </Route>
      
      <Route path='add' component={Add} />
    </Route>
  );
};