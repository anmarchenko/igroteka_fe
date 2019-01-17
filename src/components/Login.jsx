import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as yup from 'yup';
import { Helmet } from 'react-helmet';

import { SIGN_IN_REQUESTED } from '../store/login';
import { VALIDATION_ERRORS } from '../constants';
import { yupToFormErrors } from '../utils';

/* eslint-disable jsx-a11y/label-has-associated-control */

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);

    const { required } = VALIDATION_ERRORS;

    this.state = {
      email: '',
      password: '',
      errors: {},
    };

    this.loginSchema = yup.object().shape({
      email: yup
        .string()
        .default('')
        .required(required),
      password: yup
        .string()
        .default('')
        .required(required),
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

    const { email, password } = this.state;
    const { signIn } = this.props;
    const component = this;

    this.loginSchema.validate({ email, password }, { abortEarly: false }).then(
      (formValue) => {
        signIn(formValue.email, formValue.password);
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
    const { email, password, errors } = this.state;
    const { backendErrors } = this.props;

    return (
      <div className="container">
        <Helmet>
          <title>Login | Igroteka</title>
        </Helmet>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-6">
            <form onSubmit={this.submit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={this.handleChange}
                />
                <span className="error-message">{backendErrors.error}</span>

                <span className="error-message">{errors.email}</span>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={this.handleChange}
                />
                <span className="error-message">{errors.password}</span>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-outline-success btn-lg btn-block">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

/* eslint-enable jsx-a11y/label-has-associated-control */

Login.propTypes = {
  // TODO: refactor this
  backendErrors: PropTypes.shape({
    error: PropTypes.string,
  }).isRequired,
  signIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ backendErrors: state.session.errors });

const mapDispatchToProps = dispatch => ({
  signIn(email, password) {
    dispatch({ type: SIGN_IN_REQUESTED, email, password });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
