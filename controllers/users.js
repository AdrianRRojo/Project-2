const express = require('express')
const router = express.Router()
const db = require('../models')
const crypto =require('crypto-js')
const bcrypt = require('bcrypt')

// GET  /users/new --- render for a form to make a new users
router.get('/new', (req,res) => {
    res.render('users/new.ejs')
})

//POST /users --- create a new user in the DB
router.post('/', async (req, res) => {
    try {
        // has the password from the req.body
        const hashedPassword = bcrypt.hashSync(req.body.password, 12)        
        // create a new user
        const [newUser, created] = await db.user.findOrCreate({
            where: {
            email: req.body.email
            },
            defaults: {
                password: hashedPassword
            }
        })
        if(!created){
            res.redirect('users/login?message=Please log in you have an account goofy')
        }else{
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

//GET /users/login -- show a login form to the user
router.get('/login', (req,res) =>{
    console.log(req.query)
    res.render('users/login.ejs',{
        // ternary operator
        // condtion ? expression if truthy: expression if falsy
        // if the req.query.message exists(line 49) pass in the message if not leave it as null
        message: req.query.message ? req.query.message : null
    })
})
const noLoginMessage = 'Incorrect username or password'
//POST /users/login -- accept a payload of form data and use it to log a user in 
router.post('/login', async (req,res) => {
    try{
        //using the email look up the user in the database
        const hashedPassword = bcrypt.hashSync(req.body.password,12)
        const user = await db.user.findOne({
            where: {
                email: req.body.email,
                password: hashedPassword
            }
        })
         // if the user is not found -- send the user back to the login form
        if(!user){
            console.log('user not found')
            res.redirect('/users/login?message='+noLoginMessage)
        }else if(!bcrypt.compareSync(req.body.password, user.password)){
            // if the user is found but has given the wrong password -- send them to the log in form
            console.log('password incorrect')
            res.redirect('/users/login?message='+noLoginMessage)
        }else {
            // if the user is found and the supplied password matches the database-- log them into the site.
            const encryptedUserId = crypto.AES.encrypt(user.id.toString(), process.env.ENC_SECRET) //encrypt the password ---> USER used to be newUser
            const encryptedUserIdString = encryptedUserId.toString() //turn it into a string
            res.cookie('userId', encryptedUserIdString)
            res.redirect('/users/profile')
            
        }
    }catch(err){
        console.warn(err)
    }
})
//GET /users/logout -- log the user out by clearing the stored cookie
router.get('/logout', (req,res)=> {
    //clear the cookie
    res.clearCookie('userId')
    //redirect to the home page
    res.redirect('/')
})

router.get('/profile', (req,res) =>{ 
    // res.send('My profile')
    if(!res.locals.user){
        res.redirect('/users/login?message=You must log in to view this resouce')
    }else {
        res.render('users/profile.ejs', {
            user: res.locals.user
        })
    }
})
module.exports = router