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

    this.selectItem = this.selectItem.bind(this);
    this.getSelectedItem = this.getSelectedItem.bind(this);

    this.hideItems = this.hideItems.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.state = {
      showItems: false,
      selectedIndex: 0,
      term: '',
    };
  }

  getSelectedItem() {
    const { selectedIndex } = this.state;
    const { items } = this.props;
    if (selectedIndex < items.length) {
      return items[selectedIndex];
    }
    return null;
  }

  selectItem(item) {
    const { onSelect } = this.props;
    if (!item) {
      return;
    }
    this.setState({ term: '' });
    onSelect(item);
    this.hideItems();
  }

  hideItems() {
    this.setState({
      showItems: false,
      selectedIndex: 0,
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

  handleKeyUp(e) {
    const { selectedIndex } = this.state;
    const { items } = this.props;
    switch (e.key) {
      case 'Enter':
        this.selectItem(this.getSelectedItem());
        break;
      case 'ArrowDown':
        if (selectedIndex < items.length - 1) {
          this.setState(state => ({ selectedIndex: state.selectedIndex + 1 }));
        }
        break;
      case 'ArrowUp':
        if (selectedIndex > 0) {
          this.setState(state => ({ selectedIndex: state.selectedIndex - 1 }));
        }
        break;
      case 'Escape':
        this.hideItems();
        break;
      default:
        break;
    }
  }

  renderItems() {
    const { selectedIndex } = this.state;
    const { items, renderItem } = this.props;
    return items.map((item, index) => {
      let classname = '';
      if (index === selectedIndex) {
        classname = 'selected';
      }
      return (
        <li key={item.id} onClick={() => this.selectItem(item)} className={classname}>
          {renderItem(item)}
        </li>
      );
    });
  }

  render() {
    const {
      autoFocus, delay, className, placeholder, items, loading,
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
        {showItems && items.length > 0 && <ul className="Typeahead-items">{this.renderItems()}</ul>}
        {showItems
          && !loading
          && items.length === 0 && <div className="Typeahead-empty">No results</div>}
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

  onSelect: PropTypes.func.isRequired,
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
