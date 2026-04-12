const express = require('express')
const router = express.Router()
const {createPost ,getAvailablePosts} = require("../Controlleurs/donationController")
const  authMiddleware = require('../Middlewares/auth')

router.post('/createpost', authMiddleware,createPost )
router.get('/availableposts',getAvailablePosts )


module.exports = router