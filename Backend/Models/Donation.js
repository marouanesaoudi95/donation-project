const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donor: {
     type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
     },

  donationType: { 
    type: String, required: true, enum: ["clothes", "toys", "food", "other"]
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
     type: String, default: "available", enum: ["available", "completed"]
    },
    organization: {
     type: String, required: false
    }
    ,
    contactPhone: {
     type: String, required: false
    }

}, 
{ timestamps: true }

); // adds createdAt & updatedAt automatically

module.exports = mongoose.model('Donation', DonationSchema);
