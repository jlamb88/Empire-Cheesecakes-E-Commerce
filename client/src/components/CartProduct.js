import { Button, Row, Col } from 'react-bootstrap';
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


    return (

        <div class="mb-3">
            <Row><h4>{name}</h4></Row>
            <Row>
                <Col>Qty: {quantity}</Col>
                <Col sm='6'>
                    <Button variant='secondary' sm='6' onClick={() => cart.addOneCart(id)} className='mx-2'>+</Button>
                    <Button variant='secondary' sm='6' onClick={() => cart.removeOne(id)} className='mx-2'>-</Button>
                </Col>
            </Row>
            <h4>${(quantity * price).toFixed(2)}</h4>
            <Button variant='danger' size='sm' onClick={() => cart.deleteFromCart(id)}>Remove</Button>
        </div>
    );
};

export default CartProduct;