const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
},

    name : {
    type : String ,
    required : true ,
},

  email : {
    type : String ,
    required : true ,
},

   phone : {
    type : String ,
},

type : {
    type : String,
    default : 'personal'
},

  date : {
    type : Date ,
    required : true ,
    default : Date.now(),
},

},{
    timestamps : true 
})

module.exports = mongoose.model('Contact' , contactSchema)