import styles from './phonebook.module.scss';

import ContactList from '../ContactList/ContactList';
import ContactFilter from '../Filter/Filter';
import ContactForm from '../ContactForm/ContactForm';

import { useSelector, useDispatch } from 'react-redux';

import { addContact, setDelete } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-slice';
import { getAllContacts } from 'redux/contacts/contacts-selectors';
import { getFilterCont } from 'redux/filter/filter-selector';

const Phonebook = () => {
  const contacts = useSelector(getAllContacts);
  const filter = useSelector(getFilterCont);
  const dispatch = useDispatch();

  const isDublicate = name => {
    const normalized = name.toLowerCase();
    const people = contacts.find(({ name }) => {
      return name.toLowerCase() === normalized;
    });
    return Boolean(people);
  };

  const onAddContact = ({ name, number }) => {
    if (isDublicate(name)) {
      alert(`${name} is already in contacts`);
      return false;
    }
    dispatch(addContact({ name, number }));

    // const action = addContact({ name, number });
    // dispatch(action);
  };

  const removeContact = id => {
    const action = setDelete(id);
    console.log('action: ', action);
    dispatch(action);
  };

  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const getFilterContact = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  };

  const filterContact = getFilterContact();

  return (
    <div>
      <div className={styles.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={onAddContact} />

        <h2>Contact</h2>
        <ContactFilter handleChange={handleFilter} />
        <ContactList items={filterContact} removeContact={removeContact} />
      </div>
    </div>
  );
};

export default Phonebook;
/*
class Phonebook extends Component {
  state = {
    items: [...items],
    filter: '',
  };

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('my-contacts'));
    if (items?.length) {
      this.setState({ items });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { items } = this.state;
    if (prevState.items.length !== items.length) {
      localStorage.setItem('my-contacts', JSON.stringify(items));
    }
  }

  removeContact = id => {
    this.setState(({ items }) => {
      const newContacts = items.filter(item => item.id !== id);
      return { items: newContacts };
    });
  };

  addContact = ({ name, number }) => {
    if (this.isDublicate(name)) {
      alert(`${name} is already in contacts`);
      return false;
    }
    this.setState(prevState => {
      const { items } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { items: [newContact, ...items] };
    });
    return true;
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  isDublicate(name) {
    const normalized = name.toLowerCase();
    const { items } = this.state;
    const people = items.find(({ name }) => {
      return name.toLowerCase() === normalized;
    });
    return Boolean(people);
  }

  getFilterContact() {
    const { filter, items } = this.state;
    if (!filter) {
      return items;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = items.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  }

  render() {
    const { addContact, handleFilter, removeContact } = this;

    const items = this.getFilterContact();
    return (
      <div>
        <div className={styles.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contact</h2>
        <ContactFilter handleChange={handleFilter} />
        <ContactList removeContact={removeContact} items={items} />
        </div>
      </div>
    );
  }
}
export default Phonebook;
*/
