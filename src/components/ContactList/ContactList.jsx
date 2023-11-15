import React, { useState } from 'react';

import css from './ContactList.module.css';

export const ContactList = ({ contacts, deleteContact }) => {
  const [filter, setFilter] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const getContacts = () => {
    if (filter.length === 0) {
      return contacts;
    }

    return contacts.filter(
      contact => contact.name.toLowerCase().indexOf(filter) >= 0
    );
  };

  return (
    <div>
      <h2>Contacts</h2>
      <form className={css.contact_list}>
        <label className={css.phonebook_label}>
          Find contacts by name
          <input
            type="text"
            name="filter"
            value={filter}
            onChange={handleChange}
          ></input>
        </label>
      </form>

      <ul>
        {getContacts().map(({ name, number, id }) => (
          <li key={id} className={css.contact}>
            {name}
            {number}
            <div>
              <button
                className={css.deleteBtn}
                onClick={() => deleteContact(id)}
              >
                Delete contact
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
