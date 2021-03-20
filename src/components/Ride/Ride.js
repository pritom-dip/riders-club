import React from 'react';
import { Link } from 'react-router-dom';
import './Ride.css';

const Ride = ({ ride }) => {
    const { name, image } = ride;
    return (

        <div className="col-md-3 custom-ride">
            <Link to={`/ride/${name}`}>
                <div className="card single-ride">
                    <img src={image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h3 className="card-title">{name}</h3>
                    </div>
                </div>
            </Link>
        </div>

    );
};

export default Ride;