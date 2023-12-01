import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import * as boardgameService from "../../services/boardgameService";
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { useAlert } from "../../contexts/alertContext";

export default function Edit() {
    const { addError, addMessage } = useAlert();
    const { id } = useParams();
    const navigate = useNavigate();
    const [boardgame, setBoardgame] = useState({
        name: '',
        minage: 0,
        gameduration: 0,
        minplayers: 0,
        maxplayers: 0,
        description: '',
    });


    useEffect(() => {
        boardgameService.getOne(id)
            .then(result => {
                setBoardgame(result);
            }).catch(err => addError(err));
    }, [id]);

    const editBoardgameSubmitHandler = async (values) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('minage', values.minage);
            formData.append('gameduration', values.gameduration);
            formData.append('minplayers', values.minplayers);
            formData.append('maxplayers', values.maxplayers);
            formData.append('description', values.description);
            formData.append('gameImage', values.gameImage);
            await boardgameService.update(id, formData);
            addMessage('Changes saved successfully!')
            navigate("/catalog");
        } catch (err) {
            addError(err);
        }
    };


    const { values, onChange, onSubmit, validated, onFileChange } = useForm(editBoardgameSubmitHandler, boardgame, true);

    return (
        <>
            <h1>Edit Boardgame</h1>
            <Form className="ps-5 pe-5" onSubmit={onSubmit} noValidate validated={validated}>
                <Form.Group className="mb-3" controlId="createFormName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" name="name" onChange={onChange} value={values.name} required/>
                    <Form.Control.Feedback type="invalid">
                        Choose a name.
                    </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-between flex-wrap">
                    <Form.Group className="mb-3 ">
                        <Form.Label>Min Age</Form.Label>
                        <Form.Control type="number" placeholder="Enter age" name="minage" onChange={onChange} value={values.minage} min="3" required />
                        <Form.Control.Feedback type="invalid">
                            Choose a valid min age above 3.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3 ">
                        <Form.Label>Game Duration (minutes)</Form.Label>
                        <Form.Control type="number" placeholder="Enter minutes" name="gameduration" onChange={onChange} value={values.gameduration} min="1" required />
                        <Form.Control.Feedback type="invalid">
                            Choose a valid game duration.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Min Number of players</Form.Label>
                        <Form.Control type="number" placeholder="Enter number" name="minplayers" onChange={onChange} value={values.minplayers} min="1" required />
                        <Form.Control.Feedback type="invalid">
                            Choose a valid min number playes.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Max number of players</Form.Label>
                        <Form.Control type="number" placeholder="Enter number" name="maxplayers" onChange={onChange} value={values.maxplayers} min="1" required />
                        <Form.Control.Feedback type="invalid">
                            Choose a valid min number playes.
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" onChange={onChange} value={values.description} required />
                    <Form.Control.Feedback type="invalid">
                        Provide a description.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>New image</Form.Label>
                    <Form.Control type="file" placeholder="Enter Url" name="gameImage" onChange={onFileChange} />
                    <Form.Control.Feedback type="invalid">
                        Provide a image.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="dark" type="submit">
                    Edit
                </Button>
            </Form>
        </>
    );
}