const { Router } = require("express");
const { Register, Login } = require("../controllers/auth");

const authRouter = Router();

authRouter.post("/signup", Register);
authRouter.post("/signin", Login);

module.exports = authRouter;
