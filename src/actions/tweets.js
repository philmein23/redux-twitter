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
