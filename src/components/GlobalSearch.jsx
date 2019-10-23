import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { X } from 'react-feather';

import history from '../store/history';
import { SEARCH_REQUESTED } from '../store/search';

import Typeahead from './Typeahead';
import GameSearchItem from './GameSearchItem';

import './GlobalSearch.css';

const renderItem = (item) => <GameSearchItem {...item} />;

const onSelect = (item) => {
  history.push(`/games/${item.id}/show`);
};

const onClose = () => {
  history.goBack();
};

export const GlobalSearch = ({ items, search, loading }) => (
  <div className="GlobalSearch">
    <div className="container">
      <div className="text-right">
        <button type="button" className="SearchClose" tabIndex="0" onClick={onClose}>
          <X width="48" height="48" />
        </button>
      </div>
      <Typeahead
        autoFocus
        className="form-control"
        items={items}
        placeholder="Search..."
        renderItem={renderItem}
        onChange={search}
        onSelect={onSelect}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalSearch);
