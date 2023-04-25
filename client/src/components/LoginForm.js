import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'
import Auth from '../utils/auth'

function LoginForm(props) {
    const [details, setDetails] = useState({ email: '', password: '' })
    const [login, { error }] = useMutation(LOGIN_USER)
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await login({
                variables: { email: details.email, password: details.password }
            });
            const token = loginResponse.data.login.token;
            Auth.login(token)
        }
        catch (err) {
            console.log(err)
        }
    }

    const formChange = (event) => {
        const { name, value } = event.target
        setDetails({
            ...details, [name]: value
        })
    }

    return (
        <div>


            <div className='login-page mt-4'>

                {(error !== "") ? (<div className="error">{error}</div>) : ""}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3"
                        controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"
                            name='email'
                            placeholder="Enter email"
                            onChange={formChange}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3"
                        controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            name='password'
                            placeholder="********"
                            onChange={formChange}>
                        </Form.Control>
                    </Form.Group>
                    <Button className='formButton'
                        variant="secondary"
                        type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default LoginForm;