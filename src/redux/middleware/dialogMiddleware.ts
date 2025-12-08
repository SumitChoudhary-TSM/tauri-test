import { hideDialog } from '@/redux/reducers/utilsSlice';
import { Middleware } from 'redux';

export const dialogMiddleware: Middleware = (store) => (next) => (action: unknown) => {
  const result = next(action);

  if (hideDialog.match(action)) {
    const { dialogBox } = store.getState().utils;

    if (typeof dialogBox.onClose === 'function') {
      dialogBox.onClose();
    }
  }

  return result;
};
