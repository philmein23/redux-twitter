import React from 'react';
import { NavLink } from 'react-router-dom';

import { createElement } from 'glamor/react';
import { css, select as $ } from 'glamor';
/* @jsx createElement */

const ul = $('> li', {
  listStyleType: 'none',
  textDecoration: 'none'
});

export default function Navbar() {
  return (
    <nav>
      <ul
        {...ul}
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, max-content)',
          gridGap: '10px'
        }}
      >
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/addtweet">
            New Tweet
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
