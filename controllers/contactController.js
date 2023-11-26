const asyncHandler = require("express-async-handler"); // it helps in handling exceptions,
// we don not require try catch blocks, it automatically finds and throws the error!
const Contact = require("../models/contactModel");

//desc - get all contacts
//route - GET /api/contacts
//access - private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//desc - get contact by id
//route - GET /api/contacts/:id
//access - private
const getIndividualContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(200).json(contact);
});

//desc - create a new contact
//route - POST /api/contacts
//access - private
const createNewContact = asyncHandler(async (req, res) => {
  console.log("Contact created with: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All field are mandetory!");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//desc - update contact by id
//route - PUT /api/contacts/:id
//access - private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is not permitted to update this contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//desc - delete contact by id
//route - DELETE /api/contacts/:id
//access - private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is not permitted to delete this contact");
  }

  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});
module.exports = {
  getContacts,
  createNewContact,
  getIndividualContact,
  updateContact,
  deleteContact,
};
