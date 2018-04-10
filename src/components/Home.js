import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ICON_CONSTANTS } from '../constants';
import Icon from './Icon';
import { formatTweet, formatDate } from '../utils/helpers';
import { toggleSaveLike } from '../actions/tweets';

import { createElement } from 'glamor/react';
import { css, select as $ } from 'glamor';
/* @jsx createElement */

class Home extends Component {
  toggleLike = tweet => {
    const { authedUser } = this.props;

    this.props.dispatch(
      toggleSaveLike({
        authedUser,
        id: tweet.id,
        hasLiked: tweet.hasLiked
      })
    );
  };

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
              <li
                key={tweet.id}
                className="tweet"
                css={{
                  display: 'grid',
                  gridTemplateColumns: 'max-content 1fr',
                  gridGap: '10px'
                }}
              >
                <img
                  className="avatar"
                  alt={`${tweet.author}'s Avatar`}
                  src={tweet.avatar}
                />
                <div
                  css={{
                    display: 'grid',
                    gridGap: '10px'
                  }}
                >
                  <div className="tweet-info">
                    <div>{tweet.name}</div>
                    <div>{tweet.timestamp}</div>
                  </div>
                  <div>{tweet.text}</div>
                </div>
                <div
                  className="tweet-icons"
                  css={{
                    gridColumn: '2/-1',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, max-content)',
                    gridGap: '10px',
                    alignItems: 'center'
                  }}
                >
                  <Icon path={ICON_CONSTANTS.reply.path}>
                    <span
                      css={
                        tweet.replies >= 1
                          ? { display: 'block' }
                          : { display: 'none' }
                      }
                    >
                      {tweet.replies}
                    </span>
                  </Icon>

                  <button
                    onClick={() => this.toggleLike(tweet)}
                    className="heart-button"
                  >
                    <Icon
                      hasLiked={tweet.hasLiked}
                      path={ICON_CONSTANTS.heart.path}
                    >
                      <span
                        css={
                          tweet.likes >= 1
                            ? { display: 'block' }
                            : { display: 'none' }
                        }
                      >
                        {tweet.likes}
                      </span>
                    </Icon>
                  </button>
                </div>
              </li>
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
