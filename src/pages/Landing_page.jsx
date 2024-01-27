import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;

import AppHeader from '../components/AppHeader';
import LandingHero from '../components/LandingHero';
import LandingAbout from '../components/LandingAbout';
import JoinNow from '../components/JoinNow';
import CustomFooter from '../components/CustomFooter';



const Landing_page = () => {
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