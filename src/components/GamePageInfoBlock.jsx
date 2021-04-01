import React from 'react';
import PropTypes from 'prop-types';

import './GamePageInfoBlock.css';

export const GamePageInfoBlock = ({ text, header }) => {
  if (text === '') {
    return <span />;
  }

  return (
    <div className="GamePageInfoBlock">
      <span className="GamePageInfoBlock-label">{header}</span>
      <span className="GamePageInfoBlock-text">{text}</span>
    </div>
  );
};

GamePageInfoBlock.propTypes = {
  header: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

GamePageInfoBlock.defaultProps = {
  text: '',
};

export default GamePageInfoBlock;
