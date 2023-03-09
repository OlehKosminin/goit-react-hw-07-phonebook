import { combineReducers } from '@reduxjs/toolkit';

import fifilterReduser from './filter/filter-slice';
import contactReduser from './contacts/contacts-slice';

const rootReducer = combineReducers({
  contacts: contactReduser,
  filter: fifilterReduser,
});

export default rootReducer;
