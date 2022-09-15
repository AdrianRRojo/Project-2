const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts')
const crypto = require('crypto-js')
const cookieParser = require('cookie-parser')
const db = require('./models')

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

require('dotenv').config()
apiKey = process.env.API_KEY

app.use('/comments', require('./controllers/comments'))
app.use('/results', require('./controllers/results'))
app.use('/users', require('./controllers/users'))

app.use(async (req, res, next) => {
    // console.log('hello from a middleware 👋')
    // if there is a cookie on the incoming request
    if (req.cookies.userId) {
        // decrypt the user id before we look up the user in the db
        const decryptedId = crypto.AES.decrypt(req.cookies.userId.toString(), process.env.ENC_SECRET)
        const decryptedIdString = decryptedId.toString(crypto.enc.Utf8)
        // look up the user in the db
        const user = await db.user.findByPk(decryptedIdString)
        // mount the user on the res.locals
        res.locals.user = user
    // if there is no cookie -- set the user to be null in the res.locals
    } else {
        res.locals.user = null
    }
    // move on to the next route or middleware in the chain
    next()
})




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