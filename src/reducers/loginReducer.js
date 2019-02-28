import { LOGIN, REGISTER } from '../actions/types';

const initialState = {
  name: '',
  email: '',
  password: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password
      };
    case REGISTER:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password
      };
    default:
      return state;
  }
}
