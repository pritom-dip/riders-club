import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useForm } from "react-hook-form";
import { createUserWithCredentials, handleGoogleSignIn, initializeLoginFramework, userLogin } from './LoginManager';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useContext(userContext);
    const { register, handleSubmit, errors } = useForm();
    const [login, setLogin] = useState(true);
    const [showError, setShowError] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    initializeLoginFramework();

    const loginSubmit = data => {
        userLogin(data)
            .then(res => {
                if (res === 'error') {
                    setShowError(true);
                } else {
                    setUser(res);
                    setShowError(true);
                    history.replace(from);
                }

            })
            .catch(err => console.log('error', err));
    }

    const registerSubmit = data => {
        if (data.password !== data.samePassword) {
            alert('pass not matched');
        } else {
            createUserWithCredentials(data)
                .then(res => {
                    setUser(res);
                    history.replace(from);
                })
                .catch(err => console.log(err));
        }
    }

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res);
                history.replace(from);
            }).
            catch(err => console.log(err));
    }

    return (

        <div>
            <Header></Header>

            <div className="container custom-container d-flex justify-content-center align-items-center mt-5">
                <div className="card login-form">
                    <div className="card-body p-4">
                        {user.name}
                        <h3 className="card-title text-center">{login ? 'Login' : 'Register'}</h3>
                        <div className="card-text">
                            {
                                login ? (
                                    <form onSubmit={handleSubmit(loginSubmit)}>
                                        <div className="form-group mb-3">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input name="email" required placeholder="Your Email" type="email" ref={register({ pattern: /(.+)@(.+){2,}\.(.+){2,}/ })} className="form-control form-control-sm" />
                                            {errors.email && <span>Please Enter a valid email address</span>}
                                            {showError && <span>Username or password is invalid</span>}
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <input name="password" ref={register({ required: true })} placeholder="Password" type="password" className="form-control form-control-sm" />
                                            {errors.password && <span>This field is required</span>}
                                        </div>
                                        <button type="submit" className="btn btn-primary site-btn">Login</button>

                                        <div className="sign-up m-2 text-center">
                                            Don't have an account? <button className="custom-btn" onClick={() => setLogin(!login)}>Create An Accont</button>
                                        </div>
                                    </form>
                                ) :
                                    (
                                        <form onSubmit={handleSubmit(registerSubmit)}>
                                            <div className="form-group mb-3">
                                                <label htmlFor="exampleInputEmail1">Name</label>
                                                <input placeholder="Your Name" name="name" type="text" ref={register({ required: true })} className="form-control form-control-sm" />
                                                {errors.name && <span>Name is required</span>}
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="exampleInputEmail1">Email address</label>
                                                <input name="email" placeholder="Your Email" type="email" ref={register({ pattern: /(.+)@(.+){2,}\.(.+){2,}/ })} className="form-control form-control-sm" />
                                                {errors.email && <span>Please Enter a valid email address</span>}
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="exampleInputPassword1">Password</label>
                                                <input name="password" ref={register({ required: true })} placeholder="Password" type="password" className="form-control form-control-sm" />
                                                {errors.password && <span>This field is required</span>}
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="exampleInputPassword1">Retype Password</label>
                                                <input type="password" name="samePassword" ref={register({ required: true })} placeholder="Retype Password" className="form-control form-control-sm" />
                                                {errors.password && <span>This field is required</span>}
                                            </div>
                                            <button type="submit" className="btn btn-primary site-btn">Register</button>

                                            <div className="sign-up m-2 text-center">
                                                Already Have an account? <button className="custom-btn" onClick={() => setLogin(!login)}>Login</button>
                                            </div>
                                        </form>
                                    )
                            }

                        </div>
                    </div>
                </div>
                <div className="mt-3 login-form">
                    <h5 className="line"><span>OR</span></h5>
                    <button onClick={googleSignIn} className="w-100 btn btn-primary social-btn mb-2"><FontAwesomeIcon icon={faGoogle} /><span>Continue With Google </span></button>
                    <button className="w-100 btn btn-primary social-btn "><FontAwesomeIcon icon={faFacebook} /><span>Continue With Facebook </span></button>

                </div>
            </div>
        </div>
    );
};

export default Login;