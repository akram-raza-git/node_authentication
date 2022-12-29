const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/almati", { useNewUrlParser: true })
  .then(() => console.log("Connect to DB"))
  .catch((error) => console.log(error));

module.exports = mongoose;
