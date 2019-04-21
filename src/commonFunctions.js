import {AUTH_TOKEN} from "./constants";

export const isLoggedIn = () => {
  const token = localStorage.getItem(AUTH_TOKEN);
  if (token) {
    return true
  } else {
    return false
  }
};