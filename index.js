const express = require('express')

// HELLO

const bodyParser = require('body-parser')

const app = express()

app.use(express.json())

const names = ['John', 'Steve']

const cars = [
    {
        brand: 'Toyota',
        model: 'RAV4',
        mileage: 20000
    },
    {
        brand: 'Toyota',
        model: 'RAV4',
        mileage: 40000
    },
]

app.get('/', (req, res, next) => {
    res.send(`
        <h1>Hello</h1>
        <ul>
            <li><a href="/test">Test</a></li>
        </ul>
    `)
})

app.get('/test', (req, res, next) => {
    res.send('<h1>Hello from test</h1>')
})

app.get('/names-list', (req, res, next) => {
    res.send(`
        <h1>Names:</h1>
        <ul>
            ${names.map(name => `<li>${name}</li>`).join('')}
        </ul>       
    `)
})

app.get('/names', (req, res, next) => {
    res.send(names)
})

app.post('/names', (req, res, next) => {
    const name = req.body.name
    names.push(name)

    res.send(names)
})

app.get('/cars', (req, res, next) => {
    res.send(cars)
})

app.post('/cars', (req, res, next) => {
    const newCar = req.body
    cars.push(newCar)

    res.send(cars)
})

app.listen(3000, () => console.log('Server is running on port 3000'))