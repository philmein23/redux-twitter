import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

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
                className="tweet"
                css={{
                  display: 'grid',
                  gridTemplateColumns: 'max-content 1fr',
                  gridGap: '10px'
                }}
              >
                <img
                  className="avatar"
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
