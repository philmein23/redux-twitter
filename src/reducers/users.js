import { RECEIVE_USERS } from '../actions/users';
import { ADD_TWEET } from '../actions/tweets';

export default function users(state = {}, action) {
  if (action.type === RECEIVE_USERS) {
    return {
      ...state,
      ...action.users
    };
  }

  if (action.type === ADD_TWEET) {
    return {
      ...state,
      [action.tweet.author]: {
        ...state[action.tweet.author],
        tweets: state[action.tweet.author].tweets.concat(
          action.tweet.id
        )
      }
    };
  }

  return state;
}
