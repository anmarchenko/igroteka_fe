import React from 'react';
import PropTypes from 'prop-types';

import {
  BookOpen,
  Info,
  Instagram,
  ExternalLink as FeatherExternalLink,
  Facebook,
  Link,
  ShoppingBag,
  Twitter,
  Youtube,
} from 'react-feather';

import YoutubeLink from './YoutubeLink';
import ExternalLink from './ExternalLink';

import './GamePageLinks.css';

const renderCategoryIcon = (category) => {
  if (category === 'facebook') {
    return <Facebook />;
  }

  if (category === 'wikipedia' || category === 'wikia') {
    return <BookOpen />;
  }

  if (category === 'official') {
    return <Link />;
  }

  if (category === 'twitter') {
    return <Twitter />;
  }

  if (category === 'instagram') {
    return <Instagram />;
  }

  if (category === 'youtube') {
    return <Youtube />;
  }

  if (
    ['steam', 'iphone', 'ipad', 'android', 'google_plus'].includes(category)
  ) {
    return <ShoppingBag />;
  }

  return <FeatherExternalLink />;
};

const renderSeparator = () => (
  <span className="GamePageLinks-separator">·</span>
);

const renderExternalLinks = (externalLinks) =>
  externalLinks.map((link) => (
    <span key={link.url}>
      {renderSeparator()}
      <ExternalLink label={link.category} url={link.url}>
        {renderCategoryIcon(link.category)}
      </ExternalLink>
    </span>
  ));

const GamePageLinks = ({ game }) => (
  <div className="GamePage-info GamePageLinks">
    <ExternalLink label="IGDB" url={game.external_url}>
      <Info />
    </ExternalLink>
    {renderSeparator()}
    <YoutubeLink name={game.name} type="Walkthrough" />
    {renderSeparator()}
    <YoutubeLink name={game.name} type="Review" />
    {renderExternalLinks(game.external_links)}
  </div>
);

GamePageLinks.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string,
    external_url: PropTypes.string,
    external_links: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string,
        url: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default GamePageLinks;
