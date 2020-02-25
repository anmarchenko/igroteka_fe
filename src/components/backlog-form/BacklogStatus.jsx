import React from 'react';
import PropTypes from 'prop-types';

import {
  UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import BacklogStatusLabel from '../BacklogStatusLabel';
import { BACKLOG_STATUSES } from '../../constants';
import { backlogStatusById } from '../../utils';

export const BacklogStatus = ({
  onStatusChange, onDelete, entryExists, status,
}) => {
  const currentStatus = backlogStatusById(status);
  return (
    <div className="BacklogStatus">
      <UncontrolledButtonDropdown>
        {!entryExists && (
          <DropdownToggle caret outline>
            Add to my collection...
          </DropdownToggle>
        )}
        {entryExists && (
          <DropdownToggle outline caret>
            <BacklogStatusLabel status={currentStatus} size={20} />
          </DropdownToggle>
        )}
        <DropdownMenu>
          <DropdownItem header>Mark as...</DropdownItem>
          {BACKLOG_STATUSES.map((statusItem) => (
            <DropdownItem key={statusItem.id} onClick={() => onStatusChange(statusItem.id)}>
              <BacklogStatusLabel status={statusItem} size={22} />
            </DropdownItem>
          ))}
          {entryExists && <DropdownItem divider />}
          {entryExists && (
            <DropdownItem className="danger" onClick={onDelete}>
              Remove from my collection
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  );
};

BacklogStatus.propTypes = {
  entryExists: PropTypes.bool.isRequired,
  status: PropTypes.string,

  onStatusChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

BacklogStatus.defaultProps = {
  status: '',
};

export default BacklogStatus;
