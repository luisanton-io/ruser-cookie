const express = require('express')
const { uuid } = require('uuidv4')
const cors = require('cors')
const app = express()

const whitelist = [
    'http://localhost:3000'
]
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))
app.use(express.json())
app.get('/api/ruserid', (req, res) => {
    try {
        const _uuid = uuid()
        res.cookie('ruserid', _uuid, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/',
            domain: '.reasonsecurity.com',
            sameSite: 'None',
            httpOnly: true,
            secure: true,
        })

        // res.status(204).send()
        res.json({ uuid: _uuid })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(`Listening on port ${process.env.PORT}`)
})