import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import ReactPlaceholder from 'react-placeholder';
import dayjs from 'dayjs';

import { XCircle } from 'react-feather';
import { confirmAlert } from 'react-confirm-alert'; // Import

import DateField from './DateField';
import Platform from './Platform';
import BacklogExpectation from './BacklogExpectation';
import BacklogStatus from './BacklogStatus';
import BacklogScore from './BacklogScore';

import {
  BACKLOG_ENTRY_FETCH_REQUESTED,
  BACKLOG_ENTRY_ADD,
  BACKLOG_ENTRY_UPDATE,
  BACKLOG_ENTRY_DELETE,
} from '../../store/backlogForm';

import { BACKLOG_FIELDS } from '../../constants';

import './Form.css';

const isInBacklog = (entry) => !!entry.id;

export class Form extends Component {
  constructor(props) {
    super(props);

    this.addToBacklog = this.addToBacklog.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.removeFromBacklog = this.removeFromBacklog.bind(this);
    this.updateBacklog = this.updateBacklog.bind(this);
  }

  componentDidMount() {
    const { game, fetchBacklog } = this.props;
    fetchBacklog(game.id);
  }

  onStatusChange(status) {
    const { backlogEntry } = this.props;
    if (isInBacklog(backlogEntry)) {
      this.updateBacklog({ status });
    } else {
      this.addToBacklog(status);
    }
  }

  addToBacklog(status) {
    const { addToBacklog, game } = this.props;
    addToBacklog(status, game);
  }

  updateBacklog(entryParams) {
    const { updateBacklog, game } = this.props;
    updateBacklog(game.id, entryParams);
  }

  removeFromBacklog() {
    const { removeFromBacklog, game } = this.props;
    removeFromBacklog(game.id);
  }

  render() {
    const { backlogEntry, backlogFetching, game } = this.props;
    const { updateBacklog } = this;

    const ready = !backlogFetching;
    const show = BACKLOG_FIELDS[backlogEntry.status] || [];

    const alertOptions = {
      title: 'Confirm removal',
      message: 'Are you sure you want to remove the game from your backlog?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.removeFromBacklog(),
        },
        {
          label: 'No',
        },
      ],
    };
    return (
      <ReactPlaceholder
        showLoadingAnimation
        color="#ddd"
        ready={ready}
        type="text"
        rows={5}
      >
        <BacklogStatus
          status={backlogEntry.status}
          onStatusChange={this.onStatusChange}
        />
        <div className="BacklogForm">
          {show.includes('platform') && (
            <Platform
              platformId={backlogEntry.owned_platform_id}
              platformName={backlogEntry.owned_platform_name}
              onChange={(platformId, platformName) =>
                updateBacklog({
                  owned_platform_id: platformId,
                  owned_platform_name: platformName,
                })
              }
              platforms={game.platforms}
            />
          )}
          {show.includes('expectationRating') && (
            <BacklogExpectation
              value={backlogEntry.expectation_rating}
              setExpectation={(rate) =>
                updateBacklog({ expectation_rating: rate })
              }
            />
          )}
          {show.includes('score') && (
            <BacklogScore
              score={backlogEntry.score}
              setScore={(score) => updateBacklog({ score })}
            />
          )}
          {show.includes('finished') && (
            <DateField
              value={backlogEntry.finished_at}
              onChange={(date) => {
                if (date.length > 0) {
                  updateBacklog({
                    finished_at: dayjs(date[0]).format('YYYY-MM-DD'),
                  });
                } else {
                  updateBacklog({
                    finished_at: null,
                  });
                }
              }}
            />
          )}
          {isInBacklog(backlogEntry) && (
            <button
              type="button"
              className="btn btn-light btn-sm BacklogForm-remove"
              onClick={() => confirmAlert(alertOptions)}
            >
              <XCircle color="red" size={20} />
            </button>
          )}
        </div>
      </ReactPlaceholder>
    );
  }
}

Form.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,

  game: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    release_date: PropTypes.string,
    poster: PropTypes.shape({
      thumb_url: PropTypes.string,
    }),
    platforms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }).isRequired,

  backlogFetching: PropTypes.bool.isRequired,
  backlogEntry: PropTypes.shape({
    expectation_rating: PropTypes.number,
    score: PropTypes.number,
    status: PropTypes.string,
    owned_platform_id: PropTypes.number,
    owned_platform_name: PropTypes.string,
    finished_at: PropTypes.string,
  }).isRequired,

  fetchBacklog: PropTypes.func.isRequired,
  addToBacklog: PropTypes.func.isRequired,
  updateBacklog: PropTypes.func.isRequired,
  removeFromBacklog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  backlogEntry: state.backlogForm.backlogEntry,
  backlogFetching: state.backlogForm.fetching,

  currentUser: state.session.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBacklog: (gameId) =>
    dispatch({ type: BACKLOG_ENTRY_FETCH_REQUESTED, gameId }),
  addToBacklog: (status, game) =>
    dispatch({ type: BACKLOG_ENTRY_ADD, status, game }),
  updateBacklog: (gameId, p) =>
    dispatch({ type: BACKLOG_ENTRY_UPDATE, gameId, entryParams: p }),
  removeFromBacklog: (gameId) =>
    dispatch({ type: BACKLOG_ENTRY_DELETE, gameId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
