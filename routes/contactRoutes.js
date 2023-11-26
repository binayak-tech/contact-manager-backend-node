const express = require("express");
const router = express.Router();

const {
  getContacts,
  getIndividualContact,
  createNewContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/tokenValidatationHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(createNewContact);
router
  .route("/:id")
  .get(getIndividualContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
