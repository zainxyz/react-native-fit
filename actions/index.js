export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';
export const ADD_ENTRY = 'ADD_ENTRY';

export const receiveEntries = entries => ({
  type: RECEIVE_ENTRIES,
  data: {
    entries
  }
});

export const addEntry = entry => ({
  type: ADD_ENTRY,
  payload: {
    entry
  }
});
