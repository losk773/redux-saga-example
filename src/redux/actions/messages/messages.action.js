import { createAction } from 'shared';

export const openMessage = createAction('OPEN_MESSAGE', 'text');
export const closeMessage = createAction('CLOSE_MESSAGE');
