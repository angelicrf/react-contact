const express = require('express');
const users = require('./routes/Users');
const auth = require('./routes/Auth');
const contacts = require('./routes/Contacts');
const connectDB = require('./config/db');
const app = express();
const port = process.env.PORT;


app.get('/', (req, res) => res.json({msg: 'Succeed...'}));

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);

app.listen(port, () => console.log(`The server is listenning on port: ${port}...`));
connectDB;
