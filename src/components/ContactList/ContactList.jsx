import PropTypes from 'prop-types';
import styles from './contactList.module.scss';
const ContactList = ({ items, removeContact }) => {
  const contacts = items.map(({ id, name, number }) => (
    <li key={id}>
      {name}: {number}{' '}
      <button
        className={styles.contactListItemBtn}
        onClick={() => removeContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  ));
  return (
    <div>
      <ol>{contacts}</ol>
    </div>
  );
};
export default ContactList;

ContactList.defaultProps = {
  items: [],
};

ContactList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
