import React, { Component } from 'react';
import PropTypes from 'prop-types';

import debounce from 'lodash/debounce';

export class Note extends Component {
  constructor(props) {
    super(props);
    const { onChange } = this.props;

    this.onChange = this.onChange.bind(this);
    this.debouncedOnChange = debounce(onChange, 300);

    this.state = {
      note: '',
    };
  }

  componentDidMount() {
    const { note } = this.props;
    this.setState({ note: note || '' });
  }

  onChange(e) {
    const note = e.target.value || '';
    this.setState({ note });
    this.debouncedOnChange(note);
  }

  render() {
    const { label } = this.props;
    const { note } = this.state;
    return (
      <div className="form-group Note">
        <label htmlFor="backlog_note">{label}</label>
        <textarea
          name="backlog_note"
          placeholder="Add your note"
          className="form-control"
          value={note}
          onChange={this.onChange}
          rows="5"
        />
      </div>
    );
  }
}

Note.propTypes = {
  label: PropTypes.string.isRequired,
  note: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Note.defaultProps = {
  note: '',
};

export default Note;
