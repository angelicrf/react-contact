const express = require('express');
//const core = require('core');
const users = require('./routes/Users');
const auth = require('./routes/Auth');
const contacts = require('./routes/Contacts');
const connectDB = require('./config/db');
const app = express();
const path = require('path');
const port = process.env.PORT;
let cors = require('cors');

connectDB;
app.use(cors());
app.use(express.json({ extended: false}));
//app.use(cors());
/*app.get('/', (req, res) => res.json({msg: 'Succeed...'}));*/

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req,res) => res.sendFile(path.resolve('client', 'build', 'index.html' )));
}
process.env.NODE_HOST = '0.0.0.0';
const host = process.env.NODE_HOST;

app.listen(port || 30026,host, () => console.log(`The server is listening on port: ${port}...`));

