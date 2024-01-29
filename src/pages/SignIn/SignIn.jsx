import React from 'react';
import './../../assets/css/SignIn.css'; // Create this CSS file for custom styling
import LoginForm from '../../components/SignIn/LoginForm';
import LoginCarousel from '../../components/SignIn/LogInCarousel';

function App() {
  return (
    <div className="page-container">
      <div className="center-box">
        <div className="left-section" >
          <div>
              <image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="logo" />
          </div>
            
        </div>
        <div className="right-section">
            <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default App;
