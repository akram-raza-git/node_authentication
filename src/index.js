const express = require("express");
require("./mongoose/index");
const user = require("./routes/user");
const dotenv = require("dotenv");
dotenv.config();

const Port = process.env.Port || 4000;

const app = express();
app.use(express.json());
app.use("/api/user", user);

app.listen(Port, () => console.log("Port is running at ", Port));
