import { configureStore } from '@reduxjs/toolkit';

import rootReduser from './root-reducer';

export const store = configureStore({
  reducer: rootReduser,
});

export default store;
