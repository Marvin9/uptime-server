import React from 'react';
import { Spinner } from 'baseui/spinner';

interface LoaderProps {
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ size = 60 }) => (
  <Spinner
    size={size}
    overrides={{
      Svg: {
        style: {
          position: 'absolute',
          margin: 'auto',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
    }}
  />
);

export default Loader;
