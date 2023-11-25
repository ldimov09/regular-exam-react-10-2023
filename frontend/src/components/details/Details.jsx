import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Clock, PersonFillAdd, PeopleFill, Pencil, Trash, CaretLeftFill } from 'react-bootstrap-icons';
import AuthContext from '../../contexts/authContext';

import Button from 'react-bootstrap/Button';

import * as boardgameService from "../../services/boardgameService"

export default function Details() {
    const user = useContext(AuthContext)
    const [boardgame, setBoardgamee] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        boardgameService.getOne(id)
            .then(result => setBoardgamee(result))
            .catch(err => {
                console.log(err);
            });
    }, []);

    console.log(user.userId, boardgame.owner);

    return (
        <>
            <section className="details-content d-flex justify-content-around">
                <div className="left me-5">
                    <Button as={Link} to="/catalog" variant="secondary" className="mb-3"><CaretLeftFill /> Back</Button>
                    <div className="image-wrapper">
                        <img src={boardgame.imageUrl} />
                    </div>
                    {user.userId === boardgame.owner ? <div className="d-flex justify-content-around mb-3 mt-2">
                        <Button variant="warning"><Pencil className="me-2" />Edit</Button>
                        <Button variant="danger"><Trash className="me-2" />Delete</Button>
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
        </>
    )
}