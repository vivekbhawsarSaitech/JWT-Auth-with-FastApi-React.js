import React, { useState, useCallback, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TokenContext } from '../../context/context';
import styles from './SignUp.module.css';

export const SignUp = () => {
    const { dispatch } = useContext(TokenContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: '',
        phone: '',
        email: '',
        password: '',
        dob: '',
        gender: '',
        country: '',
    });

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        console.log(formData)
        axios
            .post('http://localhost:8000/user/sign-up', formData)
            .then((res) => {

                const statusCode = res.status; // Check the status code from the backend
                if (statusCode === 201) {
                    const token = res.data.token.access_token;
                    // Dispatch action to update token and login state
                    dispatch({ type: 'SET_TOKEN', payload: token });
                    dispatch({ type: 'SET_LOGGED_IN', payload: true });
                    navigate('/user/home'); // Navigate to user/home page
                } else {
                    // console.log(res); // Log the entire response object for debugging
                    alert('An error occurred. Please try again later.');
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

    }, [formData, dispatch, navigate]);




    return (
        <div>

            <div className={styles.container}>
                <div className={`${styles.form} ${styles.login}`}>
                    <div className={styles['form-content']}>
                        <header>Signup</header>
                        <form action="#">
                            <div className={`${styles.field} ${styles['input-field']}`}>
                                <input type="text"
                                    name="fullname"
                                    placeholder='Full name'
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={`${styles.field} ${styles['input-field']}`}>
                                <input type="text"
                                    name="phone"
                                    placeholder='Contact'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={`${styles.field} ${styles['input-field']}`}>
                                <input type="email"
                                    name="email"
                                    placeholder='Email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={`${styles.field} ${styles['input-field']}`}>
                                <input type="password"
                                    name="password"
                                    placeholder='Password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={8}
                                />
                            </div>

                            <div className={`${styles.field} ${styles['input-field']}`}>
                                <input type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={`${styles.field} ${styles['input-field']}`}>
                                <select as="select"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="not-specified">Prefer not to say</option>
                                </select>
                            </div>

                            <div className={`${styles.field} ${styles['input-field']}`}>
                                <input type="text"
                                    name="country"
                                    placeholder='Country'
                                    value={formData.country}
                                    onChange={handleChange}
                                    required />
                            </div>

                            <div className={`${styles.field} ${styles['button-field']}`}>
                                <button type="submit" onClick={handleSubmit}>
                                    Signup
                                </button>
                            </div>
                        </form>

                        <div className={styles['form-link']}>
                            <span>
                                Already have an account?{' '}
                                <NavLink to="/user/sign-in" className={styles.link}>
                                    Login
                                </NavLink>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}