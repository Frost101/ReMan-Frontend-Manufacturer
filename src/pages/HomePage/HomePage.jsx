import { Layout, Button, theme, Breadcrumb } from "antd";
const {Header,Content, Sider} = Layout;
import { CodeSandboxCircleFilled,HomeOutlined } from "@ant-design/icons";
import { useState, useEffect} from "react";
import MenuList from "../../components/common/MenuList"
import MenuCollapse from "../../components/common/MenuCollapse";
import CustomFooter from "../../components/CustomFooter";
import {useLocation} from 'react-router-dom';



function HomePage(){
    const [collapsed, setCollapsed] = useState(false);
    const [manInfo, setManInfo] = useState({manInfo:[]});
    const {
        token: { colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const [marginLeft, setMarginLeft] = useState(200);
    const location = useLocation();
    const manufacturerId = location.state.manufacturerId;


    let response,receivedData;
    useEffect(() => {
        const fetchData = async () => {
            let data = {
                manufacturerId: manufacturerId
            }
            try{
                response = await fetch('https://reman.us.to/api/manufacturer/info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                setManInfo(receivedData);
            }
            catch(error){
        
            }
        };
    
        fetchData();
      }, []); 


    


    const handleMenuCollapse = (collapsed) => {
        setCollapsed(collapsed);
        if(collapsed){
            setMarginLeft(80);
        }
        else{
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
                className="sidebar"
                style={{position:'fixed'}}>
                <div className="logo" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center',marginBottom:'10px', padding:'10px' }}>
                        <CodeSandboxCircleFilled style={{ fontSize: '45px', color: '#08c', marginTop:'10px', display:'flex', alignItems:'center', justifyContent:'center' }} />
                    </div>
                    <div>
                    <p style={{fontSize:'25px', margin: '0', marginLeft: '4px', marginTop:'5px', fontFamily:'Chewy', color:'#fff'}}>REMAN</p>
                </div>
                </div>
                
                <MenuList  value={{manufacturerId:manufacturerId,
                                    manufacturerName: manInfo.Name,
                                    manufacturerLogo: "logo.jpg"}}/>
                </Sider>
                <Layout style={{marginLeft, minHeight:'100vh'}}>
                    <MenuCollapse  sendDataToParent={handleMenuCollapse}/>
                    <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                    >
                        <Breadcrumb
                            style={{
                            margin: '65px 0 0 0',
                            display: 'flex',
                            justifyContent: 'left',
                            }}
                        >
                            <Breadcrumb.Item><HomeOutlined style={{color:'Black', fontSize:'20px'}}/></Breadcrumb.Item>
                            <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Manufacturer</p></Breadcrumb.Item>
                            <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Home</p></Breadcrumb.Item>
                        </Breadcrumb>


                
                        <Content
                            style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            }}
                        >
                            <p style={{fontFamily:'Lobster', fontSize: '60px', color:'blue'}}>{manInfo.Name}</p>
                        </Content>
                     </Layout>
                </Layout>
            </Layout>
            <Layout>
                <CustomFooter />
            </Layout>
            
        </div>
    )
}

export default HomePage;