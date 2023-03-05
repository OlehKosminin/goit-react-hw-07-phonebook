import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contact',
  initialState: [],
  reducers: {
    addContact: {
      reducer: (store, { payload }) => {
        store.push(payload);
      },
      prepare: data => {
        return {
          payload: {
            id: nanoid(),
            ...data,
          },
        };
      },
    },
    setDelete: (store, { payload }) => store.filter(({ id }) => id !== payload),
  },
});

export const { addContact, setDelete } = contactsSlice.actions;
export default contactsSlice.reducer;
