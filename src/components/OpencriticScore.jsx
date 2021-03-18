import React from 'react';
import PropTypes from 'prop-types';
import { Award } from 'react-feather';

import IconWithText from './IconWithText';

const OpencriticScore = ({ score }) => {
  if (!score) return null;
  return (
    <span className="OpencriticScore">
      <IconWithText
        color="rgba(0, 0, 0, 0.6)"
        label={score.toFixed(0)}
        size={18}
        Icon={Award}
      />
    </span>
  );
};

OpencriticScore.propTypes = {
  score: PropTypes.number.isRequired,
};

export default OpencriticScore;
