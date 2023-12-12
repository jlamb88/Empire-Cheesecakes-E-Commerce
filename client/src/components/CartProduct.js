import Button from 'react-bootstrap/Button';
import { CartContext } from './CartContext';
import React, { useContext } from 'react';
// import { getProductData } from '../productStore';

// will give product information to the shopping cart modal
function CartProduct(props) {
    const cart = useContext(CartContext);
    const id = props.id;
    const quantity = props.quantity;
    const price = props.price
    const name = props.name
    // const productData = getProductData(id);
    console.log(props)
    console.log("cartProduct id:", id)

    return (

        <div class="mb-3">
            <h4>{name}</h4>
            <p>Qty: {quantity}</p>
            <h4>${(quantity * price).toFixed(2)}</h4>
            <Button variant='danger' size='sm' onClick={() => cart.deleteFromCart(id)}>Remove</Button>
        </div>
    );
};

export default CartProduct;