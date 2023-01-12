const express = require('express')
const router = express.Router()
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')


require('dotenv').config()
// encrypts the API key
// apiKey = process.env.API_KEY
apiKey = process.env.FOOTBALL_API


router.use(express.urlencoded({ extended: false }))
router.use(cookieParser())

router.get('/', async (req, res) => {
    try {
        // const options = {
        //     method: 'GET',
        //     url: 'https://api-football-v1.p.rapidapi.com/v3/players',
        //     params: {search: `${req.query.playerSearch}`},
        //     headers: {
        //       'X-RapidAPI-Key': apiKey,
        //       'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        //     }
        //   };
        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
            params: {name: `${req.query.leagueSearch}`},
            headers: {
              'X-RapidAPI-Key': apiKey,
              'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
          };
        
        axios.request(options)
            .then(function (response) {
                // console.log(response.data.response[0]);
                // console.log(response.data.response[0])
                res.render('users/leagueResults.ejs', {apiKey: apiKey, leagueSearch: response.data.response[0]})
        
        }).catch(function (error) {
            console.error(error);
        });
        
        
        
    } catch (error) {
        console.log(error)
    }
})

router.get('/players', async (req, res) => {
    try {
            const playerOptions = {
                method: 'GET',
                url: "https://v3.football.api-sports.io/players",
                params: {searchPlayers:`${req.query.searchPlayers}`, league: `${response.data.response[0].league.id}`},
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                  }
            }
            axios.request(playerOptions)
                .then(function(response){
                    console.log(response)
                })

        
        .catch(function (error) {
            console.error(error);
        });
        
        
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router