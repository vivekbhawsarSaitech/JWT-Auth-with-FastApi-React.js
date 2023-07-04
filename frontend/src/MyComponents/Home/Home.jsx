import React, { useState, useEffect } from 'react';
import { UserDataTable } from './UserDataTable';
import axios from 'axios';


export const Home = () => {

    const [users, setUsers] = useState([])

    // Read all users data [Name and email]
    useEffect(() => {
        axios.get('http://localhost:8000/test/users/all').then(res => {
            setUsers(res.data)
        })
    }, []);

    return (
        <div>
            <div className="container bg-light" style={{ height: '100vh', width: 'vw' }}>
                <div>
                    <h1>Hello User .!!</h1>
                    <br />
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos quam natus ipsum ut nemo nobis dolorum asperiores, ratione animi. Sint, quisquam cumque nisi illum libero fugit. Sequi aperiam alias ullam! Dolorum aperiam cupiditate fugit ab tenetur ea, aspernatur dolore praesentium voluptas corporis natus, consectetur at debitis doloribus quos aut doloremque facere. Magnam beatae voluptates laudantium quibusdam tempore, assumenda adipisci pariatur cupiditate ab sint laboriosam delectus commodi sunt dolores magni neque numquam debitis. Placeat quisquam dignissimos sapiente doloribus totam. Tempora, vero. Accusantium veritatis ipsum laboriosam eum facilis consequuntur reprehenderit ducimus dolor, culpa ea blanditiis quibusdam optio natus autem fuga totam. Tempore.</p>
                    <br />
                    <UserDataTable users={users} />
                </div>
            </div>
        </div>
    )
}
