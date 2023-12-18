const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    firstName: String
    lastName: String
    streetAddress: String
    city: String
    state: String
    zipcode: Int
    phone: Float
    email: String
    password: String
    payment: [Payment]
}

type Payment {
    cardType: cardTypeEnum
    cardNumber: Float
    expiration: String
    default: Boolean
}

enum cardTypeEnum {
    VISA
    MASTERCARD
    AMERICAN EXPRESS
    DISCOVER
}

type Product {
    _id: ID
    name: String
    description: String
    price: Int
    quantity: Int
    allergens: [String]
    comments: [Comment]
    image: String
}

type Order {
    _id: ID!
    userID: ID!
    products: [Product]
    total: Int
    transId: String
    orderedAt: String
}

type Comment {
    name: String
    text: String
    rating: Int
    dateAdded: String
}

type Cart {
    userId: ID!
    items: [CartItem]
}

type CartItem {
    productId: ID!
    quantity: Int
}

type Auth {
    token: ID!
   user: User
}

type Checkout {
    userId: ID!
    transId: String
    url: String
}

type Query {
    user(_id: ID!): User
    users: [User]
    products: [Product]
    product(_id: ID!): Product
    userOrders(userID: ID!): Order
    order(_id: ID!):Order
    orders: [Order]
    cart(userId: ID!): Cart
    carts: [Cart]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
        firstName: String 
        lastName: String
        streetAddress: String
        city: String
        state: String
        zipcode: Int
        phone: Float
        email: String!
        password: String!
        ): Auth
    addOrder(
        userId: ID, 
        orderItems: [orderItems], 
        total:Int, 
        transId: String): Order
    updateUser(
        firstName: String
        lastName: String
        streetAddress: String
        city: String
        state: String
        zipcode: Int
        phone: Int
        email: String!
        password: String!
        ):User
    addPayment(
        userId:ID!,
        userPayment: paymentInput
    ):User
    updatePayment(
        userId:ID!, userPayment: paymentInput
    ):User
    deletePayment(_id:ID!, payId:ID!):User
    addComment(
        name: String!,
        text: String!,
        rating: Int,
        ):Product
    addCart(
        userId: ID!,
        cartContents: [cartInput]!
    ):Cart
    updateCartItems(
        userId: ID!, cartContents: cartInput
    ):Cart 
    deleteCartItem(
        userId: ID!, cartContents: cartInput
    ):Cart
    deleteCart(
        userId: ID!
    ):User
    checkoutSession(userId: ID!): Checkout
    }

    input paymentInput {
        cardType: cardTypeEnum!
        cardNumber: Float!
        expiration: String!
        default: Boolean
    }
    
    input cartInput {
        productId: ID!
        name: String
        description: String
        price: Int
        quantity: Int!
    }

    input orderItems {
        productId: ID!
    }
    `


module.exports = typeDefs

// changed typeCart and addCart for testing