const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const { read } = require('fs');

const contactsPath = './db/contacts.json';

const readContacts = async () => {
  const result = await fs.readFile(path.join(__dirname, contactsPath), 'utf8');
  const contacts = JSON.parse(result);
  return contacts;
};

// TODO: задокументировать каждую функцию
function listContacts() {
  return readContacts();
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const [result] = contacts.filter(contact => contact.id === contactId);
  return result;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const removeContact = contacts.find(contact => contact.id === contactId);

  const newContacts = contacts.filter(contact => contact.id !== contactId);

  await fs.writeFile(
    path.join(__dirname, contactsPath),
    JSON.stringify(newContacts, null, 2),
  );

  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);

  await fs.writeFile(
    path.join(__dirname, contactsPath),
    JSON.stringify(contacts, null, 2),
  );
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
