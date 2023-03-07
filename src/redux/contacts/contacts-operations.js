import * as api from '../../services/contacts';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import * as action from './contacts-action';

export const fetchAllContacts = createAsyncThunk(
  'contacts/fetch-all',
  async (_, thunkApi) => {
    try {
      const data = await api.getAllContacts();
      return data;
    } catch ({ response }) {
      return thunkApi.rejectWithValue(response.data.message);
    }
  }
);

export const fetchAddContact = createAsyncThunk(
  'contacts/fetch-add',
  async (data, thunkApi) => {
    try {
      const result = await api.addContact(data);
      return result;
    } catch ({ response }) {
      return thunkApi.rejectWithValue(response.data.message);
    }
  },
  {
    condition: ({ name, number }, { getState }) => {
      const { contacts } = getState();
      const normalizedTitle = name.toLowerCase();
      const normalizedAuthor = number.toLowerCase();
      const result = contacts.items.find(({ name, number }) => {
        return (
          name.toLowerCase() === normalizedTitle &&
          number.toLowerCase() === normalizedAuthor
        );
      });
      if (result) {
        alert(`${number}. Author: ${name} is already ixist`);
        return false;
      }
    },
  }
);

export const fetchDeleteContacts = createAsyncThunk(
  'contacts/delete',
  async (id, thunkApi) => {
    try {
      await api.deleteContacts(id);
      return id;
    } catch ({ response }) {
      return thunkApi.rejectWithValue(response.data.message);
    }
  }
);
