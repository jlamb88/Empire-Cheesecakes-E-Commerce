const { User, Product, Order, Cart } = require('../models/')
const { signToken } = require('../utils/auth')
const { AuthenticationError } = require('apollo-server-express')
// Stripe Secret Key
const stripe = require('stripe')('sk_test_51M9WEeA0zgGYE8hKfLzdebUdsNrrjNE3SI2bkSS8NclVm5VXPYz0VglrMEMnmJnK4uKi3jsQvBEkHMaFZEpSJsLr00EcdyU0Ss');

const resolvers = {
    Query: {
        user: async (parent, userId) => {
            return await User.findOne({ _id: userId })
        },
        users: async () => {
            return await User.find({})
        },
        products: async () => {
            return await Product.find({})
        },
        product: async (parent, productId) => {
            return await Product.findOne({ _id: productId })
        },
        order: async (parent, orderId) => {
            return await Order.findOne({ _id: orderId })
        },
        cart: async (parent, userId) => {
            return await Cart.findOne({ userId: userId })
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const line_items = [];

            const { products } = await order.populate('products');

            for (let i = 0; i < products.length; i++) {
                const product = await stripe.products.create({
                    name: products[i].name,
                    description: products[i].description
                });

                const price = await stripe.prices.create({
                    product: product._id,
                    unit_amount: products[i].price * 100,
                    currency: 'usd',
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                });
            }

            // stripe checkout
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return { transId: session.id };
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)

            return { user, token }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw new AuthenticationError('This email cannot be found')
            }

            const correctPw = await user.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password. Please try again')
            }

            const token = signToken(user)

            return { token, user }
        },
        addOrder: async (parent, { productId, quantity }, context) => {
            if (context.user) {
                const cart = new Cart({ productId, quantity })

                await User.findByIdAndUpdate(context.user._id, { $set: { cart: cart } })

                return order
            }

            throw new AuthenticationError('Not logged in');
        },
        updateUser: async (parent, args) => {
            return await User.findOneAndUpdate(
                { _id: args.userId },
                args,
                { new: true }
            )
        },
        addPayment: async (parent, { userId, userPayment }) => {
            return await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { payment: userPayment } },
                { new: true }
            )
        },
        updatePayment: async (parent, { userId, userPayment }) => {
            return await User.findOneAndUpdate(
                { _id: userId },
                { $set: { payment: { _id: userPayment.payId }, userPayment }, },
                { new: true }
            )
        },
        deletePayment: async (parent, { userId, payId }) => {
            return await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { payment: { _id: payId } } }
            )
        },
        addComment: async (parent, { productId, name, text, rating }) => {
            return await Product.findOneAndUpdate(
                { _id: productId },
                { $addToSet: { comment: { name, text, rating }, }, },

                { new: true }
            )
        },
        addCart: async (parent, { productId, quantity }, context) => {
            return await Cart.create(
                { productId, quantity }
            )
            // throw new AuthenticationError('Cart error');
        },
        updateCartItems: async (parent, { id, productId }) => {
            return await Cart.findOneAndUpdate(
                { _id: id },
                { productId: productId },
                { quantity },
                { new: true }
            )
        },
        deleteCartItem: async (parent, { id, productId }) => {
            return await Cart.findOneAndDelete(
                { _id: id } || { productId: productId }
            )
        }

    }
}


module.exports = resolvers