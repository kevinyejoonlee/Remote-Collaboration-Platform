import React from 'react';
import DocumentEditor from '../../components/VideoCall/VideoCall';
import VideoCall from '../../components/DocumentEditor/DocumentEditor';
import './Dashboard.css'; 

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="video-call-section">
        <VideoCall />
      </div>
      <div className="document-editor-section">
        {/* <DocumentEditor /> */}
      </div>
    </div>
  );
}

export default Dashboard;
