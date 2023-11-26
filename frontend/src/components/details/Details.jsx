import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Clock, PersonFillAdd, PeopleFill, Pencil, Trash, CaretLeftFill } from 'react-bootstrap-icons';
import AuthContext from '../../contexts/authContext';

import Button from 'react-bootstrap/Button';

import * as boardgameService from "../../services/boardgameService"
import { Modal } from "react-bootstrap";
import { useAlert } from "../../contexts/alertContext";

export default function Details() {
    const { addError } = useAlert();
    const user = useContext(AuthContext)
    const navigate = useNavigate()
    const [boardgame, setBoardgamee] = useState([]);
    const { id } = useParams();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        boardgameService.getOne(id)
            .then(result => setBoardgamee(result))
            .catch(err => {
                addError(err);
            });
    }, []);

    const deleteBodardgameHandler = () => {
        boardgameService.destroy(id)
            .then(result => navigate('/catalog'))
            .catch(err => addError(err));
    }

    return (
        <>
            <section className="details-content d-flex justify-content-around">
                <div className="left me-5">
                    <Button as={Link} to="/catalog" variant="secondary" className="mb-3"><CaretLeftFill /> Back</Button>
                    <div className="image-wrapper">
                        <img src={boardgame.imageUrl} />
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