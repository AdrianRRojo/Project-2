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

router.get('/', async (req, res) => {
    // console.log(req.query.playerClick)
    try {
        //https://soccer.sportmonks.com/api/v2.0/players/${req.query.playerClick}?api_token=${apiKey}&include=stats,team
        const response = await axios.get(`https://soccer.sportmonks.com/api/v2.0/players/${req.query.playerClick}?api_token=${apiKey}&include=stats,team`)
        console.log(req.query.playerClick)
        res.render('users/player.ejs', {player: response.data.data, playerClick: req.query.playerClick})
    } catch (error) {
        console.log(error)
    }
})


        module.exports = router