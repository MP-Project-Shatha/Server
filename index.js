const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());
const userRoute = require("./routers/routes/user");
app.use(userRoute);
const PORT = process.env.PORT;
const db = require("./db/index");

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
