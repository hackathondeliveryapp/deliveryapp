const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const users = require("./routes/api/users.js");
const profile = require("./routes/api/profile.js");
const posts = require("./routes/api/posts.js");
const items = require("./routes/api/items.js");
const orders = require("./routes/api/orders.js");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.use(cors());

const db = require("./config/keys.js").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport.js")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/items", items);
app.use("/api/orders", orders);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
