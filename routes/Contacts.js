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
       const contacts = await Contact.find({
           user: req.user.id
           })
           .select({name: '', type: '', email: '', phone: ''});
       res.json(contacts);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error....");
    }
});
router.post('/', auth ,[
    check('name', 'name is required').not().isEmpty(),
    ],
   async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const {name, email, phone,type} = req.body;
        try{
           const newContact = new Contact({
               name, email, phone, type, user: req.user.id
           });
            const contact = await newContact.save();
            res.json(contact);

        }catch (e) {
            console.error(e.message);
            res.status(500).send('Server Error....');
        }

    });
router.put('/:id', auth, async  (req, res) => {
    const {name, email, phone,type} = req.body;

    const contactFeild = {};
    if(name) contactFeild.name = name;
    if(email) contactFeild.email = email;
    if(phone) contactFeild.phone = phone;
    if(type) contactFeild.type = type;

    try{
        let contact = await Contact.findById(req.params.id);
        if(!contact) {
            return res.status(400).json({msg:'contact is not valid or exist'});
        }
        if(contact.user.toString() !== req.user.id) {
            res.status(401).json({msg: 'The contact is not the same'});
        }
        contact = await Contact.findByIdAndUpdate(req.params.id,
            {$set: contactFeild},
            {new: true}
            );
        res.json(contact);

    }catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error....');
    }

});
router.delete('/:id', auth , async (req, res) => {

    try{
        let contact = await Contact.findById(req.params.id);
        if(!contact) {
            return res.status(400).json({msg:'contact is not valid or exist'});
        }
        if(contact.user.toString() !== req.user.id) {
            res.status(401).json({msg: 'The contact is not the same'});
        }
        contact = await Contact.findByIdAndRemove(req.params.id);
        res.json({msg: 'Contact Removed'});

    }catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error....');
    }
});

module.exports = router;
