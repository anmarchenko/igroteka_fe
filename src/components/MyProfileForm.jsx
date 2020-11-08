import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as yup from 'yup';

import { VALIDATION_ERRORS } from '../constants';
import { yupToFormErrors } from '../utils';

export class MyProfileForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);

    const { required } = VALIDATION_ERRORS;
    const { name } = this.props;

    this.state = {
      name: name || '',
      errors: {},
    };

    this.userSchema = yup.object().shape({
      name: yup.string().default('').required(required),
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {},
    });
  }

  submit(e) {
    if (e && e.preventDefault) e.preventDefault();

    const { name, bio } = this.state;
    const { onSave } = this.props;
    const component = this;

    this.userSchema.validate({ name, bio }, { abortEarly: false }).then(
      (formValue) => {
        onSave(formValue);
      },
      (exception) => {
        if (exception.name !== 'ValidationError') throw exception;
        component.setState({
          errors: yupToFormErrors(exception),
        });
      }
    );
  }

  render() {
    const { name, errors } = this.state;
    const { backendErrors, onCancel } = this.props;

    return (
      <form onSubmit={this.submit} className="MyProfileForm">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            className="form-control"
            value={name}
            onChange={this.handleChange}
          />
          <span className="error-message">{errors.name}</span>
          <span className="error-message">
            {(backendErrors.name || []).join(',')}
          </span>
        </div>
        <div className="form-group MyProfile-edit-controls">
          <button type="submit" className="btn btn-outline-success">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

MyProfileForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  name: PropTypes.string,
  backendErrors: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.string),
  }),
};

MyProfileForm.defaultProps = {
  name: undefined,
  backendErrors: {},
};

export default MyProfileForm;
