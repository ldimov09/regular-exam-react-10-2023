import { useContext } from "react";
import useForm from "../../hooks/useForm";
import AuthContext from "../../contexts/authContext.jsx";
import { Form, Button } from "react-bootstrap";
import * as authService from "../../services/authService";
import { useAlert } from "../../contexts/alertContext";
import { useNavigate } from "react-router-dom";

export default function EditUser() {
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const { addError, addMessage } = useAlert();

    const editUserHandler = async (values) => {
        try{
            const formData = new FormData();
            formData.append('username', values.username);
            formData.append('profileimage', values.profileimage);

            const result = await authService.updateUser(user.userId, formData);
            console.log(result);
            user.setAuth(result);
            addMessage('Changes saved successfully');
            navigate("/my-profile");
        }catch(err){
            addError(err);
        }
    }

    const changePasswordHandler = async (values) => {
        try {
            if (values.newPassword !== values.repeatPassword) {
                throw new Error('Passwords must match!')
            }
            const result = await authService.changePassword(user.userId, { oldPassword: values.oldPassword, newPassword: values.newPassword });
            addMessage('Changes saved successfully!');
            navigate("/my-profile");
        } catch (error) {
            addError(error);
        }
    }

    const editUserForm = useForm(editUserHandler, user, true);
    const changePasswordForm = useForm(changePasswordHandler, { oldPassword: '', newPassword: '', repeatPassword: '' });


    return (
        <>
            <h1 className="text-center mb-3">Edit Your Profile</h1>

            <Form onSubmit={editUserForm.onSubmit} noValidate validated={editUserForm.validated} encType='multipart/form-data'>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" name='username' onChange={editUserForm.onChange} value={editUserForm.values.username} required pattern='^(?!.* ).*$' />
                    <Form.Control.Feedback type="invalid">
                        Please choose a valid username (no spases).
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>New Profile picture</Form.Label>
                    <Form.Control type="file" name='profileimage' accept='.png, .jpg, .jpeg' onChange={editUserForm.onFileChange} />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Update
                </Button>
            </Form>
            <Form onSubmit={changePasswordForm.onSubmit} noValidate validated={changePasswordForm.validated} className='mt-3'>
                <Form.Group className="mb-3">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control type="password" placeholder="Old Password" name='oldPassword' onChange={changePasswordForm.onChange} value={changePasswordForm.values.oldPassword} required/>
                    <Form.Control.Feedback type="invalid">
                        Please enter your old password!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="New password" name='newPassword' onChange={changePasswordForm.onChange} value={changePasswordForm.values.newPassword} required pattern="(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,16}" />
                    <Form.Control.Feedback type="invalid">
                        Choose a valid new password! Between 4 and 16 symbols. At least one letter, number and special character. 
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control type="password" placeholder="Repeat password" name='repeatPassword' onChange={changePasswordForm.onChange} value={changePasswordForm.values.repeatPassword} required />
                    <Form.Control.Feedback type="invalid">
                        Repeat your password!
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="dark" type="submit">
                    Change Password
                </Button>
            </Form>
        </>
    )
}