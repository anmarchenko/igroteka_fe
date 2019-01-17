/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import * as yup from 'yup';

import { Helmet } from 'react-helmet';

import { VALIDATION_ERRORS } from '../constants';
import { yupToFormErrors } from '../utils';
import {
  USER_CHANGE_PASSWORD_REQUESTED,
  USER_CHANGE_PASSWORD_CLEAR_ERRORS,
} from '../store/profile';

export class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);

    const { required, passwordLength } = VALIDATION_ERRORS;

    this.state = {
      oldPassword: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
    };

    this.schema = yup.object().shape({
      oldPassword: yup
        .string()
        .default('')
        .required(required)
        .min(5, passwordLength),
      password: yup
        .string()
        .default('')
        .required(required)
        .min(5, passwordLength),
      passwordConfirmation: yup
        .string()
        .default('')
        .required(required),
    });
  }

  componentDidMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {},
    });
  }

  submit(e) {
    if (e && e.preventDefault) e.preventDefault();

    const { oldPassword, password, passwordConfirmation } = this.state;
    const { updatePassword, currentUser } = this.props;
    const component = this;

    this.schema
      .validate({ oldPassword, password, passwordConfirmation }, { abortEarly: false })
      .then(
        (formValue) => {
          updatePassword(currentUser.id, {
            old_password: formValue.oldPassword,
            password_confirmation: formValue.passwordConfirmation,
            password: formValue.password,
          });
        },
        (exception) => {
          if (exception.name !== 'ValidationError') throw exception;
          component.setState({
            errors: yupToFormErrors(exception),
          });
        },
      );
  }

  render() {
    const {
      oldPassword, password, passwordConfirmation, errors,
    } = this.state;
    const { backendErrors, currentUser } = this.props;

    if (!currentUser) {
      return null;
    }

    return (
      <div className="container">
        <Helmet>
          <title>Change password | Igroteka</title>
        </Helmet>
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-8 col-xl-6">
            <form onSubmit={this.submit}>
              <div className="form-group">
                <label htmlFor="oldPassword">Current password</label>
                <input
                  name="oldPassword"
                  type="password"
                  className="form-control"
                  value={oldPassword}
                  onChange={this.handleChange}
                />
                <span className="error-message">{errors.oldPassword}</span>
                <span className="error-message">
                  {(backendErrors.old_password || []).join(',')}
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="password">New password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={this.handleChange}
                />
                <span className="error-message">{errors.password}</span>
                <span className="error-message">{(backendErrors.password || []).join(',')}</span>
              </div>
              <div className="form-group">
                <label htmlFor="passwordConfirmation">Confirm password</label>
                <input
                  name="passwordConfirmation"
                  type="password"
                  className="form-control"
                  value={passwordConfirmation}
                  onChange={this.handleChange}
                />
                <span className="error-message">{errors.passwordConfirmation}</span>
                <span className="error-message">
                  {(backendErrors.password_confirmation || []).join(',')}
                </span>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <button type="submit" className="btn btn-outline-success btn-lg">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  backendErrors: PropTypes.shape({
    old_password: PropTypes.arrayOf(PropTypes.string),
    password: PropTypes.arrayOf(PropTypes.string),
    password_confirmation: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
  updatePassword: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

ChangePassword.defaultProps = {
  currentUser: undefined,
};

const mapStateToProps = state => ({
  backendErrors: state.profile.formPasswordErrors,
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  updatePassword(userId, data) {
    dispatch({ type: USER_CHANGE_PASSWORD_REQUESTED, params: data, userId });
  },
  clearErrors() {
    dispatch({ type: USER_CHANGE_PASSWORD_CLEAR_ERRORS });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword);
