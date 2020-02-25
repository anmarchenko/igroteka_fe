import React from 'react';
import PropTypes from 'prop-types';

import Pagination from './Pagination';
import BacklogItem from './BacklogItem';

import './BacklogList.css';

const BacklogList = ({
  entries, fetching, totalPages, totalCount, page, onPaginate,
}) => {
  if (!entries || entries.length === 0) {
    return (
      <div className="row BacklogList-empty">
        <div className="col-12">Collection is empty</div>
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-12">
        {!fetching && (
          <Pagination
            page={page}
            totalPages={totalPages}
            totalCount={totalCount}
            onPaginate={onPaginate}
          />
        )}
        <ul className="BacklogList">
          {entries.map((entry) => (
            <BacklogItem key={entry.game_id} entry={entry} />
          ))}
        </ul>
        {!fetching && <Pagination page={page} totalPages={totalPages} onPaginate={onPaginate} />}
      </div>
    </div>
  );
};

BacklogList.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      game_id: PropTypes.number,
      game_name: PropTypes.string,
      game_release_date: PropTypes.string,
      poster_thumb_url: PropTypes.string,

      note: PropTypes.string,

      available_platforms: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  fetching: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onPaginate: PropTypes.func.isRequired,
};

export default BacklogList;
