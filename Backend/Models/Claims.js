const mongoose = require('mongoose');

const ClaimsSchema = new mongoose.Schema({
  post: {
     type: mongoose.Schema.Types.ObjectId, required: true , ref: "Donation"
     },

charity: { 
    type: mongoose.Schema.Types.ObjectId, required: true , ref: "User"
},
  quantity: {
     type: Number, required: true 
    },
    
    status: {
     type: String, default: "pending", enum: ["pending", "confirmed"]
    },
    claimedAt: {
     type: Date, default: Date.now
    }
    ,
    notes: {
     type: String, required: false
    }

}, { timestamps: true }); // adds createdAt & updatedAt automatically

module.exports = mongoose.model('Claim', ClaimsSchema);
