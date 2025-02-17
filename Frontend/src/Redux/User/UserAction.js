import { setEmail } from "./UserSlice";

export const setUserEmail = (email) => (dispatch) => {
  dispatch(setEmail(email));
  return;
};
