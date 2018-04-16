import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewTweet } from '../actions/tweets';

import { createElement } from 'glamor/react';
import { css, select as $ } from 'glamor';
/* @jsx createElement */

class NewTweet extends Component {
  state = {
    tweet: '',
    showLimitWarning: false
  };

  isDisabled = () => {
    const { tweet } = this.state;

    return tweet && tweet.length <= 280 ? false : true;
  };

  handleTweetChange = e => {
    this.setState({ tweet: e.target.value });

    this.state.tweet.length >= 180
      ? this.setState({ showLimitWarning: true })
      : this.setState({ showLimitWarning: false });
  };

  addTweet = e => {
    e.preventDefault();

    const { tweet } = this.state;
    const { authedUser, parentTweet } = this.props;

    let parentId = null;

    this.props
      .dispatch(
        addNewTweet({
          text: tweet,
          author: authedUser,
          replyingTo: parentId
        })
      )
      .then(data => {
        if (parentTweet && parentTweet.id) {
          this.props.history.push(`/tweet/${parentTweet.id}`);

          parentId = parentTweet.id;
        } else {
          this.props.history.push('/');

          parentId = null;
        }
      });
  };

  render() {
    return (
      <form
        onSubmit={this.addTweet}
        css={{
          display: 'grid',
          justifyContent: 'center',
          gridTemplateColumns: '590px',
          width: '100%'
        }}
      >
        <h1 className="header">Compose New Tweet</h1>
        <textarea
          value={this.state.tweet}
          onChange={this.handleTweetChange}
          placeholder="What's Happening?"
          className="textarea"
        />
        {this.state.showLimitWarning && (
          <div className="tweet-length">
            {280 - this.state.tweet.length} characters left
          </div>
        )}

        <button
          disabled={this.isDisabled()}
          className="btn"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(NewTweet);
