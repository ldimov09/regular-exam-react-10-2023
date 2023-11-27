import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import * as boardgameService from "../../services/boardgameService";
import useForm from "../../hooks/useForm";
import { useAlert } from "../../contexts/alertContext";
import { useState } from "react";

export default function Create() {
    const { addError, addMessage } = useAlert();
    const navigate = useNavigate();

    const createBoardgameSubmitHandler = async (values, e) => {
        try {
            await boardgameService.create(values);
            addMessage('Boardgame added successfully!')
            navigate("/catalog");
        } catch (err) {
            addError(err);
        }
    };

    const { onChange, onSubmit, values, validated } = useForm(createBoardgameSubmitHandler, {
        name: '',
        minage: null,
        gameduration: null,
        minplayers: null,
        maxplayers: null,
        description: '',
        imageUrl: '',

    });


    return (
        <>
            <h1>Create Boardgame</h1>
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
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control type="text" placeholder="Enter Url" name="imageUrl" onChange={onChange} value={values.imageUrl} required />
                    <Form.Control.Feedback type="invalid">
                        Provide a image Url.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="warning" type="submit">
                    Create
                </Button>
            </Form>
        </>
    );
}