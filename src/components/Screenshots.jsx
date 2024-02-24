import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import ImageGallery from 'react-image-gallery';

import { SCREENSHOTS_FETCH_REQUESTED } from '../store/screenshots';
import { Loading } from './Loading';

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
        {!fetching && (
          <div>
            {screenshots && screenshots.length > 0 && (
              <ImageGallery items={screenshots} showPlayButton={false} />
            )}
          </div>
        )}
        <Loading visible={fetching} />
      </div>
    </>
  );
};

Screenshots.propTypes = {
  gameId: PropTypes.number.isRequired,
};

export default Screenshots;
