import { useEffect, useState } from 'react';
import * as boardgameService from '../../services/boardgameService.js';
import BoardgameListItem from './boardgame-item/BoardgameListItem.jsx';
import { useAlert } from '../../contexts/alertContext.jsx';


export default function Catalog() {
    const { addError } = useAlert();
    const [boardgames, setBoardgames] = useState([]);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setBoardgames(await boardgameService.getAll());
            } catch (err) {
               addError(err);
            }
        }
        fetchAll();
    }, []);

return (
    <section id="catalog-page">
        <h1>All Board Games</h1>
        <div className='d-flex justify-content-center flex-wrap'>
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
