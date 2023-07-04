import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { NavLink } from 'react-router-dom';
import React from 'react';
import './Header.css'

export const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            width: '100%',
            // zIndex: '100',
        }}>
            <div className="container"> {/* Wrap the contents of navbar in a container */}
                <NavLink className="navbar-brand" to="/">
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
                            <NavLink className="nav-link" activeclassname="active" to="/">
                                <b>Home</b>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeclassname="active" to="/about">
                                <b>About</b>
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <NavLink className="btn btn-outline-primary ms-1" to="/user/sign-in">
                            Log In
                        </NavLink>
                        <br />
                        <NavLink className="btn btn-outline-primary ms-1" to="/user/sign-up">
                            Signup
                        </NavLink>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
