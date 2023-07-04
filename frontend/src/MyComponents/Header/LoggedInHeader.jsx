import { NavLink, useNavigate } from 'react-router-dom';
import React, { useCallback, useContext } from 'react';
import { TokenContext } from '../../context/context';
import axios from 'axios';

export const LoggedInHeader = () => {

    const navigate = useNavigate();

    const { token, updateLoggedIn } = useContext(TokenContext)

    const handleLogout = useCallback((e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8000/token/blacklist', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((res) => {
                // Check the status code from the backend
                const statusCode = res.data.status_code;
                if (statusCode === 200) {
                    updateLoggedIn(false);
                    navigate('/'); // Navigate to home page
                } else {
                    console.log(res); // Log the entire response object for debugging
                    alert('An error occurred. Please try again later.');
                }
            })
            .catch((error) => {
                if (error.response) {

                    const statusCode = error.response.status;
                    const errorMessage = error.response.data.detail;
                    alert(`Error: ${statusCode} - ${errorMessage}`);
                } else if (error.request) {
                    // The request was made but no response was received
                    alert('No response received from the server');
                } else {
                    // Something happened in setting up the request that triggered an error
                    alert('Error: ' + error.message);
                }
            });

    }, [token, navigate]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            width: '100%',
            // zIndex: '100',
        }}>
            <div className="container"> {/* Wrap the contents of navbar in a container */}
                <NavLink className="navbar-brand" to="/user/home">
                    <img
                        src="/logo192.png"
                        alt="Logo"
                        style={{
                            height: '50px',
                            margin: 'auto',
                            marginLeft: '5px',
                            padding: '5px',
                            border: '1px solid black',
                            borderRadius: '5px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                            lineHeight: '50px',
                        }}
                    />
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeclassname="active" to="/user/home">
                                <b>Home</b>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeclassname="active" to="/user/profile">
                                <b>Profile</b>
                            </NavLink>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <NavLink
                            className="btn btn-outline-primary ms-1"
                            to="/user/sign-in"
                            onClick={handleLogout}
                        >
                            Logout
                        </NavLink>
                    </ul>
                </div>
            </div>
        </nav>
        // <div className="container-fluid mt-5">
        //     <div className="row">
        //         <div className="col-md-10 col-11 mx-auto">

        //             <nav aria-label="breadcrumb" className='mb-03  bg-light'>
        //                 <ol class="breadcrumb">
        //                     <li class="breadcrumb-item"><a href="#">Home</a></li>
        //                     <li class="breadcrumb-item"><a href="#">Library</a></li>
        //                     <li class="breadcrumb-item active" aria-current="page">Data</li>
        //                 </ol>
        //             </nav>

        //         </div>
        //     </div>
        // </div>
    );
}
