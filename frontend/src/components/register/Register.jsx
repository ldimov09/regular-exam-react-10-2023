import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthContext from '../../contexts/authContext';
import useForm from '../../hooks/useForm';

function Register() {
    const { registerSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit, validated, onFileChange } = useForm(registerSubmitHandler, {
        email: '',
        password: '',
        username: '',
        repeatPassword: '',
        profileimage: null,
    });

    return (
        <div id='register-component'>

            <h1 className='mb-3 mt-3'>Register</h1>

            <Form onSubmit={onSubmit} noValidate validated={validated} encType='multipart/form-data'>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" name='username' onChange={onChange} value={values.username} required pattern='^(?!.* ).*$' />
                    <Form.Control.Feedback type="invalid">
                        Please choose a valid username (no spases).
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' onChange={onChange} value={values.email} required />
                    <Form.Control.Feedback type="invalid">
                        Please choose a valid email address
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' onChange={onChange} value={values.password} required />
                    <Form.Control.Feedback type="invalid">
                        Please choose a password and remember it!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control type="password" placeholder="Repeat password" name='repeatPassword' onChange={onChange} value={values.repeatPassword} required pattern="(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,16}" />
                    <Form.Control.Feedback type="invalid">
                        Choose a valid new password! Between 4 and 16 symbols. At least one letter, number and special character.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Profile picture</Form.Label>
                    <Form.Control type="file" name='profileimage' accept='.png, .jpg, .jpeg' onChange={onFileChange} required />
                    <Form.Control.Feedback type="invalid">
                        Please choose a profile picture.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="dark" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
}
export default Register;