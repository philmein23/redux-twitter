import { setAuthedUser } from './authedUser';
import { handleReceiveTweets } from './tweets';
import { handleReceieveusers } from './users';
import { getInitialData } from '../utils/api';

export function handleGetInitialData() {
  return async dispatch => {
    try {
      const { users, tweets } = await getInitialData();
    } catch (e) {
      throw new Error(e);
    }
  };
}
