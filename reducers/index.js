import { ADD_ENTRY, RECEIVE_ENTRIES } from '../actions';

const entries = (state = {}, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return {
        ...state,
        ...action.payload.entry
      };
    case RECEIVE_ENTRIES:
      return {
        ...state,
        ...action.data.entries
      };
    default:
      return state;
  }
};

export default entries;
