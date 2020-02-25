import React from 'react';
import PropTypes from 'prop-types';

import {
  UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

import { GAME_SCORES } from '../../constants';
import { gameScoreById } from '../../utils';
import IconWithText from '../IconWithText';

export const BacklogStatus = ({
  setScore, score,
}) => {
  const currentScoreItem = gameScoreById(score);
  return (
    <div className="form-group BacklogScore">
      <label>Rating</label>
      <br />
      <UncontrolledButtonDropdown>
        {!score && (
          <DropdownToggle caret outline>
            Rate this game
          </DropdownToggle>
        )}
        {score && (
          <DropdownToggle outline caret>
            <IconWithText
              icon={currentScoreItem.icon}
              color={currentScoreItem.color}
              label={currentScoreItem.label}
              size={20}
            />
          </DropdownToggle>
        )}
        <DropdownMenu>
          {GAME_SCORES.map((scoreItem) => (
            <DropdownItem key={scoreItem.id} onClick={() => setScore(scoreItem.id)}>
              <IconWithText
                icon={scoreItem.icon}
                color={scoreItem.color}
                label={scoreItem.label}
                size={22}
              />
            </DropdownItem>
          ))}
          {score && <DropdownItem divider />}
          {score && (
            <DropdownItem className="danger" onClick={() => setScore(null)}>
              Remove score
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  );
};

BacklogStatus.propTypes = {
  score: PropTypes.number,
  setScore: PropTypes.func.isRequired,
};

BacklogStatus.defaultProps = {
  score: null,
};

export default BacklogStatus;
