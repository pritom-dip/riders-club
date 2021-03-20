import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import './Header.css';

const Header = () => {
    const [user, setUser] = useContext(userContext);
    return (
        <div className="container" style={{ alignSelf: 'flex-start' }}>
            <div className="row">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Riders Club</a>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarScroll">
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ justifyContent: 'flex-end', alignItems: 'center', 'width': '100%' }}>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/ride/car" className="nav-link">Destination</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Blog</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Contact</Link>
                                </li>

                                <li className="nav-item">
                                    {
                                        user?.email ? <span className="nav-link">{user.name}</span> : <Link to="/login" className="nav-link"><button className="btn btn-primary site-btn">Login</button></Link>
                                    }

                                </li>

                            </ul>

                        </div>

                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;