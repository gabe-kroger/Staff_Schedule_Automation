const express = require('express');
const connectDB = require('./config/db'); //we're importing connectDB from config/db.js
const path = require('path');

const app = express();
//connect database
connectDB();
//Init Middleware for parser
app.use(express.json({ extended: false }));

//Define the routes so we can actually access them
app.use('/api/users', require('./routes/api/users')); //were making a new route and getting from ./routes/api/users
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/instructors', require('./routes/api/instructors'));
app.use('/api/courses', require('./routes/api/courses'));
app.use('/api/schedule', require('./routes/api/schedule'));
app.use('/api/collisions', require('./routes/api/collisions'));
app.use('/api/timeslots', require('./routes/api/timeslot'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
