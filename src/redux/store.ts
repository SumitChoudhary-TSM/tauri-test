import { combineReducers, configureStore, UnknownAction } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { dialogMiddleware } from './middleware/dialogMiddleware';

const persistConfig = {
  key: 'root',
  storage,
};

const appReducer = combineReducers({
  auth: authReducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: UnknownAction) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(dialogMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const dispatch = store.dispatch;
export const getState = store.getState;
export const persistor = persistStore(store);

export default store;
