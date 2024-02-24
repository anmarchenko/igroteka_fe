import React from 'react';
import { BallTriangle } from 'react-loader-spinner';

export const Loading = ({ visible }) => {
  return (
    <div>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#6427A0"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={visible}
      />
    </div>
  );
};

export default Loading;
