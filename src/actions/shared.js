import { handleReceiveTweets } from './tweets';
import { handleReceiveUsers } from './users';
import { getInitialData } from '../utils/api';
import { setAuthedUser } from './authedUser';

const AUTHED_ID = 'tylermcginnis';

export function handleGetInitialData() {
  return async dispatch => {
    try {
      const { users, tweets } = await getInitialData();
      dispatch(handleReceiveUsers(users));
      dispatch(handleReceiveTweets(tweets));
      dispatch(setAuthedUser(AUTHED_ID));
    } catch (e) {
      throw new Error(e);
    }
  };
}
