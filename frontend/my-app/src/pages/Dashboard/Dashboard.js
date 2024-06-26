import React, { useState, useEffect } from 'react';
import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';
import UserSelector from '../../components/UserSelector/UserSelector';
import axios from 'axios'; // Ensure axios is installed
import './Dashboard.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentEditor, setCurrentEditor] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/users/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const editDocumentWithUser = (id) => {
    setCurrentEditor(id);
  };

  return (
    <div className="dashboard">
      {!currentEditor && <UserSelector users={users} editDocumentWithUser={editDocumentWithUser} />}
      {currentEditor && (
        <div className="document-editor-section">
          <DocumentEditor />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
