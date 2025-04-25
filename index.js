const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDb = require("./connect");
const { restrictUserToLogin, checkAuth } = require("./middlewares/auth");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
connectDb("mongodb://127.0.0.1:27017/shorturl")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("mongo error", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"))

app.use("/url", restrictUserToLogin, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
