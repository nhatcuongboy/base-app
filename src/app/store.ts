import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './rootReducer';

export const appReducer = (state: RootState, action: any) => {
  if (action.type === 'auth/logout') {
    state = initialRootState;
  }
  return rootReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer: any = persistReducer<RootState>(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const initialRootState: any = {
  ...store.getState(),
};

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
