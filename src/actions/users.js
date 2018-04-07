export const RECEIVE_USERS = 'RECEIVE_USERS';

export function handleReceiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}
