const fs = require("fs").promises;

const contacts = require("./contacts/contacts");

const { Command } = require("commander");
const program = new Command();

const invokeActon = async ({ action, id, data }) => {
  switch (action) {
    case "list":
      const contactsList = await contacts.getAllContacts();
      return contactsList;

    case "get":
      const contact = await contacts.getContactById(id);
      return contact;

    case "add":
      const addedContact = await contacts.addContact(data);
      return addedContact;

    case "update":
      const updatedContact = await contacts.updateContactById(id, data);
      return updatedContact;

    case "remove":
      const removedContact = await contacts.removeContactById(id);
      return removedContact;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <action>", "Choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

program.parse(process.argv);
const options = program.opts();

invokeActon(options)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
