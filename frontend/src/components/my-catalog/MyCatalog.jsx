import { useContext, useEffect, useState } from 'react';
import * as boardgameService from '../../services/boardgameService.js';
import BoardgameListItem from '../catalog/boardgame-item/BoardgameListItem.jsx';
import { useAlert } from '../../contexts/alertContext.jsx';
import AuthContext from '../../contexts/authContext.jsx';
import ProfilePic from './profile-pic/ProfilePic.jsx';


export default function MyCatalog() {
    const { addError } = useAlert();
    const [boardgames, setBoardgames] = useState([]);
    const user = useContext(AuthContext);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setBoardgames(await boardgameService.getAllByUserId(user.userId));
            } catch (err) {
               addError(err);
            }
        }
        fetchAll();
    }, []);

return (
    <section>
        <h1>Board games you added</h1>
        <div className='d-flex justify-content-center flex-wrap'>
            <ProfilePic />
            {boardgames.map(boardgame => (
                <BoardgameListItem key={boardgame._id} {...boardgame} />
            ))}
        </div>

        {boardgames.length === 0 && (
            <h3 className="fst-italic text-secondary fs-5">No games yet</h3>
        )}
    </section>
);
}