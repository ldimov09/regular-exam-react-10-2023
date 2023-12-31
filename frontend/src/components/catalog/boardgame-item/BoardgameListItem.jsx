import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Clock, PersonFillAdd, PeopleFill } from 'react-bootstrap-icons';
import { useContext } from 'react';
import AuthContext from '../../../contexts/authContext';

export default function BoardgameListItem({
    _id,
    name,
    minplayers,
    maxplayers,
    minage,
    gameduration,
    imageUrl,
}) {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <section>
            <Card style={{ width: '18rem' }} className='mb-4 me-4'>
                <div className='image-wrapper-card'>
                    <Card.Img variant="top" src={'http://localhost:3000/uploads/' + imageUrl} />
                </div>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text className='d-flex justify-content-around'>
                        <span className='d-block'> <PersonFillAdd /> {minplayers} - {maxplayers} </span>
                        <span className='d-block'> <Clock /> {gameduration} minutes </span>
                        <span className='d-block'> <PeopleFill /> {minage}+ </span>
                    </Card.Text>
                    {isAuthenticated ? (<Button variant="dark" as={Link} to={`/catalog/${_id}`}>Details</Button>) : ''}
                </Card.Body>
            </Card>
        </section>
    );
}