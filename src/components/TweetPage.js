import React, { Component, Fragment } from 'react';
import { formatTweet, formatDate } from '../utils/helpers';
import NewTweet from './NewTweet';

import Tweet from './Tweet';

import { connect } from 'react-redux';

class TweetPage extends Component {
  render() {
    const { tweet, childTweets } = this.props;
    return (
      <div>
        <Tweet id={tweet.id} />
        <NewTweet parentTweet={tweet} {...this.props} />
        <div>{childTweets.map(child => <Tweet id={child.id} />)}</div>
      </div>
    );
  }
}

function mapStateToProps({ tweets, users, authedUser }, { match }) {
  const { id } = match.params;
  const tweet = tweets[id];
  let parentTweet = null;
  let childTweets = [];

  if (!tweet) {
    return {
      tweet: null
    };
  }

  if (tweet.replies && tweet.replies.length > 0) {
    childTweets = Object.values(tweets)
      .filter(childTweet => tweet.replies.includes(childTweet.id))
      .sort((a, b) => (b.timestamp = a.timestamp));
  }

  return {
    tweet,
    childTweets
  };
}

export default connect(mapStateToProps)(TweetPage);
