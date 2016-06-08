import React from 'react';
import { Button } from '@ftbl/form';
import { Paging, Empty } from '@ftbl/table';
import { Message } from './connections';
import Connection from './connection';

export default ({ member, results, connections, add, remove, search }) => {
  return (
    <div>
      {results.fetched && results.data.length === 0 && <Message text='No members found' />}
      
      {results.data.map(connectTo => 
        <Connection key={connectTo.id} connectTo={connectTo} member={member} connections={connections} onAdd={add} onRemove={remove} />
      )}

      <Empty limit={results.meta.query.limit} length={results.data.length} />

      {results.meta.total > results.meta.query.limit && <Paging meta={results.meta} fetching={results.fetching} search={search} entity='member' />}
    </div>
  );
};
