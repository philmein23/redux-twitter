import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ICON_CONSTANTS } from '../constants';
import Icon from './Icon';

import { createElement } from 'glamor/react';
import { css, select as $ } from 'glamor';
/* @jsx createElement */

class Home extends Component {
  render() {
    const { users, tweets } = this.props;
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
                  src={users[tweet.author].avatarURL}
                />
                <div
                  css={{
                    display: 'grid',
                    gridGap: '10px'
                  }}
                >
                  <div className="tweet-info">
                    <div>{users[tweet.author].name}</div>
                    <div>{tweet.timestamp}</div>
                  </div>
                  <div>{tweet.text}</div>
                </div>
                <div
                  className="tweet-icons"
                  css={{
                    gridColumn: '2/-1',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, max-content)',
                    gridGap: '20px',
                    alignItems: 'center'
                  }}
                >
                  <Icon path={ICON_CONSTANTS.reply.path} />
                  <span
                    css={
                      tweet.replies.length >= 1
                        ? { display: 'block' }
                        : { display: 'none' }
                    }
                  >
                    {tweet.replies.length}
                  </span>
                  <button className="heart-button">
                    <Icon path={ICON_CONSTANTS.heart.path} />
                  </button>
                  <span
                    css={
                      tweet.likes.length >= 1
                        ? { display: 'block' }
                        : { display: 'none' }
                    }
                  >
                    {tweet.likes.length}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ tweets, users }) {
  const tweetsList = Object.values(tweets)
    .map(tweet => {
      tweet.timestamp = moment(tweet.timestamp).format(
        'h:mm:ss a | MM/DD/YY'
      );

      return tweet;
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    tweets: tweetsList,
    users
  };
}

export default connect(mapStateToProps)(Home);
