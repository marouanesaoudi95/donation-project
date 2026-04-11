const mongoose = require('mongoose');

const ClaimsSchema = new mongoose.Schema({
  id: {
     type: mongoose.Schema.Types.ObjectId, required: [true, 'Name required'], trim: true 
    },

  post: {
     type: mongoose.Schema.Types.ObjectId, required: true , Ref:"Posts"
     },

charity: { 
    type: mongoose.Schema.Types.ObjectId, required: true , Ref:"Users"
},
  quantity: {
     type: Number, required: true 
    },
    
    status: {
     type: String, required: false ,category:["pending","confirmed"]
    },
    claimedAt: {
     type: Date, required: false , timestamps: true 
    }
    ,
    notes: {
     type: String, required: false ,optional:true
    }

}, 
); // adds createdAt & updatedAt automatically

module.exports = mongoose.model('Claim', ClaimsSchema);
