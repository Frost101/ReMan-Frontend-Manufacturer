import { Layout, Button, theme } from "antd";
const {Header, Sider} = Layout;
import { CodeSandboxCircleFilled, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState} from "react";
import LogoAndName from "../../components/LogoAndName";
import MenuList from "../../components/HomePage/MenuList";



function HomePage(){
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer},
    } = theme.useToken();
    const [marginLeft, setMarginLeft] = useState(200);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        if(marginLeft === 200){
            setMarginLeft(80);
        }else{
            setMarginLeft(200);
        }
    };

    return(
        <div>
            <Layout>
                <Sider 
                collapsed={collapsed}
                collapsible
                trigger={null} 
                className="sidebar">
                <div className="logo" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center',marginBottom:'10px', padding:'10px' }}>
                        <CodeSandboxCircleFilled style={{ fontSize: '45px', color: '#08c', marginTop:'10px', display:'flex', alignItems:'center', justifyContent:'center' }} />
                    </div>
                    <div>
                    <p style={{fontSize:'25px', margin: '0', marginLeft: '4px', marginTop:'5px', fontFamily:'Chewy', color:'#fff'}}>REMAN</p>
                </div>
                </div>
                
                <MenuList />
                </Sider>
                <Layout>
                    <Header style={{marginLeft, padding:0, background: 
                colorBgContainer}}>
                    
                    <Button  
                        type="text"
                        className="toggle"
                        onClick={toggleCollapsed}
                        icon = {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    />
                    </Header>
                </Layout>
            </Layout>
            
        </div>
    )
}

export default HomePage;