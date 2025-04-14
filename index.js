const express = require("express");
const urlRoute = require("./routes/url");
const connectDb = require("./connect");

const app = express();
connectDb("mongodb://127.0.0.1:27017/shorturl")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("mongo error", err));

app.use(express.json());  
app.use("/url",urlRoute);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
