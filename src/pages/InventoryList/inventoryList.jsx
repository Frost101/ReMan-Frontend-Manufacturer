import { Layout, theme, Breadcrumb } from "antd";
import MenuList from "../../components/common/MenuList";
const {Content, Sider} = Layout;
import { useState, useEffect} from "react";
import { CodeSandboxCircleFilled, HomeOutlined} from "@ant-design/icons";
import MenuCollapse from "../../components/common/MenuCollapse";
import InventoryCard from "../../components/common/InventoryCard";
import CustomFooter from "../../components/CustomFooter";
import {useLocation} from 'react-router-dom';

function InventoryList(){
    const location = useLocation();

    const manufacturerId = location.state.manufacturerId;
    const manufacturerName = location.state.manufacturerName;
    const manufacturerLogo = location.state.manufacturerLogo;
    
    //* Menu Collapse
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const [marginLeft, setMarginLeft] = useState(200);
    const handleMenuCollapse = (collapsed) => {
        setCollapsed(collapsed);
        if(collapsed){
            setMarginLeft(80);
        }
        else{
            setMarginLeft(200);
        }
    };


    //* Set inventory list
    const [inventoryList, setInventoryList] = useState([]);



    //* Fetch Inventory List
    let response,receivedData;
    useEffect(() => {
        const fetchData = async () => {
            let data = {
                manufacturerId: manufacturerId
            }
            try{
                response = await fetch('https://reman.us.to/api/inventory/inventoryList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                setInventoryList(receivedData);
            }
            catch(error){
                console.log("Error");
            }
        };
    
        fetchData();
      }, []); 


    return (
        <div>
            <Layout>

               
                <Sider 
                collapsed={collapsed}
                collapsible
                trigger={null} 
                className="sidebar"
                style={{position:'fixed', minHeight:'100vh'}}
                >
                <div className="logo" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center',marginBottom:'10px', padding:'10px' }}>
                        <CodeSandboxCircleFilled style={{ fontSize: '45px', color: '#08c', marginTop:'10px', display:'flex', alignItems:'center', justifyContent:'center' }} />
                    </div>
                    <div>
                    <p style={{fontSize:'25px', margin: '0', marginLeft: '4px', marginTop:'5px', fontFamily:'Chewy', color:'#fff'}}>REMAN</p>
                    </div>
                </div>
                
                <MenuList value={{manufacturerId:manufacturerId,
                                    manufacturerName:manufacturerName,
                                    manufacturerLogo:manufacturerLogo,
                                    }}/>
                </Sider>
               



                <Layout style={{marginLeft, minHeight:'100vh'}}>
                    <MenuCollapse  sendDataToParent={handleMenuCollapse}/>
                    <Layout
                    style={{
                        padding: '0 24px 24px',
                    }} >

                        <div style={{display:'flex', justifyContent:'center'}}>
                            <div style={{flex:'1',alignContent:'left'}}>

                            
                                    <Breadcrumb
                                    style={{
                                    margin: '65px 0 0 0',
                                    display: 'flex',
                                    justifyContent: 'left',
                                    }}
                                >
                                    <Breadcrumb.Item><HomeOutlined style={{color:'Black', fontSize:'20px'}}/></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Manufacturer</p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Inventory List</p></Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div style={{flex:'1',
                                    margin: '55px 40px 0 0',
                                    display: 'flex',
                                    justifyContent: 'right'}}>

                                    <div className="logo" style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center',marginBottom:'10px', padding:'10px' }}>
                                            {/* <CodeSandboxCircleFilled style={{ fontSize: '45px', color: '#08c', display:'flex', alignItems:'center', justifyContent:'center' }} /> */}
                                            <img src = "https://live.staticflickr.com/8228/8511339367_1b3d4612ae.jpg" style={{width:'50px', height:'50px', borderRadius:'50%'}}/>
                                        </div>
                                    </div>
                                    <p style={{fontFamily:'Kalam', fontSize:"50px",color:'#001529'}}>{manufacturerName}</p>
                            </div>
                        </div>

                        <Content
                            style={{
                            paddingTop: 0,
                            paddingLeft: 24,
                            paddingRight: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            overflow : 'initial'
                            }}
                        >
                             <p style={{color:'#001529',fontSize:'50px',fontFamily:'Kalam'}}>My Inventories:</p>
                            
                            {
                                inventoryList.length !=0 && inventoryList.inventories.map((inventory, index) => {
                                    return <InventoryCard key = {index} inventory={inventory}/>
                                }
                                )
                            }
                            
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

export default InventoryList;