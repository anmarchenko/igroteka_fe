import React from 'react';
import PropTypes from 'prop-types';

const COLORS = {
  blue: {
    color: '#1976D2',
    fillColor: '#2196F3',
  },
  yellow: {
    color: '#ffa000',
    fillColor: '#ffca28',
  },
};

const Star = ({
  color, size, filled, ...otherProps
}) => {
  const colorObj = COLORS[color];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? colorObj.fillColor : 'none'}
      stroke={colorObj.color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

Star.propTypes = {
  filled: PropTypes.bool,
  color: PropTypes.oneOf(['blue', 'yellow']),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Star.defaultProps = {
  color: 'yellow',
  size: '24',
  filled: false,
};

export default Star;
