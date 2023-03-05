import { useState } from 'react';
import PropTypes from 'prop-types';

import inititalState from './initialState';

import styles from './form.module.scss';

const ContactForm = ({onSubmit}) => {
  const [state, setState] = useState({...inititalState});

  const handleChange = ({target}) => {
    const {name, value} = target;
    setState(prevState => {
      return {...prevState, [name] : value}
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({number,name});
    setState({...inititalState});
  }

  const {name, number} = state;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.formLabel}>Name</label>
      <input
        className={styles.formName}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        value={name}
        name="name"
        onChange={handleChange}
        placeholder="name"
        required
      />
      <label className={styles.formLabel}>Number</label>
      <input
        className={styles.formNumber}
        value={number}
        name="number"
        onChange={handleChange}
        type="tel"
        placeholder="number"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        required
      />
      <button className={styles.formBtn} type="submit">Add contact</button>
    </form>
  );
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
