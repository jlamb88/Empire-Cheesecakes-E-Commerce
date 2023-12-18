import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { CartContext } from "./CartContext";
import React, { useContext } from 'react';
import './ProdCard.css'


function ProductCard(props) {
    const product = props.product;
    const cart = useContext(CartContext);
    const productQuantity = cart.getProductQuantity(product._id);
    console.log(product.image);

    return (
        <Card>
            <Card.Body>
                <Card.Img variant="top" src={product.image} style={{ width: '100%', height: '300px', objectFit: 'cover' }} class="mb-3" />
                <Card.Title>{product.name}</Card.Title>
                <Card.Text id="description">{product.description}</Card.Text>
                <Card.Text id="price">${product.price}</Card.Text>
                {/* checks product quantity to determine which buttons to show */}
                {productQuantity > 0 ?
                    <div>
                        <Button variant='dark' onClick={() => cart.deleteFromCart(product._id)} className='my-2'>Remove All</Button>
                        <div>
                            <Form as={Row}>
                                <Col className="Col-5">
                                    <Form.Label column='true' sm='6'> Cart Qty: {productQuantity} </Form.Label>
                                </Col>
                                <Col className="Col-5" sm='6'>
                                    <Button variant='secondary' sm='6' onClick={() => cart.addOne({ id: product._id })} className='mx-2'>+</Button>
                                    <Button variant='secondary' sm='6' onClick={() => cart.removeOne(product._id)} className='mx-2'>-</Button>
                                </Col>
                            </Form>
                        </div>
                    </div>
                    :
                    <div>
                        <Button variant='dark' onClick={() => cart.addOne({ id: product._id, name: product.name, price: product.price })}> Add To Cart </Button>
                        <div style={{ visibility: "hidden" }}>
                            <Form as={Row}>
                                <Col>
                                    <Form.Label column='true' sm='6'> Cart Qty: {productQuantity} </Form.Label>
                                </Col>
                                <Col sm='6'>
                                    <Button variant='secondary' sm='6' onClick={() => cart.addOne({ id: product._id })} className='mx-2'>+</Button>
                                    <Button variant='secondary' sm='6' onClick={() => cart.removeOne(product._id)} className='mx-2'>-</Button>
                                </Col>
                            </Form>
                        </div>
                    </div>
                }
            </Card.Body>
        </Card>
    )
};

export default ProductCard;