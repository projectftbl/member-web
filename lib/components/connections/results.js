import React from 'react';
import { Button } from '@recipher/form';
import { Paging, Empty } from '@recipher/table';
import { Message } from './connections';
import Connection from './connection';

export default ({ member, results, connections, add, change, remove, search }) => {
  return (
    <div>
      {results.fetched && results.data.length === 0 && <Message text='No members found' />}
      
      {results.data.map(result => 
        <Connection key={result.id} connection={{ id: result.id, connectedTo: result }} member={member} connections={connections} 
                    onAdd={add} onChange={change} onRemove={remove} />
      )}

      <Empty limit={results.meta.query.limit} length={results.data.length} />

      {results.meta.total > results.meta.query.limit && <Paging meta={results.meta} fetching={results.fetching} search={search} entity='member' />}
    </div>
  );
};
