import filter from 'lodash/collection/filter';

const connections = [
  { description: 'Following', action: 'Follow', type: 'follows' }
, { description: 'Friends', action: 'Friend', type: 'friends', member: '' }
, { description: 'Supports', action: 'Support', type: 'supports', member: 'team' }
, { description: 'Favourite', action: 'Favourite', type: 'favourites', member: 'player' }
];

export default member => {
  const type = member.type || member.additional.type;
  return filter(connections, connection => {
    return connection.member === type || connection.member == null;
  });
};