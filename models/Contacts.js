const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contacts'
    },
    phone:{
        type: String
    },
    type:{
        type: String,
        default: 'personal'
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('contact', ContactSchema);
