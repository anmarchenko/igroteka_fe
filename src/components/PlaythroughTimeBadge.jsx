import React from 'react';
import PropTypes from 'prop-types';

import { formatMinutes } from '../utils';
import { PLAYTHROUGH_BADGES } from '../constants';

const PlaythroughTimeBadge = ({ playthroughTime, useLabel }) => (
  <span
    className={`badge badge-pill ${PLAYTHROUGH_BADGES[playthroughTime.badge]}`}
  >
    {useLabel
      ? playthroughTime.badge_label
      : formatMinutes(playthroughTime.main)}
  </span>
);

PlaythroughTimeBadge.propTypes = {
  playthroughTime: PropTypes.shape({
    main: PropTypes.number,
    badge: PropTypes.string,
    badge_label: PropTypes.string,
  }).isRequired,
  useLabel: PropTypes.bool,
};

PlaythroughTimeBadge.defaultProps = {
  useLabel: false,
};

export default PlaythroughTimeBadge;
