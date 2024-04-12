/* REDUX has three important things 1.REDUX STORE 2.ACTION 3.REDUCER */
const { createStore, applyMiddleware } = require("redux");
const axios = require("axios");
const thunkMiddleware = require("redux-thunk").thunk;

const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAIL = "FETCH_USER_FAIL";

// redux store
const initialState = {
  users: [],
  error: "",
  isLoading: false,
};

// action
const fetchUserRequest = () => {
  return { type: FETCH_USER_REQUEST };
};
const fetchUserSuccess = (users) => {
  return { type: FETCH_USER_SUCCESS, data: users };
};
const fetchUserFail = (error) => {
  return { type: FETCH_USER_FAIL, data: error };
};

// reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_USER_SUCCESS:
      return { isLoading: false, users: action.data, error: "" };
    case FETCH_USER_FAIL:
      return { isLoading: false, users: [], error: action.data };

    default:
      return state;
  }
};

// api call
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(({ data }) => {
        const user = data?.map((user) => user.name);
        dispatch(fetchUserSuccess(user));
      })
      .catch((err) => {
        dispatch(fetchUserFail(err));
      });
  };
};

const store = createStore(userReducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchUsers());
