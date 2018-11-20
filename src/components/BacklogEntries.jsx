import React from 'react';
import PropTypes from 'prop-types';

import Pagination from './Pagination';
import BacklogEntry from './BacklogEntry';
import { BACKLOG_TABLE_COLUMNS } from '../constants';

import './BacklogEntries.css';

const BacklogEntries = ({
  entries,
  status,
  fetching,
  totalPages,
  totalCount,
  page,
  onPaginate,
}) => {
  if (!entries || entries.length === 0) {
    return (
      <div className="row BacklogEntries-empty">
        <div className="col-12">Collection is empty</div>
      </div>
    );
  }
  const columns = BACKLOG_TABLE_COLUMNS[status] || [];
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
        <table className="table BacklogEntries">
          <thead className="thead-default">
            <tr>
              <th className="game-poster-column d-none d-sm-table-cell">Poster</th>
              <th className="game-name-column">Name</th>
              {columns.includes('expectationRating') && (
                <th className="game-expectation-rating-column">Exp</th>
              )}
              {columns.includes('finished') && <th className="game-finished-column">Finished</th>}
            </tr>
          </thead>
          <tbody>
            {entries.map(entry => (
              <BacklogEntry key={entry.game_id} entry={entry} />
            ))}
          </tbody>
        </table>
        {!fetching && <Pagination page={page} totalPages={totalPages} onPaginate={onPaginate} />}
      </div>
    </div>
  );
};

BacklogEntries.propTypes = {
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
  status: PropTypes.string.isRequired,
  onPaginate: PropTypes.func.isRequired,
};

export default BacklogEntries;
