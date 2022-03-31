const express = require("express");
const connectDB = require("./config/db"); //we're importing connectDB from config/db.js
const app = express();
//connect database
connectDB();
//Init Middleware for parser
app.use(express.json({ extended: false }));

//Define the routes so we can actually access them
app.use("/api/users", require("./routes/api/users")); //were making a new route and getting from ./routes/api/users
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/instructors", require("./routes/api/instructors"));
app.use(
  "/api/registrationrequests",
  require("./routes/api/registrationrequests")
);

const PORT = process.env.port || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
