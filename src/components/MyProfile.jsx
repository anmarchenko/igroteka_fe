import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Avatar from './Avatar';
import MyProfileForm from './MyProfileForm';

import { USER_SAVE_REQUESTED, USER_START_EDIT, USER_STOP_EDIT } from '../store/profile';

import './MyProfile.css';

const renderLoadingState = () => (
  <div className="container MyProfile">
    <div className="row">
      <div className="col-12 MyProfile-loading">
        <div className="row MyProfile-header">
          <div className="col-8 col-md-4">
            <div className="MyProfile-name-mockup" />
          </div>
          <div className="col-4 col-md-2">
            <div className="MyProfile-avatar">
              <div className="MyProfile-mockup user-avatar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save(formData) {
    const { saveUser, currentUser } = this.props;
    saveUser(currentUser.id, formData);
  }

  renderEditControls() {
    const { startEdit } = this.props;
    return (
      <div className="MyProfile-edit-controls">
        <a href="#0" onClick={startEdit}>
          Edit profile
        </a>
      </div>
    );
  }

  renderUserProfileInfo() {
    const { currentUser, edit, stopEdit } = this.props;
    if (edit) {
      return <MyProfileForm {...currentUser} onSave={this.save} onCancel={stopEdit} />;
    }
    return (
      <div className="MyProfile-info">
        <div className="MyProfile-name">{currentUser.name}</div>
        {this.renderEditControls()}
      </div>
    );
  }

  render() {
    const { currentUser } = this.props;
    if (!currentUser) {
      return renderLoadingState();
    }
    return (
      <div className="MyProfile">
        <Helmet>
          <title>My profile | Igroteka</title>
        </Helmet>
        <div className="container">
          <div className="row MyProfile-header">
            <div className="col-8 col-md-4">{this.renderUserProfileInfo()}</div>
            <div className="col-4 col-md-2">
              <div className="MyProfile-avatar">
                <Avatar {...currentUser} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  edit: PropTypes.bool.isRequired,

  currentUser: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    color: PropTypes.string,
    initials: PropTypes.string,
  }),

  saveUser: PropTypes.func.isRequired,
  startEdit: PropTypes.func.isRequired,
  stopEdit: PropTypes.func.isRequired,
};

UserProfile.defaultProps = {
  currentUser: undefined,
};

const mapStateToProps = state => ({
  edit: state.profile.edit,
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  saveUser(userId, formData) {
    dispatch({ type: USER_SAVE_REQUESTED, params: formData, userId });
  },
  startEdit() {
    dispatch({ type: USER_START_EDIT });
  },
  stopEdit() {
    dispatch({ type: USER_STOP_EDIT });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
