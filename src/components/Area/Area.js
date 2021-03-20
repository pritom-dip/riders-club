import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FakeData from '../../FakeData/FakeData';
import Header from '../Header/Header';
import './Area.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import MapContainer from '../Map/MapContainer';


const Area = () => {
    const { name } = useParams();
    const [fakeData, SetFakeData] = useState([]);
    const [area, setArea] = useState(
        {
            to: '',
            from: ''
        }
    );
    const [showdata, setShowData] = useState(false);

    useEffect(() => {
        const getAllData = FakeData;
        const newData = getAllData.filter(data => data.category === name);
        SetFakeData(newData);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowData(true);
    }

    const handleChange = event => {

        if (event.target.name === 'to') {
            const updatedTo = event.target.value;
            const previousArea = { ...area };
            previousArea.to = event.target.value;
            setArea(previousArea);
        }

        if (event.target.name === 'from') {
            const updatedFrom = event.target.value;
            const previousArea = { ...area };
            previousArea.from = event.target.value;
            setArea(previousArea);
        }
    }

    return (
        <div>
            <Header></Header>

            <div className="container">
                <hr></hr>
                <div className="row">
                    <div className="col-md-4">
                        <div className="select-area-wrapper">
                            {
                                !showdata ? (
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="pick_from" className="form-label">Pick From</label>
                                            <input type="text" onChange={handleChange} name="from" required className="form-control" id="pick_from" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="pick_to" className="form-label">To</label>
                                            <input type="text" onChange={handleChange} name="to" required className="form-control" id="pick_to" />
                                        </div>

                                        <button type="submit" className="btn btn-primary site-btn">Search</button>
                                    </form>
                                ) : (
                                        <>
                                            <div className="row m-1 mb-3 orange-bg selected-area p-2">
                                                <div className="col-sm-1 text-center flex-column d-none d-sm-flex">
                                                    <h5 className="m-0">
                                                        <span className="badge badge-pill bg-white rounded-circle">&nbsp;</span>
                                                    </h5>
                                                    <div className="h-100" style={{ borderRight: '1px solid #fff', paddingLeft: '12px' }}>
                                                    </div>
                                                    <h5 className="m-0">
                                                        <span className="badge badge-pill bg-white rounded-circle">&nbsp;</span>
                                                    </h5>
                                                </div>
                                                <div className="col-sm-9 ms-2">
                                                    <h3 className="mb-4 text-white">{area.from}</h3>
                                                    <h3 className="text-white mb-0">{area.to}</h3>
                                                </div>

                                            </div>
                                            {
                                                fakeData.length > 0 && fakeData.map(fkData => {
                                                    return (
                                                        <div key={fkData.id} className="row d-flex p-2 m-0" >
                                                            <article className="bg-white align-items-center d-flex mb-3 border-10 p-3">
                                                                <img style={{ width: '80px' }} src={fkData.image} alt={fkData.name} />
                                                                <h3 className="ms-3 me-3 text-capitalize">{fkData.category}</h3>
                                                                <div className="capacity">
                                                                    <FontAwesomeIcon icon={faUserFriends} />
                                                                    <span style={{ marginLeft: '10px', fontSize: '22px' }}>{fkData.capacity}</span>
                                                                </div>
                                                                <h5 className="ms-4 mt-1">${fkData.price}</h5>
                                                            </article>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </>

                                    )
                            }


                        </div>
                    </div>
                    <div className="col-md-8 text-center">

                        <MapContainer />

                    </div>
                </div>
            </div>
        </div >
    );
};

export default Area;