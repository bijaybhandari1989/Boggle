let auth = JSON.parse(localStorage.getItem("currentUser"));

export default {
  auth: auth
    ? auth
    : {
        auth_token: "",
        high_score: 0,
      },
  apiCallsInProgress: 0,
  words: [],
};
