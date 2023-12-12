const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    // productId: {
    //     type: Schema.Types.UUID,
    //     required: true,
    //     unique: true
    // },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0.99
    },
    stock: {
        type: Number,
        min: 0,
        default: 0
    },
    allergens: [
        { type: String }
    ],
    comments: [
        {
            name: {
                type: String
            },
            text: {
                type: String
            },
            rating: {
                type: Number
            },
            dateAdded: {
                type: Date,
                default: Date.now
            }
        }],
    image: {
        type: String
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product