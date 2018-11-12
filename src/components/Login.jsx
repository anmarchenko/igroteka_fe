import React from 'react';
import Form from 'react-formal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as yup from 'yup';
import { Helmet } from 'react-helmet';

import { SIGN_IN_REQUESTED } from '../store/login';
import { VALIDATION_ERRORS } from '../constants';

/* eslint-disable jsx-a11y/label-has-associated-control */

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);

    const { required } = VALIDATION_ERRORS;

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

  submit(formValue) {
    const { signIn } = this.props;
    signIn(formValue.email, formValue.password);
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="container">
        <Helmet>
          <title>Login | Igroteka</title>
        </Helmet>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-6">
            <Form schema={this.loginSchema} onSubmit={this.submit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Form.Field name="email" type="email" className="form-control" />
                <span className="error-message">{errors.error}</span>
                <Form.Message htmlFor="email" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Form.Field name="password" type="password" className="form-control" />
                <Form.Message htmlFor="password" className="error-message" />
              </div>
              <div className="form-group">
                <Form.Button type="submit" className="btn btn-outline-success btn-lg btn-block">
                  Sign in
                </Form.Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

/* eslint-enable jsx-a11y/label-has-associated-control */

Login.propTypes = {
  // TODO: refactor this
  errors: PropTypes.shape({
    error: PropTypes.string,
  }).isRequired,
  signIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ errors: state.session.errors });

const mapDispatchToProps = dispatch => ({
  signIn(email, password) {
    dispatch({ type: SIGN_IN_REQUESTED, email, password });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
