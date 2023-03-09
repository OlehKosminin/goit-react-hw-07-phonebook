import styles from './phonebook.module.scss';

import ContactList from '../ContactList/ContactList';
import ContactFilter from '../Filter/Filter';
import ContactForm from '../ContactForm/ContactForm';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
  fetchAllContacts,
  fetchAddContact,
  fetchDeleteContacts,
} from '../../redux/contacts/contacts-operations';
import { setFilter } from 'redux/filter/filter-slice';
import { getAllContacts } from 'redux/contacts/contacts-selectors';
import { getFilterCont } from 'redux/filter/filter-selector';
import store from 'redux/store';

const Phonebook = () => {
  const contacts = useSelector(getAllContacts);
  const filter = useSelector(getFilterCont);
  console.log('store: ', store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const onAddContact = ({ name, number }) => {
    dispatch(fetchAddContact({ name, number }));
  };

  const removeContact = id => {
    const action = fetchDeleteContacts(id);
    dispatch(action);
  };

  const handleFilter = ({ target }) => {
    console.log('target: ', target.value);
    dispatch(setFilter(target.value));
  };

  const getFilterContact = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    if (contacts.items.length < 1) {
      console.log('i work');
      return;
    }
    const result = contacts.items.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  };

  const filterContact = getFilterContact();
  // console.log('filterContact.items: ', filterContact.items);

  return (
    <div>
      <div className={styles.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={onAddContact} />
        <h2>Contact</h2>
        <ContactFilter handleChange={handleFilter} />
        {filterContact.items.length > 1 ? (
          <ContactList
            items={filterContact.items}
            removeContact={removeContact}
          />
        ) : (
          <p>No search contact</p>
        )}
      </div>
    </div>
  );
};

export default Phonebook;
