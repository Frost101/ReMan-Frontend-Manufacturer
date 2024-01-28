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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://reman.us.to/api/products/onSale');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Data:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

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