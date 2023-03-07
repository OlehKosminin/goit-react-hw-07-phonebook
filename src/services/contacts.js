import axios from 'axios';

const contactInstance = axios.create({
  baseURL: 'https://64048bc680d9c5c7baca34b4.mockapi.io/contacts',
});

export const getAllContacts = async () => {
  const { data } = await contactInstance.get('/');
  // console.log(data);
  return data;
};

export const addContact = async data => {
  const { data: result } = await contactInstance.post('/', data);
  // console.log('result: ', result);
  return result;
};

export const deleteContacts = async id => {
  const { data } = await contactInstance.delete(`/${id}`);
  return data;
};
