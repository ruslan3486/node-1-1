const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, '/db/contacts.json');
const shortid = require('shortid');


async function parsedContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return console.error(error.message);
    }
}

async function listContacts() {
    try {
        const contacts = await parsedContacts();
        console.log('List of contacts:');
        console.table(contacts);
        return contacts;
    } catch (error) {
        return console.error(error.message);
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await parsedContacts();
        const contact = contacts.find(({ id }) => id === contactId);

        if (!contact)
            return console.error(`Contact with ID ${contactId} not found!`);

        console.log(`Contact with ID ${contactId}`);
        console.table(contact);
        return contact;
    } catch (error) {
        return console.error(error.message);
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await parsedContacts();
        const newContacts = contacts.filter(({ id }) => id !== contactId);

        if (contacts.length === newContacts.length) {
            return console.error(`Contact with ID ${contactId} not found!`);
        }

        await fs.writeFile(
            contactsPath,
            JSON.stringify(newContacts, null, 2),
            'utf8',
        );

        console.log('Contact deleted successfully!');
        console.table(newContacts);

        return newContacts;
    } catch (error) {
        return console.error(error.message);
    }
}


function addContact(name, email, phone) {
    try {
        const contacts = await parsedContacts();
        const newContact = { id: shortid.generate(), name, email, phone };
        const newContacts = [...contacts, newContact];

        await fs.writeFile(
            contactsPath,
            JSON.stringify(newContacts, null, 2),
            'utf8',
        );
        return newContacts;
    } catch (error) {
        return console.error(error.message);
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await parsedContacts();
        const newContacts = contacts.filter(({ id }) => id !== contactId);

        if (contacts.length === newContacts.length) {
            return console.error(`Contact with ID ${contactId} not found!`);
        }

        await fs.writeFile(
            contactsPath,
            JSON.stringify(newContacts, null, 2),
            'utf8',
        );

        console.log('Contact deleted successfully!');
        console.table(newContacts);

        return newContacts;
    } catch (error) {
        return console.error(error.message);
    }
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
};