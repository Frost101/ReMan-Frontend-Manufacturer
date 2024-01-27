import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'antd/dist/reset.css'
import { Button, ConfigProvider, Space } from 'antd';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={
      {
        token: {
          // Seed Token
          // colorPrimary: '#00b96b',
          // colorBgBase : '#f5f5f5',
        },
        components: {
          Input: {
            // hoverBg : '#f5f5f5',
          },
        },
    
      }
    }>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
