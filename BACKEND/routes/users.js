const { Router } = require("express");
const { loginUser, signupUser } = require("../controllers/userController");

const router = Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

module.exports = router;
