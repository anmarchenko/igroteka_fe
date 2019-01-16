import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import ReactPlaceholder from 'react-placeholder';
import dayjs from 'dayjs';

import DateField from './DateField';
import Note from './Note';
import Platform from './Platform';
import BacklogRating from './BacklogRating';
import BacklogStatus from './BacklogStatus';

import {
  BACKLOG_ENTRY_FETCH_REQUESTED,
  BACKLOG_ENTRY_ADD,
  BACKLOG_ENTRY_UPDATE,
  BACKLOG_ENTRY_DELETE,
} from '../../store/backlogForm';

import { BACKLOG_FIELDS } from '../../constants';

import './Form.css';

const isInBacklog = entry => !!entry.id;

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
    return (
      <ReactPlaceholder showLoadingAnimation color="#ddd" ready={ready} type="text" rows={5}>
        <div className="BacklogForm">
          <h5>My collection</h5>
          <div className="row">
            <div className="col-12">
              <BacklogStatus
                entryExists={isInBacklog(backlogEntry)}
                status={backlogEntry.status}
                onStatusChange={this.onStatusChange}
                onDelete={this.removeFromBacklog}
              />
            </div>
          </div>

          <div className="row BacklogForm-note">
            {show.includes('expectationRating') && (
              <div className="col-12">
                <BacklogRating
                  label="Expectation score"
                  value={backlogEntry.expectation_rating}
                  color="blue"
                  onChange={rate => updateBacklog({ expectation_rating: rate })}
                />
              </div>
            )}
            {show.includes('platform') && (
              <div className="col-12">
                <Platform
                  label="My platform"
                  platformId={backlogEntry.owned_platform_id}
                  platformName={backlogEntry.owned_platform_name}
                  onChange={(platformId, platformName) => updateBacklog({
                    owned_platform_id: platformId,
                    owned_platform_name: platformName,
                  })
                  }
                  platforms={game.platforms}
                />
              </div>
            )}
            {show.includes('score') && (
              <div className="col-12">
                <BacklogRating
                  label="Score"
                  value={backlogEntry.score}
                  color="yellow"
                  onChange={rate => updateBacklog({ score: rate })}
                  max={10}
                />
              </div>
            )}
            {show.includes('finished') && (
              <div className="col-12">
                <DateField
                  label="Finished"
                  value={backlogEntry.finished_at}
                  onChange={date => updateBacklog({
                    finished_at: dayjs(date[0]).format('YYYY-MM-DD'),
                  })
                  }
                />
              </div>
            )}
            {show.includes('note') && (
              <div className="col-12">
                <Note
                  label="Note"
                  note={backlogEntry.note}
                  onChange={note => updateBacklog({ note })}
                />
              </div>
            )}
          </div>
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    poster: PropTypes.shape({
      thumb_url: PropTypes.string,
    }),
    platforms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,

  backlogFetching: PropTypes.bool.isRequired,
  backlogEntry: PropTypes.shape({}).isRequired,

  fetchBacklog: PropTypes.func.isRequired,
  addToBacklog: PropTypes.func.isRequired,
  updateBacklog: PropTypes.func.isRequired,
  removeFromBacklog: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  backlogEntry: state.backlogForm.backlogEntry,
  backlogFetching: state.backlogForm.fetching,

  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  fetchBacklog: gameId => dispatch({ type: BACKLOG_ENTRY_FETCH_REQUESTED, gameId }),
  addToBacklog: (status, game) => dispatch({ type: BACKLOG_ENTRY_ADD, status, game }),
  updateBacklog: (gameId, p) => dispatch({ type: BACKLOG_ENTRY_UPDATE, gameId, entryParams: p }),
  removeFromBacklog: gameId => dispatch({ type: BACKLOG_ENTRY_DELETE, gameId }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
