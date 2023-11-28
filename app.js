// const { program } = require("commander");
const fs = require("fs").promises;

const contacts = require("./contacts/contacts");

const { Command } = require("commander");
const program = new Command();

const invokeActon = async ({ action, id, data }) => {
  switch (action) {
    case "list":
      const contactsList = await contacts.getAllContacts();
      // console.log("contactsList:", contactsList);
      return contactsList;

    case "get":
      const contact = await contacts.getContactById(id);
      // if (!contact) {
      //   throw new Error(`Contact with id=${id} not found`);
      // }
      // console.log("contact:", contact);
      return contact;

    case "add":
      const addedContact = await contacts.addContact(data);
      // console.log("addedContact:", addedContact);
      return addedContact;

    case "update":
      const updatedContact = await contacts.updateContactById(id, data);
      // if (!updatedContact) {
      //   throw new Error(`Contact with id=${id} not found`);
      // }
      // console.log("updatedContact:", updatedContact);
      return updatedContact;

    case "remove":
      const removedContact = await contacts.removeContactById(id);
      // if (!removedContact) {
      //   throw new Error(`Contact with id=${id} not found`);
      // }
      // console.log("removedContact:", removedContact);
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

// invokeActon({ action: "list" });

// const contactId = "819fe1ba-9492-4a50-a8ec-78af18ba1195";
// invokeActon({ action: "get", id: contactId });

// const newContact = {
//   name: "Fredy Krugger",
//   email: "freddy.krugger@anyhome.ru",
//   phone: "(795) 666-6666",
// };
// invokeActon({ action: "add", data: newContact });

// const contactId = "819fe1ba-9492-4a50-a8ec-78af18ba1195";
// invokeActon({
//   action: "remove",
//   id: contactId,
// });

// const contactId = "819fe1ba-9492-4a50-a8ec-78af18ba1195";
// const updateContact = {
//   name: "Fredy Krugger",
//   email: "fredy.krugger@anyhome.ru",
//   phone: "(795) 666-6666",
// };
// invokeActon({
//   action: "update",
//   id: contactId,
//   data: updateContact,
// });
