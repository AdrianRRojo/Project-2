const express = require('express')
const router = express.Router()
const db = require('../models')
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')

router.get('/results', (req, res) => {
    axios.get(`https://soccer.sportmonks.com/api/v2.0/players/search/${req.query.playerSearch}?api_token=${apiKey}&include=stats,team`)
    .then(response => {
    res.render('results.ejs', {players: response.data.data},)
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