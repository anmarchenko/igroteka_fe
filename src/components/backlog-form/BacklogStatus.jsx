import React from 'react';
import PropTypes from 'prop-types';

import FancySelect from '../forms/FancySelect';

import { BACKLOG_STATUSES } from '../../constants';

export const BacklogStatus = ({ onStatusChange, onDelete, status }) => (
  <FancySelect
    value={status}
    options={BACKLOG_STATUSES}
    onChange={onStatusChange}
    onDelete={onDelete}
    emptyLabel="Add to my collection..."
    deleteLabel="Remove from my collection"
  />
);

BacklogStatus.propTypes = {
  status: PropTypes.string,
  onStatusChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

BacklogStatus.defaultProps = {
  status: '',
};

export default BacklogStatus;
