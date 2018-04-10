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
              <Tweet key={tweet.id} tweet={tweet} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ tweets, users, authedUser }) {
  const tweetsList = Object.values(tweets)
    .map(tweet => {
      let parentTweet = null;

      if (typeof tweet.timestamp === 'number') {
        tweet.timestamp = formatDate(tweet.timestamp);
      }

      if (tweet.replyingTo) {
        parentTweet = {
          id: tweet.replyingTo,
          author: tweets[tweet.replyingTo].author
        };
      }

      return formatTweet(
        tweet,
        users[tweet.author],
        authedUser,
        parentTweet
      );
    })
    .sort((a, b) => b.timestamp - a.timestamp);
  return {
    tweets: tweetsList,
    authedUser
  };
}

export default connect(mapStateToProps)(Home);
