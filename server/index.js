require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {json} = require('body-parser')
const app = express()
const authCtrl = require('./controllers/authController')
const treasureCtrl = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware')

app.use(json())
app.use(session({
		secret: process.env.SECRET,
		resave: true,
		saveUninitialized: false
}));
massive(process.env.CONNECTION_STRING).then(db => app.set('db', db));

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout',authCtrl.logout)
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getMyTreasure)
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure)

app.listen(process.env.PORT, console.log(`listening on ${process.env.PORT}`))