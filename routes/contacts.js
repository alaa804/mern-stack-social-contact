const express = require('express');
const router = express.Router();
const  { check , validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middilware/auth');


// @route  GET api/contacts
// @desc   get ALL users contacts
// @access Private
router.get('/', auth , async (req , res) => {
   try {
       const contacts = await Contact.find({ user : req.user.id }).sort({ date : -1 });
       res.json(contacts);
   } catch (error) {
       console.error(error.message);
       res.status(500).send('Server Error');
       
   }
});

// @route  POST api/contacts
// @desc  Add new contacts
// @access Private
router.post('/', [ auth , [
    check('name' , 'name is Required').not().isEmpty(),
]] , async (req , res) => {
     const errors = validationResult(req);
   if(!errors.isEmpty()) {
       return res.status(400).json({ errors : errors.array() })
   }

   const { name , email , phone , type } = req.body;

   try {
       const newContact = new Contact({ 
             name , 
             email ,
             phone ,
             type,
             user : req.user.id
      })

      const contact = await newContact.save();

      res.status(201).json(contact);
   } catch (error) {
       console.error(error.message);
       res.status(500).send('Server Error');
   }
});

// @route  PUT api/contacts/:id
// @desc   get ALL users contact
// @access Private
router.put('/:id', auth, async (req, res) => {
    const {name, email, phone, type} = req.body;
  
    // Build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;
  
    try {
      let contact = await Contact.findById(req.params.id);
  
      if (!contact) return res.status(404).json({msg: 'Contact not found'});
  
      // Make sure user owns contact
      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({msg: 'Not authorized'});
      }
  
      contact = await Contact.findByIdAndUpdate(
        req.params.id,
        {$set: contactFields},
        {new: true},
      );
  
      res.json(contact);
    } catch (err) {
      console.error(er.message);
      res.status(500).send('Server Error');
    }
  });

// @route DELETE api/contacts/:id
// @desc   delete contact
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {

        const id = req.params.id;

      let contact = await Contact.findById(id);
  
      if (!contact) return res.status(404).json({ msg: 'Contact not found' });
  
      // Make sure user have the contact
      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
  
      const RemovedContact = await Contact.findByIdAndRemove(id);
  
      res.status(204).json({ msg: `Contact with the id of ${id} has been removed successfully` , RemovedContact });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });



module.exports = router;