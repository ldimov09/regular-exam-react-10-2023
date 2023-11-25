import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthContext from "../../contexts/authContext";

import { useContext } from 'react';

import useForm from '../../hooks/useForm';

function Login() {
    const { loginSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
        'email': '',
        'password': '',
    });

    return (
        <div id="login-component">

            <h1 className='mb-3 mt-3'>Login</h1>

            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={values.email} onChange={onChange} name='email'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={values.password} onChange={onChange} name='password'/>
                </Form.Group>
                <Button variant="warning" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login;