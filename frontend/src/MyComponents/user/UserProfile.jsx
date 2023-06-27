import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { TokenContext } from '../../context/context';
import axios from 'axios';

export const UserProfile = () => {

    const { state } = useContext(TokenContext);

    const { userEmail } = state;   // Access the email from state
    const { token } = state;   // Access the token from state

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

    // convert image to base64 
    const convertToBase64 = useCallback((e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
            setFormData(prevFormData => ({
                ...prevFormData,
                profilePhoto: e.target.files[0], // Store the File object in formData
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


    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8000/users/profile/image', {
                "image_data": image,
                "user_email": userEmail
            })
            .then((res) => {
                // Check the status code from the backend
                const statusCode = res.data.status_code;
                if (statusCode === 200) {
                    alert('Image Uploaded Succesfully.');
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

    }, [image, userEmail]);


    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="profilePhoto">Profile Photo:</label>
                    <input
                        type="file"
                        accept="image/*"
                        id="profilePhoto"
                        name="profilePhoto"
                        ref={fileInputRef} // Assign the ref to the file input
                        onChange={convertToBase64}
                    />
                </div>
                <div className="image-box">
                    {image === "" || image === null ? null : <img src={image} alt='' className="image" />}
                </div>
                <button type="submit" className="submit-btn">Save</button>
            </form>
        </div>
    )
}
