import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DebounceInput from 'react-debounce-input';
import './Typeahead.css';

const blockUnwantedButtons = (e) => {
  if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
    e.preventDefault();
    return false;
  }
  return true;
};

export class Typeahead extends Component {
  constructor() {
    super();

    this.hideItems = this.hideItems.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      showItems: false,
      term: '',
    };
  }

  hideItems() {
    this.setState({
      showItems: false,
    });
  }

  handleChange(e) {
    const { minLength, onChange } = this.props;
    const term = e.target.value;
    this.setState({ term });
    this.hideItems();

    if (!term || term.length < minLength) {
      return;
    }

    onChange(term);

    this.setState({
      showItems: true,
      selectedIndex: 0,
    });
  }

  renderItems() {
    const { items, renderItem } = this.props;
    return items.map((item) => {
      return renderItem(item);
    });
  }

  render() {
    const {
      autoFocus,
      delay,
      className,
      placeholder,
      items,
      loading,
    } = this.props;

    const { term, showItems } = this.state;

    return (
      <span className="Typeahead">
        <DebounceInput
          autoFocus={autoFocus}
          debounceTimeout={delay}
          className={className}
          placeholder={placeholder}
          value={term}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          onKeyDown={blockUnwantedButtons}
          onKeyPress={blockUnwantedButtons}
        />
        {showItems && items.length > 0 && (
          <div className="row">
            <div className="Typeahead-items col-12 GameList">
              {this.renderItems()}
            </div>
          </div>
        )}
        {showItems && !loading && items.length === 0 && (
          <div className="Typeahead-empty">No results</div>
        )}
      </span>
    );
  }
}

Typeahead.propTypes = {
  autoFocus: PropTypes.bool,
  loading: PropTypes.bool,
  minLength: PropTypes.number,
  delay: PropTypes.number,
  className: PropTypes.string,
  placeholder: PropTypes.string,

  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  onChange: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
};

Typeahead.defaultProps = {
  autoFocus: false,
  loading: false,
  minLength: 3,
  delay: 500,
  className: '',
  placeholder: '',
};

export default Typeahead;
