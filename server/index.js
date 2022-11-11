const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const authRouter = require("./routes/auth.routes");

require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: "*" }));

app.use("/api/auth",authRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("server started successfully");
  } catch (err) {
    console.log(err);
  }
});
