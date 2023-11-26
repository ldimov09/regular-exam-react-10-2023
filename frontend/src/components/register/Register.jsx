import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthContext from '../../contexts/authContext';
import useForm from '../../hooks/useForm';

function Register() {
    const { registerSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
        email: '',
        password: '',
        username: '',
    });

    return (
        <div id='register-component'>

            <h1 className='mb-3 mt-3'>Register</h1>

            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" name='username' onChange={onChange} value={values.username} required/>
                    <Form.Control.Feedback type="invalid">
                        Please choose a username address
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' onChange={onChange} value={values.email} required/>
                    <Form.Control.Feedback type="invalid">
                        Please choose a valid email address
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' onChange={onChange} value={values.password} required/>
                    <Form.Control.Feedback type="invalid">
                        Please choose a password and remember it!
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="warning" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
}
export default Register;