const express = require("express");
const { connection } = require("./db");
const authRoutes = require("./Routes/authRoutes");
const employeeRoutes = require("./Routes/employeeRoutes");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/", employeeRoutes);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("connected to the Db");
    console.log("server is running at port 8080");
  } catch (error) {
    console.log(error);
  }
});
