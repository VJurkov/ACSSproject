export function isAuthorized(currentUser) {
  return currentUser.token && localStorage.getItem("TOKEN");
}
