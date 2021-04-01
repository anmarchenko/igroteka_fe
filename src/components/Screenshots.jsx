import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlaceholder from 'react-placeholder';

import ImageGallery from 'react-image-gallery';

import { SCREENSHOTS_FETCH_REQUESTED } from '../store/screenshots';

export const Screenshots = ({ gameId }) => {
  const screenshots = useSelector((state) => state.screenshots.data);
  const fetching = useSelector((state) => state.screenshots.fetching);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SCREENSHOTS_FETCH_REQUESTED, gameId });
  }, [dispatch, gameId]);

  return (
    <>
      <h4 className="Screenshots-header">Screenshots</h4>
      <div className="Screenshots">
        <ReactPlaceholder
          showLoadingAnimation
          color="#ddd"
          ready={!fetching}
          type="media"
          rows={10}
        >
          {screenshots && screenshots.length > 0 && (
            <ImageGallery items={screenshots} showPlayButton={false} />
          )}
        </ReactPlaceholder>
      </div>
    </>
  );
};

Screenshots.propTypes = {
  gameId: PropTypes.number.isRequired,
};

export default Screenshots;
