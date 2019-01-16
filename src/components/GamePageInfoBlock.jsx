import React from 'react';
import PropTypes from 'prop-types';

export const GamePageInfoBlock = ({ text, header }) => {
  if (text === '') {
    return <span />;
  }

  return (
    <div>
      <span className="text-important">
        {header}
:
        {' '}
      </span>
      <span>{text}</span>
    </div>
  );
};

GamePageInfoBlock.propTypes = {
  header: PropTypes.string.isRequired,
  text: PropTypes.string,
};

GamePageInfoBlock.defaultProps = {
  text: '',
};

export default GamePageInfoBlock;
