import React from 'react';
import PropTypes from 'prop-types';
import { Clock } from 'react-feather';

import IconWithText from './IconWithText';
import { formatMinutes } from '../utils';

const PlaythroughTimeInfo = ({ playthroughTime }) => (
  <span className="PlaythroughTimeInfo">
    <IconWithText
      color="rgba(0, 0, 0, 0.6)"
      label={formatMinutes(playthroughTime.main)}
      size={18}
      Icon={Clock}
    />
  </span>
);

PlaythroughTimeInfo.propTypes = {
  playthroughTime: PropTypes.shape({
    main: PropTypes.number,
    badge: PropTypes.string,
    badge_label: PropTypes.string,
  }).isRequired,
};

export default PlaythroughTimeInfo;
