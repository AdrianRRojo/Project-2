const express = require('express')
const router = express.Router()
const db = require('../models')
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')



require('dotenv').config()
apiKey = process.env.API_KEY



router.get('/', async (req, res) => {
    console.log('The router works')
    axios.get(`https://soccer.sportmonks.com/api/v2.0/players/search/${req.query.playerSearch}?api_token=${apiKey}&include=stats,team`)
    .then(response => {
    res.render('users/results.ejs', {players: response.data.data},)
    //res.send(response.data.data)
       
    })
    .catch(err => {
        console.log(err)
    })
})

// Provides player statistics based on who the user searched for
router.get('/', async (req, res) => {
    // console.log('The router works')
    axios.get(`https://soccer.sportmonks.com/api/v2.0/players/search/${req.query.playerSearch}?api_token=${apiKey}&include=stats,team`)
    .then(response => {
    res.render('users/results.ejs', {players: response.data.data},)
    //res.send(response.data.data)
       
    })
    .catch(err => {
        console.log(err)
    })
})




// app.get('/results', (req, res) => {
//     axios.get(`https://soccer.sportmonks.com/api/v2.0/teams/search/${req.query.teamSearch}?api_token=${apiKey}&include=stats`)
//     .then(response => {
//     //res.render('results.ejs', {teams: response.data.data},)
//     res.send(response.data.data)
       
//     })
//     .catch(err => {
//         console.log(err)
//     })
// })

module.exports = router