import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';

import css from './Phonebook.module.css';

export const Phonebook = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const localStorageContact = localStorage.getItem('contacts');
    if (localStorageContact) {
      setContacts(JSON.parse(localStorageContact));
    }
  }, []);

  const addContact = newContact => {
    const existedContact = contacts.some(
      contact =>
        contact.name === newContact.name && contact.number === newContact.number
    );
    if (existedContact) {
      Notify.warning('This contact already exists');
      return;
    }
    newContact.id = nanoid();
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div>
      <div className={css.phonebook}>
        <ContactForm addContact={addContact} />
      </div>
      <ContactList contacts={contacts} deleteContact={deleteContact} />
    </div>
  );
};

Phonebook.propTypes = {
  contacts: PropTypes.array,
};
