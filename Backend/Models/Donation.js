const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  id: {
     type: mongoose.Schema.Types.ObjectId, required: [true, 'Name required'], trim: true 
    },

  donor: {
     type: String, default: '' , unique:true , Ref:"Users"
     },

  donationType: { 
    type: String, default: '' , unique:true ,category:["clothes", "toys","other"]
},
  quantity: {
     type: Number, required: true 
    },
    remainingQty: {
     type: Number, required: true 
    }
    ,
    description: {
     type: String, required: true , maxLength:1000
    }
    ,
    status: {
     type: String, required: false ,category:["available","completed"]
    },
    organization: {
     type: String, required: false
    }
    ,
    contactPhone: {
     type: String, required: false ,optional:true
    }

}, 
); // adds createdAt & updatedAt automatically

module.exports = mongoose.model('Donation', DonationSchema);
