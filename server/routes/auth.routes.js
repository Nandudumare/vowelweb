const { Router } = require("express");
const { Register, Login, verify, getUser } = require("../controllers/auth");

const authRouter = Router();

authRouter.post("/signup", Register);
authRouter.post("/signin", Login);
authRouter.post("/verify", verify);
authRouter.get("/getuser/:id", getUser);

module.exports = authRouter;
