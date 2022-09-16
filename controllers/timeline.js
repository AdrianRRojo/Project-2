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

router.get('/', async (req, res) => {
    try {
        const timeline = await db.timeline.findAll()
        res.render('timeline/show', { timeline: timeline })

    } catch (error) {
        console.log(error)
        res.status(400).render('main/404')
    }
})

router.get('/new', (req, res) => {
    res.render('timeline/new')
})
router.post('/', async (req, res) => {
    try {
        const newTimeline = await db.timeline.create({
            header: req.body.header,
            post: req.body.post
        })
        res.redirect('/timeline')
    } catch (error) {
        console.log(error)
        res.status(400).render('main/404')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const timeline = await db.timeline.findByPk(req.params.id)
        res.render('timeline/view', { timeline: timeline })
        res.redirect('/timeline/:id', { timeline: timeline })
    } catch (error) {
        console.log(error)
        
    }
})

router.put('/:id/edit', async (req, res) => {
    try {
        const timeline = await db.timeline.update({
            header: req.body.header,
            post: req.body.post
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