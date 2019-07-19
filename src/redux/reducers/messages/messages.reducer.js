import { createReducer } from 'shared';
import { openMessage, closeMessage } from 'redux/actions';

const initialState = {
  isOpen: false,
  text: '',
};

export const messageReducer = createReducer(initialState, {
  [openMessage]: (state, { text }) => ({text, isOpen: true}),
  [closeMessage]: () => ({text: '', isOpen: false}),
});
