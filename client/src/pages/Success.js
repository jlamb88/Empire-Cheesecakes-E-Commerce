import React from 'react';
import { useContext } from 'react'
import { useAuth } from '../components/AuthContext';
import { CartContext } from '../components/CartContext'
import { useMutation } from '@apollo/client';
import { DELETE_CART } from '../utils/mutations'

const Success = async () => {
    const [deleteCartMutation] = useMutation(DELETE_CART)
    const { userInfo } = useAuth()
    const cart = useContext(CartContext)

    console.log("success user:", userInfo)

    try {
        await deleteCartMutation({
            variables: {
                userId: userInfo.userId
            },
        });
    }
    catch (error) {
        console.error('User has no cart');
    }

    cart.deleteCart();

    return (
    <div>
        <h1>Your purchase was successful, {userInfo.firstName}!</h1>
    </div>
    );
};

export default Success;