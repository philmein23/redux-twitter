import React from 'react';

export default function Icon({ path }) {
  return (
    <svg
      fill="currentColor"
      preserveAspectRatio="xMidYMid meet"
      height="1em"
      width="1em"
      viewBox="0 0 40 40"
      className="tweet-icon"
    >
      <g>
        <path d={path} />
      </g>
    </svg>
  );
}
