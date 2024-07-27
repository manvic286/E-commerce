const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')

// const dotenv = require('dotenv')
// const dbConnection = require('./db')
const app = express()

// view engine
app.set('view engine', 'ejs')

// use middleware and static files(css, scripts, images, etc)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/products')

const productSchema = {
    productName: String,
    price: Number,
    rating: Number,
    description: String
}
  
const Product = mongoose.model('Product', productSchema);

// dotenv.config();

// const PORT = process.env.Port
const PORT = 4000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.get('/', (req, res) => {

    Product.find()
        .then(products => {
            res.render('index3', { products, title: "Catalogue"})
    })
})

// app.get('/new-item', (req, res) => {

//     const product = new Product(
//         {
//             productName: "Snickers",
//             price: "5",
//             rating: 4.6
//         }
//     )

//     product.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch(err => {
//             console.log(err)
//         })

// })

app.post('/', (req, res) => {
    const product = new Product(req.body)

    product.save()
        .then(result => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
        })
})

app.get('/product/:id', (req, res) => {
    const id = req.params.id
    Product.findById(id)
        .then(result => {
            res.render('details', {  product: result, title: "Product Details" })
        })
        .catch(err => {
            console.log(err)
        })
})

app.get('/products/add', (req, res) => {

    res.render('add products', {title: "Add Products"})
})

app.delete('/products/:id', (req, res) => {
    const id = req.params.id

    Product.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/product' })
        })
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title : '404' });

})

// dbConnection()