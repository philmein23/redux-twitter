import {
  RECEIVE_TWEETS,
  ADD_TWEET,
  ADD_LIKE_TWEET
} from '../actions/tweets';

export default function tweets(state = {}, action) {
  if (action.type === RECEIVE_TWEETS) {
    return { ...state, ...action.tweets };
  }

  if (action.type === ADD_TWEET) {
    const parentTweet = state[action.tweet.replyingTo];
    return {
      ...state,
      [action.tweet.replyingTo]: {
        ...parentTweet,
        replies: parentTweet.replies.concat(action.tweet.id)
      },
      [action.tweet.id]: action.tweet
    };
  }

  if (action.type === ADD_LIKE_TWEET) {
    const tweet = state[action.id];

    return {
      ...state,
      [action.id]: {
        ...tweet,
        likes: action.hasLiked
          ? tweet.likes.filter(id => id !== action.authedUser)
          : tweet.likes.concat(action.authedUser)
      }
    };
  }

  return state;
}
