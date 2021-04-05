import React from 'react';
import PropTypes from 'prop-types';

import { GAME_SCORES } from '../../constants';
import FancySelect from '../forms/FancySelect';

export const BacklogScore = ({ setScore, score }) => (
  <FancySelect
    value={score}
    options={GAME_SCORES}
    onChange={setScore}
    onDelete={() => setScore(null)}
    emptyLabel="Rating"
    deleteLabel="Remove score"
  />
);

BacklogScore.propTypes = {
  score: PropTypes.number,
  setScore: PropTypes.func.isRequired,
};

BacklogScore.defaultProps = {
  score: null,
};

export default BacklogScore;
