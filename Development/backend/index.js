require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongo");
const session = require("express-session");
const authRoutes = require("./routes");

const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));
mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://isha_121:1234@cluster0.w0kyzdk.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connect to DB Succesfully!!"))
  .catch((error) => console.log(error));

const sessionObject = {
  secret: "process.env.SECRET_KEY",
  saveUninitialized: false,
  resave: false,
  store: mongoStore.create({
    mongoUrl:
      "mongodb+srv://isha_121:1234@cluster0.w0kyzdk.mongodb.net/?retryWrites=true&w=majority",
  }),
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
    maxAge: 1000 * 60 * 60 * 24 * 3,
  },
};

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use(session(sessionObject));

app.use("/", authRoutes);

app.listen(`${PORT}`, () => {
  console.log(`The server is listening on PORT ${PORT}`);
});

module.exports = app;