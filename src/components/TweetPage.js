import React, { Component, Fragment } from 'react';
import { formatTweet, formatDate } from '../utils/helpers';
import NewTweet from './NewTweet';

import Tweet from './Tweet';

import { connect } from 'react-redux';

class TweetPage extends Component {
  render() {
    const { tweet } = this.props;
    return (
      <div>
        <Tweet tweet={tweet} />
        <NewTweet parentTweet={tweet} {...this.props} />
      </div>
    );
  }
}

function mapStateToProps({ tweets, users, authedUser }, { match }) {
  const { id } = match.params;
  const tweet = tweets[id];
  let parentTweet = null;

  if (!tweet) {
    return {
      tweet: null
    };
  }

  if (tweet.replyingTo) {
    parentTweet = {
      id: tweet.replyingTo,
      author: tweets[tweet.replyingTo].author
    };
  }

  if (typeof tweet.timestamp === 'number') {
    tweet.timestamp = formatDate(tweet.timestamp);
  }

  return {
    tweet: formatTweet(
      tweet,
      users[tweet.author],
      authedUser,
      parentTweet
    )
  };
}

export default connect(mapStateToProps)(TweetPage);
