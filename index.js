const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
const connectDB = require("./connectdb.js");
const AuthRoutes=require("./routes/authRoutes.js")
require("dotenv").config();

app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

connectDB();

app.use("/api/auth", AuthRoutes);

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build", "index.html")),
    function (err) {
      res.status(500).send(err);
    };
});

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
