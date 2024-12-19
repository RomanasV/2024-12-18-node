const express = require('express')

const bodyParser = require('body-parser')


const app = express()

app.use(express.json())

const names = ['John', 'Steve']



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


/*

FRONT END
localhost:3000/cars                     (GET) - grazina visus automobilius
localhost:3000/cars/:id                 (GET) - grazina VIENA automobili pagal jo ID

localhost:3000/cars/brand/:brandName    (GET) - grazina visus automobilius pagal nurodyta brandi


localhost:3000/cars                     (POST) - sukursime nauja automobili (taciau prie uzklausos - request - reikia prideti body)
localhost:3000/cars/:id                 (DELETE) - istrina VIENA automobili pagal jo ID

BACK END
routes
/cars                       (GET)
/cars/:id                   (GET)
/cars                       (POST)
/cars/:id                   (DELETE)
/cars/brand/:brandName      (GET)

*/


let cars = [
    {
        id: 1,
        brand: 'Toyota',
        model: 'RAV4',
        mileage: 20000
    },
    {
        id: 2,
        brand: 'Toyota',
        model: 'RAV4',
        mileage: 40000
    },
]

app.get('/cars/', (req, res, next) => {
    res.send(cars)
})

app.get('/cars/:id', (req, res, next) => {
    const id = Number(req.params.id)
    const foundCar = cars.find(car => car.id === id)

    res.send(foundCar)
})

app.get('/cars/brand/:brandName', (req, res, next) => {
    const brandName = req.params.brandName.toLowerCase()

    const foundCars = cars.filter(car => car.brand.toLowerCase() === brandName)

    res.send(foundCars)
})

app.post('/cars', (req, res, next) => {
    const newCar = req.body
    newCar.id = Math.random()
    cars.push(newCar)

    res.send(cars)
})

app.delete('/cars/:id', (req, res, next) => {
    const id = Number(req.params.id)
    const updatedCars = cars.filter(car => car.id !== id)

    cars = updatedCars

    res.send(updatedCars)
})

app.listen(3000, () => console.log('Server is running on port 3000'))