//require packages
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const cookikeParser = require('cookie-parser')
const db = require('./models')
const crypto = require('crypto-js')
//config express / middlewares
const app = express()
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({extended: false}))
app.use(cookikeParser())



app.use(async (req,res,next) => {
    // console.log('ayo from the midware')
    res.locals.myData = 'hello, fellow route!'
    // if there is a cookie on the incoming request
    if(req.cookies.userId){
        //decrypt the user id before we look up the user in the db
        const decryptedId = crypto.AES.decrypt(req.cookies.userId.toString(), process.env.ENC_SECRET)
        const decryptedIdString = decryptedId.toString(crypto.enc.Utf8)

        // look up the user in the database
        const user = await db.user.findByPk(decryptedIdString)
        // mount the user in the res.locals
        res.locals.user = user
    }else {
        res.locals.user = null
    }

        
    // if there is no cookie -- set  the user to be null in the res.locals


    // move on to the next route and or middleware in the chain
    // express now knows to move on
    next()
})

//route def
app.get('/', (req,res) => {
    // console.log('incoming cookie',req.cookies)
    // console.log(res.locals.myData)
    console.log(`the current user is ${res.locals.user}`)
    res.render('home.ejs')
})
// controllers

app.use('/users', require('./controllers/users'))
app.use('/player', require('./controllers/players'))
app.use('/matches', require('./controllers/matches'))
//listen on a port

app.listen(PORT, ()=> {
    console.log(`${PORT} Is online`)
})