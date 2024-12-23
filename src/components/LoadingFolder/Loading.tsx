import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '45%',

      }}
    >
      <script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.3.0/dist/dotlottie-wc.js" type="module"></script>
      <DotLottieReact
        src="https://lottie.host/56494940-8d70-489a-a4d9-68148e9f6c4e/NaF6Mk9qdR.lottie"
        autoplay loop
        style={{
          width: '200px',
          height: '170px',
        }}
      >
      </DotLottieReact>
    </div>
  );
};

export default Loading;
