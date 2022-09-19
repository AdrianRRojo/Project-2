const express = require('express')
const router = express.Router()
const db = require('../models')
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')

require('dotenv').config()
// encrypts the API key
apiKey = process.env.API_KEY

router.use(express.urlencoded({ extended: false }))
router.use(cookieParser())
router.use(methodOverride('_method'))

router.get('/', async (req, res) => {
    try {
        const timeline = await db.timeline.findAll({ include: [db.user] })
        res.render('timeline/show', { timeline: timeline})
        
    } catch (error) {
        console.log(error)
       // res.status(400).render('main/404')
    }
})

router.get('/new', (req, res) => {
    console.log(res.locals.user.username)
    console.log(req.cookies.userId)
    res.render('timeline/new')
})
router.post('/', async (req, res) => {
    try {
        
        const newTimeline = await db.timeline.create({
            header: req.body.header,
            post: req.body.post,
            userId: res.locals.user.id,
        })
        const timeline = await db.timeline.findAll({ include: [db.user] })
        const findUser = await db.user.findOne({
            where: { 
                id: res.locals.user.id
            }
        })
        findUser.addTimeline(newTimeline)
        
        res.redirect('/timeline')
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const timeline = await db.timeline.findByPk(req.params.id)
        //console.log(JSON.parse(JSON.stringify(timeline)))
        res.render('timeline/view', { timeline: timeline })
        //res.redirect('/timeline/:id', { timeline: timeline })
    } catch (error) {
        console.log(error)
        
    }
})
router.get('/:id/edit',async (req,res) => {
    try{
        const timeline = await db.timeline.findByPk(req.params.id)
        res.render('timeline/edit', {timeline:timeline})

    }catch(error){
        console.log(error)
    }
})
router.put('/:id', async (req, res) => {
    try {
        const timeline = await db.timeline.update({
            header: req.body.header,
            post: req.body.post,
            userId: res.locals.user.id
        }, {
            where: { id: req.params.id }
        })
        
        res.redirect('/timeline')
    } catch (error) {
        console.log(error)
        
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const timeline = await db.timeline.destroy({
            where: { id: req.params.id }
        })
        res.redirect('/timeline')
    } catch (error) {
        console.log(error)
    }
})


module.exports = router