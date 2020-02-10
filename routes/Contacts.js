const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');
const Contact = require('../models/Contacts');


router.get('/', auth, async (req, res) => {
    try{
       const contacts = await Contact.find({user: req.user.id}).select({date: -1});
       res.json(contacts);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error....");
    }
});
router.post('/', (req, res) => res.send('Add user contacts'));
router.put('/:id', (req, res) => res.send('Update user contacts'));
router.delete('/:id', (req, res) => res.send('Delete user contacts'));



module.exports = router;
