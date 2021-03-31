import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import Screenshots from './Screenshots';

const GameTabMedia = ({ game }) => (
  <div className="row GamePage-extended">
    <div className="col-12">
      <Screenshots gameId={game.id} />
      {game.videos && (
        <>
          <h4 className="GamePage-videos-header">Videos</h4>
          {game.videos.map((video) => (
            <div key={video.video_id} className="GamePage-video">
              <YouTube
                videoId={video.video_id}
                containerClassName="GamePage-video-container"
              />
            </div>
          ))}
        </>
      )}
    </div>
  </div>
);

GameTabMedia.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        video_id: PropTypes.string,
      })
    ),
  }),
};

export default GameTabMedia;
