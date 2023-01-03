const express = require('express')
const { uuid } = require('uuidv4')
const app = express()

app.use(express.json())
app.get('/api/ruserid', (req, res) => {
    const _uuid = uuid()
    res.cookie('ruserid', _uuid, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: '/',
        sameSite: 'None',
        httpOnly: true,
        secure: true,
    })

    // res.status(204).send()
    res.json({ uuid: _uuid })
})

app.listen(8080, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening on port 8080')
})