import React from 'react';
import { Button } from '@ftbl/form';
import { Paging, Empty } from '@ftbl/table';
import { Message } from './users';
import User from './user';

export default ({ member, results, users, add, invite, remove, search }) => {
  return (
    <div>
      {results.fetched && results.data.length === 0 && <Message text='No users found' />}
      
      {results.data.map(user => 
        <User key={user.id} user={user} member={member} users={users} onAdd={add} onRemove={remove} />
      )}

      <Empty limit={results.meta.query.limit} length={results.data.length} />

      {results.meta.total > results.meta.query.limit && <Paging meta={results.meta} fetching={results.fetching} search={search} entity='user' />}
    </div>
  );
};
