const express = require('express')
const app = express()
const cors = require('cors')

const path = require('path')
const PORT = process.env.PORT || 8000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/img',express.static(path.join(__dirname, './public/img')))
app.use(cors())


const db = require('./app/models')
db.mongoose
    .connect(db.url, {

    })
    .then(() => {
        console.log('Connected to the database')
    })
    .catch((err) => {
        console.log('Cannot connect to the database', err)
        process.exit()
    })


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to vue store' })
})

require('./app/routes/product.route')(app)
require('./app/routes/order.route')(app)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})