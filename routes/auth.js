const router = require("express").Router();

const loginUser = require("../controllers/auth/login");
const registerUser = require("./../controllers/auth/register");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get");

module.exports = router;
