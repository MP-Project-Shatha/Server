const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./db/index");
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
const roleRouter = require("./routers/routes/role");
const exercisesRouter = require("./routers/routes/exercises");
const likeRouter = require("./routers/routes/like");
app.use(likeRouter);
app.use(exercisesRouter);
app.use(roleRouter);
app.use(userRoute);
const PORT = process.env.PORT;


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
