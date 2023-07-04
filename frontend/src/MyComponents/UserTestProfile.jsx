import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserGear } from '@fortawesome/free-solid-svg-icons';
import './Testprofile.css'

export const UserTestProfile = () => {
    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-10 col-11 mx-auto">

                    {/* <nav aria-label="breadcrumb" className='mb-03 bg-light'>
                        <ol class="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Library</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Data</li>
                        </ol>
                    </nav> */}

                    <div className="row">
                        <div className="col-lg-3 col-md-4 d-md-block">
                            <div className="card bg-common card-left">
                                <div className="card-body">
                                    <nav class="nav d-md-block d-none ">
                                        <a data-toggle='tab' class="nav-link" href="#profile"> <i className='mr-1'><FontAwesomeIcon icon={faUser} /></i>     Profile</a>
                                        <a data-toggle='tab' class="nav-link" href="#account"> <i className='mr-1'><FontAwesomeIcon icon={faUserGear} /></i> Account Settings</a>

                                    </nav>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 col-md-9">
                            <div className="card">
                                <div className="card-header border-bottom mb-3 d-md-none">
                                    <ul class="nav nav-tabs card-header-tabs nav-fill">
                                        <li className="nav-item">
                                            <Link to="/profile" className="nav-link"> <i className='mr-1'><FontAwesomeIcon icon={faUser} /></i></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/account" className="nav-link"> <i className='mr-1'><FontAwesomeIcon icon={faUserGear} /></i></Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* user profile start */}

                                <div className="card-body tab-content border-0">
                                    {/* //actual profile data */}
                                    <div className="tab-pane active" id="profile">
                                        <h1>This is profile tab</h1>
                                    </div>
                                    <div className="tab-pane " id="account">
                                        <h1>This is account tab</h1>
                                    </div>
                                </div>

                            </div>
                        </div>



                    </div>

                </div>
            </div>
        </div>
    )
}