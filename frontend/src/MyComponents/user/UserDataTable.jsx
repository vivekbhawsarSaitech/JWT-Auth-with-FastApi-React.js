import React from 'react';

export const UserDataTable = ({ users }) => {

    return (

        <div className='container mt-3'>
            <div className="table-responsive-md">
                <table className='table  table-bordered table-hover'>
                    <thead className='table-dark bg-dark  text-white'>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            {/* Add additional table headers here */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.email}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                {/* Add additional user information columns here */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};
