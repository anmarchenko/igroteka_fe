import React from 'react';
import PropTypes from 'prop-types';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import './OffsetPagination.css';

const PAGE_SIZE = 50;

export const OffsetPagination = ({ offset, resultsCount, onOffsetChange }) => {
  const showPagination = offset != 0 || resultsCount == PAGE_SIZE;
  if (!showPagination) {
    return null;
  }
  const previousEnabled = offset > 0;
  const nextEnabled = resultsCount == PAGE_SIZE;
  return (
    <div className="row OffsetPagination">
      <div className="col-12 OffsetPagination-inner">
        <div>
          Results {offset + 1} - {offset + resultsCount}
        </div>
        <Pagination>
          {previousEnabled && (
            <PaginationItem>
              <PaginationLink
                tag="button"
                previous
                onClick={() => onOffsetChange(offset - PAGE_SIZE)}
              />
            </PaginationItem>
          )}
          {nextEnabled && (
            <PaginationItem>
              <PaginationLink
                tag="button"
                next
                onClick={() => onOffsetChange(offset + PAGE_SIZE)}
              />
            </PaginationItem>
          )}
        </Pagination>
      </div>
    </div>
  );
};

OffsetPagination.propTypes = {
  offset: PropTypes.number.isRequired,
  resultsCount: PropTypes.number.isRequired,
  onOffsetChange: PropTypes.func.isRequired,
};

export default OffsetPagination;
