const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema({
    
  name: {
     type: String,  required: true
     },

  email: { 
    type: String,  required: true , unique:true
},
  password: {
     type: String, required: true 
    },
    role: {
     type: String, required: true, enum: ["donor", "charity"]
    }
    ,
    phone: {
     type: String, required: false
    },
    organization: {
     type: String, required: false
    }


}, 
{ timestamps: true 

}); // adds createdAt & updatedAt automatically
module.exports = mongoose.model('User', UsersSchema);
