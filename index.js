const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://tubular-moonbeam-fd390c.netlify.app", // Enclosed in quotes
    ],
    credentials: true,
  })
);

mongoose.connect(process.env.CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (e) => {
  console.log(e ? e : "Connected successfully to database");
});

app.use("/auth", require("./routers/authRouter"));
app.use("/user", require("./routers/userRouter"));
app.use("/bank", require("./routers/bankRouter"));
app.use("/camps", require("./routers/campRouter"));

// Explicitly listen on the port provided by Render
const port = process.env.PORT || 3177;
app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

module.exports = app; // For serverless functions if needed
