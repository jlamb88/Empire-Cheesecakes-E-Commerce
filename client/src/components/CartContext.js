import React, { createContext, useState, useEffect } from 'react';
// import { getProductData } from '../productStore';
import { useQuery } from '@apollo/client';
import { ONE_PRODUCT } from '../utils/queries'

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => { },
    addOne: () => { },
    removeOne: () => { },
    deleteFromCart: () => { },
    getTotalCost: () => { }
});

// contains all the major functions for product and cart functionality
export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity

        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    };

    function addOne(storeProduct) {
        console.log("add one products:", storeProduct)
        const quantity = getProductQuantity(storeProduct.id);

        // if product is not in the cart
        if (quantity === 0) {
            setCartProducts([...cartProducts, { ...storeProduct, quantity: 1 }]);
            // if product is already in the cart
        } else {
            setCartProducts(cartProducts.map(
                product => product.id === storeProduct.id
                    ? { ...product, quantity: product.quantity + 1 }
                    : product)
            )
        };
    };

    function removeOne(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 1) {
            deleteFromCart(id)
        } else {
            setCartProducts(cartProducts.map(
                product => product.id === id
                    ? { ...product, quantity: product.quantity - 1 }
                    : product)
            )
        };
    };

    function deleteFromCart(id) {

        setCartProducts(
            cartProducts => cartProducts.filter(currentProduct => {
                console.log("delete from cart currentProduct:", currentProduct, id)
                return currentProduct.id !== id;
            }))
    };

    function getTotalCost() {
        let totalCost = 0;

        // eslint-disable-next-line
        cartProducts.map((cartItem) => {
            console.log("getTotalCost items:", cartItem)
            // const productData = getProductData(cartItem.id);
            totalCost += (cartItem.price * cartItem.quantity);
        });
        return totalCost;
    };

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOne,
        removeOne,
        deleteFromCart,
        getTotalCost
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;