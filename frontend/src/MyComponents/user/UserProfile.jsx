import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { TokenContext } from '../../context/context';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faAddressBook, faVenusMars, faCalendarDays, faCheck } from '@fortawesome/free-solid-svg-icons';

export const UserProfile = () => {


    const { token, userEmail } = useContext(TokenContext); // Access the email and Token value

    const [image, setImage] = useState("");

    const fileInputRef = useRef(null); // Ref to file input element

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        profilePhoto: ''
    });



    // convert base64 to Blob
    const base64ToBlob = useCallback((base64Data) => {
        const byteString = atob(base64Data.split(',')[1]);
        const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }, []);

    // Read user data
    useEffect(() => {
        axios.get('http://localhost:8000/users/profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                email: userEmail,
            },
        }).then(res => {
            const { data } = res;
            if (data.profilePhoto) {
                const blob = base64ToBlob(data.profilePhoto);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    profilePhoto: blob,
                }));
                setImage(data.profilePhoto);
            }
            setFormData(data);
        })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    }, [userEmail, base64ToBlob, token]);


    const handleProfilePhotoChange = useCallback((e) => {
        // Remove the previous image by setting the image state to an empty string
        setImage("");
        setFormData(prevFormData => ({
            ...prevFormData,
            profilePhoto: '',
        }))
        // Programmatically trigger the file selection dialog
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // Set the value to null to clear the file selection
            fileInputRef.current.click();
        }
    }, []);


    // convert image to base64 [ new ]
    const convertToBase64 = useCallback((e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            const imageData = reader.result; // Save the Base64 string in a variable
            setImage(imageData);
            setFormData(prevFormData => ({
                ...prevFormData,
                profilePhoto: imageData, // Store the Base64 string in formData
            }));
            fileInputRef.current.value = ""; // Clear the value of the file input
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        }
    }, []);


    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }, []);

    const handleUserDataSubmit = useCallback((e) => {
        e.preventDefault();
        console.log(formData)
        axios.post('http://localhost:8000/users/profile/data', formData
        )
            .then((res) => {
                // Check the status code from the backend
                const statusCode = res.data.status_code;
                if (statusCode === 200) {
                    alert('Data Updated Succesfully.');
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

    }, [formData]);


    return (

        <div className="container bg-light" style={{ height: '100vh', width: 'auto' }}>
            <div className="container-fluid  mt-5">
                <div className="row">
                    <div className="col-md-10 col-11 mx-auto">
                        <div className="row">


                            <div className="col-lg-3 col-md-4 d-md-block">
                                <div className="card bg-common card-left">
                                    <div className="card-body">
                                        <nav className="nav d-md-block">

                                            <div className="form-group">

                                                {image ? (
                                                    <div className="image-box d-flex flex-column align-items-center">
                                                        <img
                                                            src={image}
                                                            alt=""
                                                            className="image"
                                                            style={{
                                                                maxWidth: '100%',
                                                                maxHeight: '200px',
                                                                objectFit: 'cover',
                                                                marginBottom: '10px',
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary ms-1"
                                                            // onClick={() => fileInputRef.current.click()}
                                                            onClick={handleProfilePhotoChange}
                                                        >
                                                            Remove Picture
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        id="profilePhoto"
                                                        name="profilePhoto"
                                                        ref={fileInputRef} // Assign the ref to the file input
                                                        onChange={convertToBase64}
                                                    />
                                                )}
                                            </div>

                                        </nav>
                                    </div>
                                </div>
                            </div>



                            <div className="col-lg-8 col-md-9">
                                <div className="card">
                                    <div className="card-header border-bottom mb-2">
                                        <div className="table-responsive-md">


                                            <table className="table table-hover">

                                                <thead className="table-dark">
                                                    <tr>
                                                        <th className="align-middle">
                                                            <div className="d-flex align-items-center">
                                                                <i className="me-2"><FontAwesomeIcon icon={faUser} /></i>
                                                                <b>Name</b>
                                                            </div>
                                                        </th>
                                                        <th className="table-light">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={formData.name}
                                                                onChange={handleInputChange}
                                                                name="name"
                                                            />
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            <div className="d-flex align-items-center">
                                                                <i className="me-2"><FontAwesomeIcon icon={faEnvelope} /></i>
                                                                <b>Email</b>
                                                            </div>
                                                        </th>
                                                        <th className="table-light">{formData.email}</th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            <div className="d-flex align-items-center">
                                                                <i className="me-2"><FontAwesomeIcon icon={faAddressBook} /></i>
                                                                <b>Contact</b>
                                                            </div>
                                                        </th>
                                                        <th className="table-light">
                                                            <input
                                                                className="form-control"
                                                                type="tel"
                                                                value={formData.phone}
                                                                onChange={handleInputChange}
                                                                name="phone"
                                                            /></th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            <div className="d-flex align-items-center">
                                                                <i className="me-2"><FontAwesomeIcon icon={faVenusMars} /></i>
                                                                <b>Gender</b>
                                                            </div>
                                                        </th>
                                                        <th className="table-light">
                                                            <select
                                                                className="form-select"
                                                                value={formData.gender}
                                                                onChange={handleInputChange}
                                                                name="gender"
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                                <option value="other">Other</option>
                                                            </select>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            <div className="d-flex align-items-center">
                                                                <i className="me-2"><FontAwesomeIcon icon={faCalendarDays} /></i>
                                                                <b>D.O.B</b>
                                                            </div>
                                                        </th>
                                                        <th className="table-light">
                                                            <input
                                                                type="date"
                                                                value={formData.dob}
                                                                onChange={handleInputChange}
                                                                name="dob"
                                                            />
                                                        </th>
                                                    </tr>

                                                </thead>
                                            </table>

                                        </div>
                                    </div>

                                    <button className="btn btn-outline-primary m-2" onClick={handleUserDataSubmit}>
                                        Update
                                        <i className="mx-2"><FontAwesomeIcon icon={faCheck} /></i>
                                    </button>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}
