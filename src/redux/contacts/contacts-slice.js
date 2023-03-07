import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAllContactsError,
  fetchAllContactsSuccess,
  fetchAllContactsLoading,
  fetchAddContactsError,
  fetchAddContactsSuccess,
  fetchAddContactsLoading,
  fetchDeleteContactsError,
  fetchDeleteContactsSuccess,
  fetchDeleteContactsLoading,
} from './contacts-action';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contact',
  initialState,
  extraReducers: {
    [fetchAllContactsLoading]: store => {
      store.loading = true;
    },
    [fetchAllContactsSuccess]: (store, { payload }) => {
      console.log('payload: ', payload);
      store.loading = false;
      store.items = payload;
    },
    [fetchAllContactsError]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    [fetchAddContactsLoading]: store => {
      store.loading = true;
    },
    [fetchAddContactsSuccess]: (store, { payload }) => {
      store.loading = false;
      store.items.push(payload);
    },
    [fetchAddContactsError]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    [fetchDeleteContactsLoading]: store => {
      store.loading = true;
    },
    [fetchDeleteContactsSuccess]: (store, { payload }) => {
      store.loading = false;
      const indx = store.items.findIndex(item => item.id === payload);
      store.items.splice(indx, 1);
    },
    [fetchDeleteContactsError]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
  },
});

// const contactsSlice = createSlice({
//   name: 'contact',
//   initialState,
//   reducers: {
//     addContact: {
//       reducer: (store, { payload }) => {
//         store.push(payload);
//       },
//       prepare: data => {
//         return {
//           payload: {
//             id: nanoid(),
//             ...data,
//           },
//         };
//       },
//     },
//     setDelete: (store, { payload }) => store.filter(({ id }) => id !== payload),
//   },
// });

export const { addContact, setDelete } = contactsSlice.actions;
export default contactsSlice.reducer;
