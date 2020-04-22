let auth = JSON.parse(localStorage.getItem("currentUser"));

export default {
  auth: auth
    ? auth
    : {
        auth_token: "",
      },
  apiCallsInProgress: 0,
};
