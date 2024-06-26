import React from 'react';

const UserSelector = ({ users, editDocumentWithUser }) => {
    return (
        <div>
            <h2>Select a User to Collaborate With:</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <button onClick={() => editDocumentWithUser(user.id)}>
                            {user.username}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserSelector;
