import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ICON_CONSTANTS } from '../constants';
import Icon from './Icon';
import { toggleSaveLike } from '../actions/tweets';
import { Link } from 'react-router-dom';
import { formatTweet, formatDate } from '../utils/helpers';

import { createElement } from 'glamor/react';
import { css, select as $ } from 'glamor';
/* @jsx createElement */

class Tweet extends Component {
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
    const { tweet } = this.props;
    return (
      <Link to={{ pathname: `/tweet/${tweet.id}` }}>
        <li
          key={tweet.id}
          className="tweet"
          css={{
            display: 'grid',
            gridTemplateColumns: 'max-content 1fr',
            gridGap: '10px',
            marginBottom: '10px'
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
              {tweet.parent && (
                <button className="replying-to">
                  Relying to @{tweet.parent.author}
                </button>
              )}
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
      </Link>
    );
  }
}

function mapStateToProps({ authedUser, users, tweets }, { id }) {
  const tweet = tweets[id];

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

  return {
    tweet: formatTweet(
      tweet,
      users[tweet.author],
      authedUser,
      parentTweet
    ),
    authedUser
  };
}

export default connect(mapStateToProps)(Tweet);
