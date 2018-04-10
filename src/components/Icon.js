import React, { Fragment } from 'react';

import { createElement } from 'glamor/react';
import { css, select as $ } from 'glamor';
/* @jsx createElement */

export default function Icon({ path, hasLiked, children }) {
  return (
    <Fragment>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'max-content max-content',
          gridGap: '5px',
          alignItems: 'center'
        }}
      >
        <svg
          css={
            hasLiked ? { color: 'rgb(224, 36, 94)' } : { color: '' }
          }
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
        {children}
      </div>
    </Fragment>
  );
}
