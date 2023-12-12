const mongoose = require('mongoose')
const { Schema } = mongoose

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },
        // name: {
        //     type: Schema.Types.String,
        //     ref: 'product',
        //     required: true
        // },
        // description: {
        //     type: Schema.Types.String,
        //     ref: 'product',
        //     required: true
        // },
        // price: {
        //     type: Schema.Types.Number,
        //     ref: 'product',
        //     required: true
        // },
        quantity: {
            type: Number,
            required: true
        }
    }
    ]
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart

