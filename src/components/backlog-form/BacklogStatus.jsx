import React from 'react';
import PropTypes from 'prop-types';

import { BACKLOG_STATUSES } from '../../constants';
import './BacklogStatus.css';

export const BacklogStatus = ({ onStatusChange, status }) => (
  <div className="BacklogStatus">
    {BACKLOG_STATUSES.map((statusObject) => {
      const active = status == statusObject.id;
      const style = active ? { border: `1px solid ${statusObject.color}` } : {};
      const Icon = statusObject.icon;

      return (
        <div key={statusObject.id} className="BacklogStatus-item">
          <button
            type="button"
            className="btn btn-light BacklogStatus-button"
            onClick={() => onStatusChange(statusObject.id)}
            style={style}
          >
            <Icon color={active ? statusObject.color : 'rgba(0, 0, 0, 0.6)'} />
          </button>
          <div className="BacklogStatus-label"> {statusObject.label}</div>
        </div>
      );
    })}
  </div>
);

BacklogStatus.propTypes = {
  status: PropTypes.string,
  onStatusChange: PropTypes.func.isRequired,
};

BacklogStatus.defaultProps = {
  status: '',
};

export default BacklogStatus;
