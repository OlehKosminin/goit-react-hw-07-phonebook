import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import rootReduser from './root-reducer';

export const store = configureStore({
  reducer: rootReduser,
});

export const persistor = persistStore(store);
