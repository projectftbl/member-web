import filter from 'lodash/collection/filter';

const connections = [
  { description: 'Follow', type: 'follow' }
, { description: 'Friend', type: 'friend', member: '' }
, { description: 'Support', type: 'support', member: 'team' }
, { description: 'Favourite', type: 'favourite', member: 'player' }
];

export default member => {
  return filter(connections, connection => {
    return connection.member === member || connection.member == null;
  });
};