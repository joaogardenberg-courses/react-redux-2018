import _ from 'lodash';
import { FETCH_POSTS, CREATE_POST, UPDATE_POST, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_POSTS:
    return _.mapKeys(action.payload.data, 'id');
  case CREATE_POST:
  case UPDATE_POST:
    return { ...state, [action.payload.data.id]: action.payload.data, redirectToIndex: true };
  case FETCH_POST:
    return { ...state, [action.payload.data.id]: action.payload.data };
  case DELETE_POST:
    return { ..._.omit(state, action.payload.data.id), redirectToIndex: true };
  default:
    return state;
  }
}