const express = require('express')
const router = express.Router()
const db = require('../models')
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')



require('dotenv').config()
// encrypts the API key
apiKey = process.env.API_KEY


router.post('/', async (req, res) => {
    try {
        const comment = await db.comment.create({
            comment: req.body.comment,
            playerId: req.body.playerId,
            userId: req.user.id
        })
        res.redirect(`/results/?playerSearch=${req.body.playerId}`)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router