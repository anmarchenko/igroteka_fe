import React from 'react';
import PropTypes from 'prop-types';

import { Pagination as BootstrapPagination, PaginationItem, PaginationLink } from 'reactstrap';

export const Pagination = ({ page, totalPages, onPaginate }) => (
  <div className="row">
    <div className="col-12">
      <BootstrapPagination>
        {page > 1 && (
          <PaginationItem>
            <PaginationLink tag="button" previous onClick={() => onPaginate(page - 1)} />
          </PaginationItem>
        )}
        {page - 2 > 1 && (
          <PaginationItem>
            <PaginationLink tag="button" onClick={() => onPaginate(1)}>
              1
            </PaginationLink>
          </PaginationItem>
        )}
        {page - 2 >= 1 && (
          <PaginationItem>
            <PaginationLink tag="button" onClick={() => onPaginate(page - 2)}>
              {page - 2}
            </PaginationLink>
          </PaginationItem>
        )}
        {page - 1 >= 1 && (
          <PaginationItem>
            <PaginationLink tag="button" onClick={() => onPaginate(page - 1)}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem active>
          <PaginationLink tag="button">
            {page}
          </PaginationLink>
        </PaginationItem>
        {page + 1 <= totalPages && (
          <PaginationItem>
            <PaginationLink tag="button" onClick={() => onPaginate(page + 1)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {page + 2 <= totalPages && (
          <PaginationItem>
            <PaginationLink tag="button" onClick={() => onPaginate(page + 2)}>
              {page + 2}
            </PaginationLink>
          </PaginationItem>
        )}
        {page + 2 < totalPages && (
          <PaginationItem>
            <PaginationLink tag="button" onClick={() => onPaginate(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        {page < totalPages && (
          <PaginationItem>
            <PaginationLink tag="button" next onClick={() => onPaginate(page + 1)} />
          </PaginationItem>
        )}
      </BootstrapPagination>
    </div>
  </div>
);

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPaginate: PropTypes.func.isRequired,
};

export default Pagination;
