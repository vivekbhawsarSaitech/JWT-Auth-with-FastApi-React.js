import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../../context/context';
import { UserDataTable } from './UserDataTable';

export const Welcome = () => {

    const [users, setUsers] = useState([])

    const { token } = useContext(TokenContext);


    // Read all Todos
    useEffect(() => {
        axios.get('http://localhost:8000/test/users/all', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).then(res => {
            setUsers(res.data)
        })
    }, [token]);

    return (
        <div className="container mt-2 bg-light" style={{ height: '100vh', width: 'auto' }}>
            <h1>Welcome User . Login Succesfull .!!</h1>
            <UserDataTable users={users} />
        </div>
    )
}
