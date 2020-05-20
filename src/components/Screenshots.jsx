import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import ImageGallery from 'react-image-gallery';

import { SCREENSHOTS_FETCH_REQUESTED } from '../store/screenshots';

export const Screenshots = ({ gameId }) => {
  const screenshots = useSelector((state) => state.screenshots.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SCREENSHOTS_FETCH_REQUESTED, gameId });
  }, [dispatch, gameId]);

  if (screenshots && screenshots.length > 0) {
    return (
      <>
        <h4 className="Screenshots-header">Screenshots</h4>
        <div className="Screenshots">
          <ImageGallery items={screenshots} showPlayButton={false} />
        </div>
      </>
    );
  }
  return null;
};

Screenshots.propTypes = {
  gameId: PropTypes.string.isRequired,
};

export default Screenshots;
