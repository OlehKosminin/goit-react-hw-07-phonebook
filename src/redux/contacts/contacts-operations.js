import * as api from '../../services/contacts';
import * as action from './contacts-action';

export const fetchAllContacts = () => {
  const func = async dispatch => {
    try {
      dispatch(action.fetchAllContactsLoading());
      const data = await api.getAllContacts();
      dispatch(action.fetchAllContactsSuccess(data));
    } catch ({ response }) {
      dispatch(action.fetchAllContactsError(response.data.message));
    }
  };
  return func;
};

export const fetchAddContact = ({ name, number }) => {
  const func = async dispatch => {
    try {
      dispatch(action.fetchAddContactsLoading());
      const result = await api.addContact(name, number);
      dispatch(action.fetchAddContactsSuccess(result));
    } catch ({ response }) {
      console.log('response: ', response.data.message);
      dispatch(action.fetchAddContactsError(response));
    }
  };
  return func;
};

export const fetchDeleteContacts = id => {
  const func = async dispatch => {
    try {
      dispatch(action.fetchDeleteContactsLoading());
      await api.deleteContacts(id);
      dispatch(action.fetchDeleteContactsSuccess);
    } catch ({ response }) {
      dispatch(action.fetchDeleteContactsError(response.data.message));
    }
  };
  return func;
};
