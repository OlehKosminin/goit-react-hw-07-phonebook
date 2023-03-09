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
import { getFilteredContacts } from 'redux/contacts/contacts-selectors';

const Phonebook = () => {
  const filteredContacts = useSelector(getFilteredContacts);

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
    dispatch(setFilter(target.value));
  };

  return (
    <div>
      <div className={styles.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={onAddContact} />
        <h2>Contact</h2>
        <ContactFilter handleChange={handleFilter} />
        {filteredContacts ? (
          <ContactList items={filteredContacts} removeContact={removeContact} />
        ) : (
          <p>No search contact</p>
        )}
      </div>
    </div>
  );
};

export default Phonebook;
