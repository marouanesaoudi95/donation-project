const express = require('express')
const router = express.Router()
const claimController = require("../Controlleurs/claimController")
const { getAvailablePosts } = require("../Controlleurs/donationController")


router.get('/getAvailablePosts', getAvailablePosts)
router.post('/claimDonation/:id', claimController.claimDonation)
router.get('/availableposts', claimController.getrrecordcharity)
module.exports = router