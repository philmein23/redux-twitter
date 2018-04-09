import { saveTweet, saveLikeToggle } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const ADD_TWEET = 'ADD_TWEET';
export const ADD_LIKE_TWEET = 'ADD_LIKE_TWEET';
export const REPLY_TO_TWEET = 'REPLY_TO_TWEET';

export function handleReceiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  };
}

export function handleAddTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet
  };
}

export function handleToggleSaveLike({ id, authedUser, hasLiked }) {
  return {
    type: ADD_LIKE_TWEET,
    id,
    authedUser,
    hasLiked
  };
}

export function toggleSaveLike(tweet) {
  return async dispatch => {
    try {
      dispatch(handleToggleSaveLike(tweet));

      await saveLikeToggle(tweet);
    } catch (reason) {
      throw new Error(reason);
    }
  };
}

export function addNewTweet(newTweet) {
  return async dispatch => {
    try {
      dispatch(showLoading());
      const tweet = await saveTweet(newTweet);

      dispatch(handleAddTweet(tweet));

      dispatch(hideLoading());
    } catch (reason) {
      throw new Error(reason);
    }
  };
}
