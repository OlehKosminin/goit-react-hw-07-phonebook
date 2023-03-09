import Phonebook from './Phonebook/Phonebook';
import { Provider } from 'react-redux';

import { store } from 'redux/store';

export const App = () => {
  return (
    <Provider store={store}>
      <Phonebook />
    </Provider>
  );
};
