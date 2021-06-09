import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { SEARCH_REQUESTED } from '../store/search';

import Typeahead from './Typeahead';
import GameListItem from './GameListItem';

import './GlobalSearch.css';

const renderItem = (item) => <GameListItem game={item} />;

export const GlobalSearch = ({ items, search, loading }) => (
  <div className="GlobalSearch">
    <div className="container">
      <Typeahead
        autoFocus
        className="form-control"
        items={items}
        placeholder="Search..."
        renderItem={renderItem}
        onChange={search}
        loading={loading}
      />
      {loading && <div className="GlobalSearchLoading">Searching...</div>}
    </div>
  </div>
);

GlobalSearch.propTypes = {
  search: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.search.results,
  loading: state.search.loading,
});

const mapDispatchToProps = (dispatch) => ({
  search: (term) => dispatch({ type: SEARCH_REQUESTED, term }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalSearch);
