import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Clock, PersonFillAdd, PeopleFill, Pencil, Trash, CaretLeftFill } from 'react-bootstrap-icons';
import AuthContext from '../../contexts/authContext';

import Button from 'react-bootstrap/Button';

import * as boardgameService from "../../services/boardgameService"
import { Card, Form, Modal } from "react-bootstrap";
import { useAlert } from "../../contexts/alertContext";
import useForm from "../../hooks/useForm";
import formatDateTime from "../../utils/formatDateTime";
import Comment from "./comments/Comment";

export default function Details() {
    const { addError, addMessage } = useAlert();
    const user = useContext(AuthContext)
    const navigate = useNavigate()
    const [boardgame, setBoardgame] = useState();

    // "_id": "",
    // "owner": "",
    // "name": "",
    // "minage": 0,
    // "minplayers": 0,
    // "maxplayers": 0,
    // "gameduration": 0,
    // "description": "",
    // "imageUrl": "no-image.png",
    // "comments": []
    const { id } = useParams();

    //comments
    const commentSubmitHandler = async (values) => {
        try {
            const comment = await boardgameService.comment(id, values);
            addMessage('Comment added successfully!');
            setBoardgame(current => ({
                ...current,
                comments: [...current.comments, comment]
            }))
        } catch (err) {
            addError(err);
        }
    }

    const { values, onChange, onSubmit, validated } = useForm(commentSubmitHandler, {
        content: '',
    });


    const commentDeleteHandler = async (id) => {
        try {
            await boardgameService.destroyComment(id);
            addMessage('Comment deleted successfully!');
            setBoardgame(current => ({
                ...current,
                comments: current.comments.filter(el => el._id != id)
            }))
        } catch (err) {
            addError(err);
        }
    }

    // Bootstrap modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Get boardgame
    useEffect(() => {
        boardgameService.getOne(id)
            .then(result => {
                setBoardgame(result);
            })
            .catch(err => {
                addError(err);
            });
    }, []);

    //Delete handler
    const deleteBodardgameHandler = () => {
        boardgameService.destroy(id)
            .then(result => navigate('/catalog'))
            .catch(err => addError(err));
    }

    return (
        <>
            {boardgame ? (
                <>
                    <section className="details-content d-flex justify-content-around">
                        <div className="left me-5">
                            <Button as={Link} to="/catalog" variant="secondary" className="mb-3"><CaretLeftFill /> Back</Button>
                            <div className="image-wrapper">
                                <img src={'http://localhost:3000/uploads/' + boardgame.imageUrl} />
                            </div>
                            {user.userId === boardgame.owner ? <div className="d-flex justify-content-around mb-3 mt-2">
                                <Button variant="warning" to={'/catalog/' + id + '/edit'} as={Link}><Pencil className="me-2" />Edit</Button>
                                <Button variant="danger" onClick={handleShow}><Trash className="me-2" />Delete</Button>
                            </div> : ''}
                        </div>
                        <div className="right">
                            <h1>{boardgame.name}</h1>
                            <div className="d-flex justify-content-around mb-3">
                                <span className='d-block'> <PersonFillAdd /> {boardgame.minplayers} - {boardgame.maxplayers} </span>
                                <span className='d-block'> <Clock /> {boardgame.gameduration} minutes </span>
                                <span className='d-block'> <PeopleFill /> {boardgame.minage}+ </span>
                            </div>
                            <p className="text-justify">{boardgame.description}</p>
                        </div>
                    </section>

                    <h2 className="ms-5">Comment Section</h2>
                    <section className="comment-section ms-3 mb-3 pt-3" >
                        <Form className="mb-3" onSubmit={onSubmit} validated={validated} noValidate>
                            <Form.Group className="mb-3">
                                <Form.Control as="textarea" rows={3} placeholder="Place your comment.... " name="content" onChange={onChange} value={values['content']} required />
                                <Form.Control.Feedback type="invalid">
                                    Please fill out this field.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Comment
                            </Button>
                        </Form>
                        {boardgame.comments.length === 0 ? (<i><h3>No comments yet. Be the first one!</h3></i>) : ''}
                        {boardgame.comments.map(comment => (
                            <Comment comment={comment} commentDeleteHandler={commentDeleteHandler} userId={user.userId} key={comment._id} />
                        ))}
                    </section >
                </>
            ) : ''}


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure? All the data for this board game will be permanently deleted! There is no going back!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteBodardgameHandler}><Trash className="me-2" />Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}