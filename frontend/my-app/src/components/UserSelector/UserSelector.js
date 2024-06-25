import React from 'react';

const UserSelector = ({ users, editDocumentWithUser }) => {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          {user.username}
          <button onClick={() => editDocumentWithUser(user.id)}>Edit Document</button>
        </div>
      ))}
    </div>
  );
};

export default UserSelector;
