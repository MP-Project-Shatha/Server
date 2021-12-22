const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(express.json());
const userRoute = require("./routers/routes/user");
app.use(userRoute);
const PORT = process.env.PORT
const db = require("./db/index");

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});