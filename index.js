const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.use(ejsLayouts)

require('dotenv').config()
apiKey = process.env.API_KEY

app.get('/', (req, res) => {
        res.render('index.ejs')
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
app.get('/results', (req, res) => {
    axios.get(`https://soccer.sportmonks.com/api/v2.0/players/search/${req.query.playerSearch}?api_token=${apiKey}&include=stats,team`)
    .then(response => {
    res.render('results.ejs', {players: response.data.data},)
    //res.send(response.data.data)
       
    })
    .catch(err => {
        console.log(err)
    })
})

app.listen(port, () => {
    console.log(`${port} is alive`)
})