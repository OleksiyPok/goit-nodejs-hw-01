const fs = require("fs").promises;
const crypto = require("node:crypto");

const { CONTACTS_FILE_PATH } = require("../filePaths");

async function read() {
  const data = await fs.readFile(CONTACTS_FILE_PATH, "utf-8");
  return JSON.parse(data);
}

function write(data) {
  return fs.writeFile(CONTACTS_FILE_PATH, JSON.stringify(data, null, 2));
}

const getAllContacts = async () => {
  const contacts = read();
  return contacts;
};

const getContactById = async (contactId) => {
  const contactsList = await getAllContacts();
  const contact = contactsList.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const addContact = async (data) => {
  const contactsList = await getAllContacts();
  const newId = crypto.randomUUID();
  const newContact = { ...data, id: newId };
  contactsList.push(newContact);
  write(contactsList);
  return newContact;
};

const updateContactById = async (contactId, data) => {
  const contactsList = await getAllContacts();
  const idx = contactsList.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contactsList[idx] = { ...data, id: contactId };
  write(contactsList);
  return contactsList[idx];
};

const removeContactById = async (contactId) => {
  const contactsList = await getAllContacts();
  const idx = contactsList.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContactsList = contactsList.filter((_, index) => index !== idx);
  write(newContactsList);
  return contactsList[idx];
};

const contacts = {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
};

module.exports = contacts;
