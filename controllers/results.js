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


// Provides player statistics based on who the user searched for
// router.get('/', async (req, res) => {
//     // console.log('The router works')
//     axios.get(`https://soccer.sportmonks.com/api/v2.0/players/search/${req.query.playerSearch}?api_token=${apiKey}&include=stats,team`)
//     .then(response => {
//     res.render('users/results.ejs', {players: response.data.data, playerSearch: req.query.playerSearch})
//     //res.send(response.data.data)
       
//     })
//     .catch(err => {
//         console.log(err)`
//     })
// })

router.get('/', async (req, res) => {

    try {
        // axios.get(`https://soccer.sportmonks.com/api/v2.0/players/search/${req.query.playerSearch}?api_token=${apiKey}&include=stats,team`)
        
        const response = await axios.get(`https://soccer.sportmonks.com/api/v2.0/players/search/${req.query.playerSearch}?api_token=${apiKey}&include=stats,team`)
        res.render('users/results.ejs', {players: response.data.data, playerSearch: req.query.playerSearch})
        // res.render('users/results.ejs', {players: response.data.data, playerSearch: req.query.playerSearch})
        // if(!req.query.playerSearch === "Lionel Andrés Messi Cuccittini") {
        //     res.render('users/results.ejs', {players: response.data.data[0], playerSearch: req.query.playerSearch})
        //     console.log(response.data.data[0])
        //     const [player, created] = await db.player.findOrCreate({
        //         where: {
        //             name: req.query.playerSearch,
        //             playerId: response.data.data[0].player_id
        //     }
        // })
        // }else{
        //     res.send(response.data.data[3])
        // }

     

        
       // res.json(response.data.data[x])
    //     const [player, created] = await db.player.findOrCreate({
    //         where: {
    //             name: req.query.playerSearch,
    //             playerId: response.data.data[0].player_id
    //         }
    //     })
    //    res.render('users/results.ejs', {players: response.data.data, playerSearch: req.query.playerSearch})
    } catch (error) {
        console.log(error)
    }
})


module.exports = router