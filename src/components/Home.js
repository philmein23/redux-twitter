import React, { Component } from 'react';
import { connect } from 'react-redux';

import { formatTweet, formatDate } from '../utils/helpers';
import Tweet from './Tweet';

import { createElement } from 'glamor/react';
import { css, select as $ } from 'glamor';
/* @jsx createElement */

class Home extends Component {
  render() {
    const { tweets } = this.props;
    return (
      <div>
        <h1 className="header">Your Timeline</h1>
        <div>
          <ul
            css={{
              display: 'grid',
              justifyContent: 'center',
              gridRowGap: '10px'
            }}
          >
            {tweets.map(tweet => (
              <Tweet key={tweet.id} id={tweet.id} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ tweets }) {
  return {
    tweets: Object.values(tweets).sort(
      (a, b) => b.timestamp - a.timestamp
    )
  };
}

export default connect(mapStateToProps)(Home);
