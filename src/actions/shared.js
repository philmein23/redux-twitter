import { handleReceiveTweets } from './tweets';
import { handleReceiveUsers } from './users';
import { getInitialData } from '../utils/api';
import { setAuthedUser } from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading';

const AUTHED_ID = 'tylermcginnis';

export function handleGetInitialData() {
  return async dispatch => {
    try {
      dispatch(showLoading());
      const { users, tweets } = await getInitialData();
      dispatch(handleReceiveUsers(users));
      dispatch(handleReceiveTweets(tweets));
      dispatch(setAuthedUser(AUTHED_ID));

      dispatch(hideLoading());
    } catch (e) {
      throw new Error(e);
    }
  };
}
