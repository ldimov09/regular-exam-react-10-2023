import { useContext, useEffect, useState } from 'react';
import * as boardgameService from '../../services/boardgameService.js';
import BoardgameListItem from '../catalog/boardgame-item/BoardgameListItem.jsx';
import { useAlert } from '../../contexts/alertContext.jsx';
import AuthContext from '../../contexts/authContext.jsx';
import ProfilePic from './profile-pic/ProfilePic.jsx';
import * as authService from '../../services/authService.js';
import { Pencil } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Profile() {
    const { addError } = useAlert();
    const [boardgames, setBoardgames] = useState(
        [{
            "_id": "",
            "owner": "",
            "name": "",
            "minage": 0,
            "minplayers": 0,
            "maxplayers": 0,
            "gameduration": 0,
            "description": "",
            "imageUrl": "no-image.png",
            "comments": []
        }]
    );
    const user = useContext(AuthContext);

    useEffect(() => {
        boardgameService.getAllByUserId(user.userId)
            .then(result => {
                setBoardgames(result);
            })
            .catch(err => {
                addError(err);
            });
    }, []);

    return (
        <section className='profile-page'>
            <div className='profile-image-name'>
                <ProfilePic userProfilePic={user.profileimage} size={100} />
                <h1 className='ms-3'>{user.username}</h1>
            </div>

            <h2 className='mt-3 mb-5 text-center'>Boardgames added by you</h2>

            <div className='d-flex justify-content-center flex-wrap'>
                {boardgames.map(boardgame => (
                    <BoardgameListItem key={boardgame._id} {...boardgame} />
                ))}
            </div>

            {boardgames.length === 0 && (
                <h3 className="fst-italic text-secondary fs-5">You don't have any boardgames yet. Add your first one!</h3>
            )}
        </section>
    );
}
