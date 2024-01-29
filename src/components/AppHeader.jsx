
import React from 'react';
import { Menu } from 'antd';
import {CodeSandboxCircleFilled} from '@ant-design/icons';
const { SubMenu } = Menu;

function AppHeader() {
  return (
    <div className='container-fluid'>
        <div className='header'>
        <div className="logo" >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <CodeSandboxCircleFilled style={{ fontSize: '45px', color: '#08c' }} />
                <p style={{fontSize:'25px', margin: '0', marginLeft: '10px', fontFamily:'Chewy'}}>ReMan</p>
            </div>
        </div>
            <Menu
            mode="horizontal"
            defaultSelectedKeys={['Home']}
            disabledOverflow={true}
            >
                <Menu.Item key="Home" ><p style={{fontFamily:'Kalam'}}><a href='/'>Home</a></p></Menu.Item>
                <Menu.Item key="About"><p style={{fontFamily:'Kalam'}}><a href='#about'>About</a></p></Menu.Item>
                <Menu.Item key="Benefits"> <p style={{fontFamily:'Kalam'}}><a href='#benefits'>Benefits</a></p> </Menu.Item>
                <Menu.Item key="Join"> <p style={{fontFamily:'Kalam'}}><a href='#join'>Join Us</a></p> </Menu.Item>
                {/* <Menu.Item key="SignIn"> <p style={{fontFamily:'Kalam'}}><a href='/signin'>Sign In</a></p> </Menu.Item> */}

                <Menu.Item>
                <SubMenu mode="inline" disabledOverflow={true} key="signin" title="SignIn" style={{fontFamily:'Kalam', display:'flex', marginBottom:'17px'}}>
                    <Menu.Item key="retailer"><p style={{fontFamily:'Kalam'}}><a href='/signin'>Retailer</a></p></Menu.Item>
                    <Menu.Item key="manufacturer"><p style={{fontFamily:'Kalam'}}><a href='/signin'>Manufacturer</a></p></Menu.Item>
                </SubMenu>
                </Menu.Item>
                
                <Menu.Item key="Contact"> <p style={{fontFamily:'Kalam'}}><a href='#contact'>Contact</a></p> </Menu.Item>

            </Menu>
        </div>
    </div>
  );
}

export default AppHeader;