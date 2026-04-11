const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  id: {
     type: mongoose.Schema.Types.ObjectId, required: [true, 'Name required'], trim: true 
    },

  name: {
     type: String, default: ''
     },

  email: { 
    type: String, default: '' , unique:true
},
  password: {
     type: String, required: true 
    },
    role: {
     type: String, required: true , category:["donor","charity"]
    }
    ,
    role: {
     type: String, required: true 
    }
    ,
    phone: {
     type: String, required: false , optional:true
    },
    organization: {
     type: String, required: false , optional:true
    }


}, 
{ timestamps: true 

}); // adds createdAt & updatedAt automatically

module.exports = mongoose.model('User', UsersSchema);
