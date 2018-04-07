import { RECEIVE_TWEETS } from '../actions/tweets';

export default function tweets(state = {}, action) {
  if (action.type === RECEIVE_TWEETS) {
    return { ...state, ...action.tweets };
  }

  return state;
}
