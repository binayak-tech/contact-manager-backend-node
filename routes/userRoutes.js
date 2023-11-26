const express = require("express");
const router = express.Router();

const {
  userLogin,
  userRegistration,
  currentUserData,
} = require("../controllers/userController");
const validateToken = require("../middleware/tokenValidatationHandler");

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/currentUser", validateToken, currentUserData);

module.exports = router;
