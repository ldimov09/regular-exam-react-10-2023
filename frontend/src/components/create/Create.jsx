import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import * as boardgameService from "../../services/boardgameService";
import useForm from "../../hooks/useForm";

export default function Create() {
    const navigate = useNavigate();

    const createBoardgameSubmitHandler = async (e) => {
        try {
            await boardgameService.create(values);
            navigate("/catalog");
        } catch (err) {
            console.log(err);
        }
    };


    const { onChange, onSubmit, values } = useForm(createBoardgameSubmitHandler, {
        name: '',
        minage: 0,
        gameduration: 0,
        minplayers: 0,
        maxplayers: 0,
        description: '',
        imageUrl: '',

    });


    return (
        <>
            <h1>Create Boardgame</h1>
            <Form className="ps-5 pe-5" onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" name="name" onChange={onChange} value={values.name} />
                </Form.Group>
                <div className="d-flex justify-content-between">
                    <Form.Group className="mb-3 ">
                        <Form.Label>Min Age</Form.Label>
                        <Form.Control type="number" placeholder="Enter age" name="minage" onChange={onChange} value={values.minage}/>
                    </Form.Group>
                    <Form.Group className="mb-3 ">
                        <Form.Label>Game Duration (minutes)</Form.Label>
                        <Form.Control type="number" placeholder="Enter minutes" name="gameduration" onChange={onChange} value={values.gameduration}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Min Number of players</Form.Label>
                        <Form.Control type="text" placeholder="Enter number" name="minplayers" onChange={onChange} value={values.minplayers}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Max number of players</Form.Label>
                        <Form.Control type="number" placeholder="Enter number" name="maxplayers" onChange={onChange} value={values.maxplayers}/>
                    </Form.Group>
                </div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" onChange={onChange} value={values.description}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control type="text" placeholder="Enter Url" name="imageUrl" onChange={onChange} value={values.imageUrl}/>
                </Form.Group>
                <Button variant="warning" type="submit">
                    Create
                </Button>
            </Form>
        </>
    );
}