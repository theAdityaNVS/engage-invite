import React from 'react';

export default function TirupatiGopuramSVG(props) {
  return (
    <img
      src="/illustrations/tirupati-gopuram-night.png"
      alt="Sri Tirupati Venkateswara Temple Gopuram"
      style={{
        width: '100%',
        maxWidth: 900, // Constrain size on larger viewports
        display: 'block',
        margin: '0 auto',
        mixBlendMode: 'screen', // Blends black background seamlessly onto the deep navy site theme
        filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.5)) contrast(1.05)',
        ...props.style
      }}
      className={props.className}
    />
  );
}
