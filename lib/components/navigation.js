import React from 'react';
import { Menu } from '@ftbl/navigation';

const Nav = ({ items }) => {
  const styles = {
    base: {
      fontSize: 20
    , padding: '5px 0 0 0'
    , '@media (max-width: 639px)': {
        fontSize: 18
      , padding: '0 0 5px 0'
      }
    }
  };

  return <Menu items={items} style={styles.base} />;
};

export const Edit = _ => {
  const items = [ 
    { to: '/member', title: 'Edit Member' } 
  , { to: '/member/connect', title: 'Connect Accounts' } 
  ];

  return <Nav items={items} />;
};

export const Access = ({ member: { id } = {} }) => {
  const items = [ 
    { to: '/member/access', title: 'Manage Access' } 
  , { to: '/member/access/add', title: 'Add User', claim: `manage ${id}` } 
  ];

  return <Nav items={items} />;
};