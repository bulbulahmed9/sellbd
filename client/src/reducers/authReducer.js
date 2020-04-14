import { GET_USER } from "../actions/types";

// const initialState = {
//   isAuthenticated: false,
//   user: {}
// };

export default function(state = null, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload
    default:
      return state;
  }
}
