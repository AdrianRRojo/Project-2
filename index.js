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
app.use('/timeline', require('./controllers/timeline'))
app.use('/players', require('./controllers/player'))



app.use(async (req, res, next) => {
    // console.log('hello from a middleware 👋')
    res.locals.myData = 'hello, fellow route!'
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
// route definitions
app.get('/', (req, res) => {
    // console.log('incoming cookie 🍪', req.cookies)
    // console.log(res.locals.myData)
    console.log('the currently logged in user is:', res.locals.user)
    res.render('index.ejs')
})
app.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

// POST /users -- create a new user in the db
app.post('/', async (req, res) => {
    try {
        // has the password from the req.body
        const hashedPassword = bcrypt.hashSync(req.body.password, 12)        
        // create a new user
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                username: req.body.username
            }, 
            defaults: {
                password: hashedPassword
            }
        })

        // if the user was found...send them to the login form
        console.log('created is:',  created)
        if (!created) {
            console.log('user exists already')
            res.redirect('/users/login?message=Please log into your account to continue.')
        } else {
            // store that new user's id as a cookie in the browser
            const encryptedUserId = crypto.AES.encrypt(newUser.id.toString(), process.env.ENC_SECRET)
            const encryptedUserIdString = encryptedUserId.toString()
            res.cookie('userId', encryptedUserIdString)
            // redirect to the homepage
            res.redirect('/users/profile')
        }

    } catch(err) {
        console.log(err)
        res.send('server error')
    }
})

//http://127.0.0.1:3000/users/login?message=Incorrect%20username%20or%20password
// GET /users/login -- show a login form to the user
app.get('/login', (req, res) => {
    console.log(req.query)
    res.render('users/login.ejs', {
        // if the req.query.message exists, pass it is as the message, otherwise pass in null
        // ternary operator
        // condition ? expression if truthy : expression if falsy
        message: req.query.message ? req.query.message : null
    })
})

// POST /users/login -- accept a payload of form data and use it log a user in 
app.post('/login', async (req, res) => {
    try {
        // look up the user in the db using the supplied username
        const user = await db.user.findOne({ 
            where: {
                username: req.body.username
            } 
        })
        const noLoginMessage = 'Incorrect username or password'

        // if the user is not found -- send the user back to the login form
        if (!user) {
            console.log('user not found')
            res.redirect('/users/login?message=' + noLoginMessage)
        // if the user is found but has given the wrong password -- send them back to the login form
        } else if (!bcrypt.compareSync(req.body.password, user.password)) {
            console.log('wrong password')
            res.redirect('/users/login?message=' + noLoginMessage)
        // if the user is found and the supplied password matches what is in the database -- log them in
        } else {
            const encryptedUserId = crypto.AES.encrypt(user.id.toString(), process.env.ENC_SECRET)
            const encryptedUserIdString = encryptedUserId.toString()
            res.cookie('userId', encryptedUserIdString)
            res.redirect('/users/profile')
        }
    } catch(err) {
        console.log(err)
        res.send('server error')
    }
})

// GET /users/logout -- log out a user by clearing the stored cookie
app.get('/logout', (req, res) => {
    // clear the cookie
    res.clearCookie('userId')
    // redirect to the homepage
    res.redirect('/')
})

app.get('/profile', (req, res) => {
    // if the user is not logged ... we need to redirect to the login form
    if (!res.locals.user) {
        res.redirect('/users/login?message=You must authenticate before you are authorized to view this resource.')
    // otherwise, show them their profile
    } else {
        res.render('users/profile.ejs', {
            user: res.locals.user
        })
    }
})





app.listen(port, () => {
    console.log(`${port} is alive`)
})