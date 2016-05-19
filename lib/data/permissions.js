import Authorizer from '@ftbl/authorize';

export default [
  { description: 'Read-only', right: Authorizer.permissions.ReadOnly }
, { description: 'Editor', right: Authorizer.permissions.Editor }
, { description: 'Manage', right: Authorizer.permissions.FullControl }
];