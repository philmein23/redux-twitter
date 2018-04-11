import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewTweet } from '../actions/tweets';

import { createElement } from 'glamor/react';
import { css, select as $ } from 'glamor';
/* @jsx createElement */

class NewTweet extends Component {
  state = {
    tweet: ''
  };

  handleTweetChange = e => {
    this.setState({ tweet: e.target.value });
  };

  addTweet = e => {
    e.preventDefault();

    const { tweet } = this.state;
    const { authedUser, parentTweet = null } = this.props;

    if (parentTweet.id) {
      this.props.history.push(`/tweet/${parentTweet.id}`);
    } else {
      this.props.history.push('/');
    }

    this.props.dispatch(
      addNewTweet({
        text: tweet,
        author: authedUser,
        replyingTo: parentTweet.id
      })
    );
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
          maxLength="280"
        />
        <button className="btn" type="submit">
          Submit`
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
