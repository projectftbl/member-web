import React from 'react';
import Radium from 'radium';
import { YouTube, Rss, Facebook, Twitter, Instagram } from '@ftbl/icons';

export const Icons = {
  facebook: Facebook
, twitter: Twitter
, google: YouTube
, instagram: Instagram
, rss: Rss
, page: Facebook
};

export default Radium(({ authorized, network, onConnect, colour, size = 36, style, shape = 'circle' }) => {
  const styles = {
    base: {
      cursor: 'pointer'
    , paddingRight: 15
    }
  , notAuthorized: {
      cursor: 'not-allowed'
    }
  };

  const Icon = Icons[network];

  return (
    <a onClick={() => authorized && onConnect(network)} style={[ styles.base, !authorized && styles.notAuthorized ]}>
      <Icon size={size} style={style} shape={shape} colour={!authorized ? '#999' : undefined} />
    </a>
  );
});
