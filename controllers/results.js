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


router.use(express.urlencoded({ extended: false }))
router.use(cookieParser())

router.get('/', async (req, res) => {

    try {
        
        const response = await axios.get(`https://soccer.sportmonks.com/api/v2.0/players/search/${req.query.playerSearch}?api_token=${apiKey}&include=stats,team`)
        res.render('users/results.ejs', {players: response.data.data, playerSearch: req.query.playerSearch})

    } catch (error) {
        console.log(error)
    }
})


module.exports = router