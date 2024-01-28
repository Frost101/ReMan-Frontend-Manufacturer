import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;

import AppHeader from '../components/AppHeader';
import LandingHero from '../components/LandingHero';
import LandingAbout from '../components/LandingAbout';
import JoinNow from '../components/JoinNow';
import CustomFooter from '../components/CustomFooter';




import { useState, useEffect } from 'react';


const Landing_page = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    // Code inside this block will run after the component is mounted
    // It can also run after each render if dependencies are specified

    // Example: Fetching data from an API
    (async () => {
      let response = await fetch('https://reman.us.to/api/products/onSale');
      let data = await response.json();
      setData(data);
    })();

    
    console.log(data);
    console.log("bal");
    // Cleanup function (optional)
    return () => {
      // Code inside this block will run when the component is unmounted
      // It's used to clean up resources like subscriptions, timers, etc.
    };
  }, []); //

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  return (
    <Layout className='mainLayout'>
        <Layout>
            <Header>
                <AppHeader />
            </Header>
        </Layout>
        <Content>
            <LandingHero />
        </Content>
        <Content >
            <LandingAbout />
        </Content>
        <Content >
            <JoinNow />
        </Content>



      <CustomFooter/>
    </Layout>
  );
};


export default Landing_page;