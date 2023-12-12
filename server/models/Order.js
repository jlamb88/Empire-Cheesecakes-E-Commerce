const mongoose = require('mongoose')
const { Schema } = mongoose
const dateFormat = require('../utils/dateFormat');

const orderSchema = new Schema({
    // orderId: {
    //     type: Schema.Types.UUID,
    //     required: true,
    //     unique: true
    // },
    userId: {
        type: Schema.Types.ObjectID,
        ref: 'user',
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    transId: {
        type: String,
        required: true
    },
    orderedAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectID,
            ref: 'product',
            required: true
        },
        quantity: {
            type: Number
        }
    }]
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order