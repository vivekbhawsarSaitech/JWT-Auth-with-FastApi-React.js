import React, { useCallback, useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TokenContext } from '../../context/context';
import styles from './SignIn.module.css';

export const SignIn = () => {

    const { dispatch } = useContext(TokenContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }, []);


    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            alert("Email or Password cannot be blank..!!")
        }
        else {

            axios.post('http://localhost:8000/user/sign-in', formData)
                .then((res) => {

                    const statusCode = res.data.status_code; // Check the status code from the backend
                    if (statusCode === 200) {
                        const token = res.data.token.access_token;
                        // Dispatch action to update token and login state
                        dispatch({ type: 'SET_TOKEN', payload: token });
                        dispatch({ type: 'SET_LOGGED_IN', payload: true });
                        dispatch({ type: 'SET_EMAIL', payload: formData.email });
                        navigate('/user/home'); // navigate to user/home page

                    } else {
                        alert('Response from the backend API: ' + JSON.stringify(res.data.detail));
                        console.log(res);
                    }

                })
                .catch((error) => {
                    if (error.response) {
                        const statusCode = error.response.status;
                        const errorMessage = error.response.data.detail;
                        alert(`Error: ${statusCode} - ${errorMessage}`);
                    } else if (error.request) {
                        alert('No response received from the server'); // The request was made but no response was received
                    } else {
                        // Something happened in setting up the request that triggered an error
                        alert('Error: ' + error.message);
                    }
                });
        }
    }, [formData, dispatch, navigate]);


    return (
        <section className={styles.container}>
            <div className={`${styles.form} ${styles.login}`}>
                <div className={styles['form-content']}>
                    <header>Login</header>
                    <form action="#">
                        <div className={`${styles.field} ${styles['input-field']}`}>
                            <input
                                type="email"
                                placeholder="Email"
                                className={styles.input}
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={`${styles.field} ${styles['input-field']}`}>
                            <input
                                type="password"
                                placeholder="Password"
                                className={styles.password}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <i className={`${styles['bx']} ${styles['bx-hide']} ${styles['eye-icon']}`}></i>
                        </div>
                        {/* <div className={styles['form-link']}>
                            <a href="#" className={styles['forgot-pass']}>
                                Forgot password?
                            </a>
                            <p className={styles['forgot-pass']}>Forgot password?
                                <NavLink
                                    className={styles['forgot-pass']}
                                    activeclassname="active"
                                    to="/user/sign-in"
                                >Log in
                                </NavLink>
                            </p>
                        </div> */}
                        <div className={`${styles.field} ${styles['button-field']}`}>
                            <button type="submit" onClick={handleSubmit}>
                                Login
                            </button>
                        </div>
                    </form>
                    <div className={styles['form-link']}>
                        <span>
                            Don't have an account?{' '}
                            {/* <a href="#" className={`${styles.link} ${styles['signup-link']}`}>
                                Signup
                            </a> */}
                            <p className={`${styles.link} ${styles['signup-link']}`}>
                                <NavLink
                                    className={`${styles.link} ${styles['signup-link']}`}
                                    activeclassname="active"
                                    to="/user/sign-up"
                                >Signup
                                </NavLink>
                            </p>
                        </span>
                    </div>
                </div>
                {/* <div className={styles.line}></div>
                <div className={styles['media-options']}>
                    <p className={`${styles['text-center']} mt-4`}>
                        Already a user?
                        <NavLink
                            className={`${styles.field} ${styles.facebook}`}
                            activeClassName="active"
                            to="/user/sign-in"
                        >
                            Log in
                        </NavLink>
                    </p>
                    <i className={`${styles['bx']} ${styles['bx1-facebook']} ${styles['facebook-icon']}`}></i>
                    <span>Login with Facebook</span>
                </div>
                <div className={styles['media-options']}>
                    <p className={`${styles['text-center']} mt-4`}>
                        Already a user?
                        <NavLink
                            className={`${styles.field} ${styles.google}`}
                            activeClassName="active"
                            to="/user/sign-in"
                        >
                            Log in
                        </NavLink>
                    </p>
                    <img src="images/google.png" alt="" className={styles['google-img']} />
                    <span>Login with Google</span>
                </div> */}
            </div>
        </section>
    );
};



