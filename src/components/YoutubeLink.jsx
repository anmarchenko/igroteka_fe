import React from 'react';
import PropTypes from 'prop-types';

import { Youtube } from 'react-feather';
import ExternalLink from './ExternalLink';

const urlForGame = (name, type) => `https://www.youtube.com/results?search_query=${encodeURIComponent(name)}+${type}`;

const YoutubeLink = ({ name, type }) => (
  <ExternalLink url={urlForGame(name, type)} label={type}>
    <Youtube />
  </ExternalLink>
);

YoutubeLink.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default YoutubeLink;
