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
        <Tweet tweet={tweet} />
        <NewTweet parentTweet={tweet} {...this.props} />
        <div>{childTweets.map(child => <Tweet tweet={child} />)}</div>
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

  if (typeof tweet.timestamp === 'number') {
    tweet.timestamp = formatDate(tweet.timestamp);
  }

  if (tweet.replies && tweet.replies.length > 0) {
    childTweets = Object.values(tweets)
      .filter(childTweet => tweet.replies.includes(childTweet.id))
      .map(childTweet => {
        if (typeof tweet.timestamp === 'number') {
          tweet.timestamp = formatDate(tweet.timestamp);
        }

        if (childTweet.replyingTo) {
          parentTweet = {
            id: childTweet.replyingTo,
            author: tweets[childTweet.replyingTo].author
          };
        }

        return formatTweet(
          childTweet,
          users[childTweet.author],
          authedUser,
          parentTweet
        );
      });
  }

  return {
    tweet: formatTweet(tweet, users[tweet.author], authedUser, null),
    childTweets
  };
}

export default connect(mapStateToProps)(TweetPage);
