import React from 'react';
import './../../assets/css/SignIn.css'; // Create this CSS file for custom styling
import LoginForm from '../../components/SignIn/LoginForm';

function App() {
  return (
    <div className="page-container">
      <div className="center-box">
        <div className="left-section"></div>
        <div className="right-section">
            <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default App;
