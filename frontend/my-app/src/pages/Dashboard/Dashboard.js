import React, { useState, useEffect } from 'react';
import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';
import UserSelector from '../../components/UserSelector/UserSelector';
import api from '../../services/api';
import './Dashboard.css'; 

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentEditor, setCurrentEditor] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/auth/users/');  // Ensure this matches your endpoint
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
