import { Layout, theme, Breadcrumb, Spin, Card, Avatar } from "antd";
import MenuList from "../../components/common/MenuList";
const {Content, Sider} = Layout;
import { useState, useEffect} from "react";
import { CodeSandboxCircleFilled, HomeOutlined, PlusCircleTwoTone, ShopOutlined} from "@ant-design/icons";
import MenuCollapse from "../../components/common/MenuCollapse";
import InventoryCard from "../../components/common/InventoryCard";
import CustomFooter from "../../components/CustomFooter";
import {useLocation, useNavigate} from 'react-router-dom';
const { Meta } = Card;

function LeaseManagement(){
    const location = useLocation();
    const navigate = useNavigate();

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


   
    const [loading, setLoading] = useState(false); 



    //* Fetch Inventory List
    let response,receivedData;
    useEffect(() => {
        const fetchData = async () => {

            
        };
    
        fetchData();
      }, []);
      

      const goToGiveLeasePage = () => {
        navigate("/man/leaseManagement/giveLease",
        {
            state: {
                manufacturerId: manufacturerId,
                manufacturerName: manufacturerName,
                manufacturerLogo: manufacturerLogo
            }
        })
      };






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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Lease Management </p></Breadcrumb.Item>
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
                             <div style={{display:'flex', justifyContent:'center'}}>
                                <p style={{color:'blue',fontSize:'50px',fontFamily:'Kalam'}}> Inventory Lease Management </p>
                                
                            </div>

                            {/* //*Loading effect   */  }
                            {
                                loading &&
                                <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>
                                    <Spin spinning={loading} size="large">
                                    </Spin>
                                </div>
                            }

                            
                            {/* {
                                inventoryList.length !=0 && inventoryList.inventories.map((inventory, index) => {
                                    return <InventoryCard key = {index} value={
                                        {
                                            inventory: inventory,
                                            manufacturerId: manufacturerId,
                                            manufacturerName: manufacturerName,
                                            manufacturerLogo: manufacturerLogo
                                        }
                                    }/>
                                }
                                )
                            } */}

                            <div style={{display:'flex', justifyContent:'center'}}>
                                <div style={{flex:1}}>
                                <Card
                                    hoverable
                                    style={{
                                    width: 300,
                                    }}
                                    cover={
                                    <img
                                        alt="example"
                                        src="https://firebasestorage.googleapis.com/v0/b/reman-manufacturer.appspot.com/o/Misc%2FinventoryMarketplace.svg?alt=media&token=031a67e6-7e5d-4c0c-9a97-61e97099d0f7"
                                    />
                                    }
                                    
                                >
                                    <Meta
                                    avatar={<ShopOutlined  style={{fontSize:'30px', color:'blue'}} />}
                                    style={{textAlign:'center', fontFamily:'Kalam'}}
                                    title="Inventory Marketplace"
                                    description="Here you can buy inventory from other manufacturers"
                                    />
                                </Card>
                                </div>



                                <div style={{flex:1}}>
                                <Card
                                    onClick={goToGiveLeasePage}
                                    hoverable
                                    style={{
                                    width: 300,
                                    }}
                                    cover={
                                    <img
                                        alt="example"
                                        src="https://firebasestorage.googleapis.com/v0/b/reman-manufacturer.appspot.com/o/Misc%2FLeaseInventory.svg?alt=media&token=243c21a6-4725-4806-bd7c-c08d3994d24f"
                                    />
                                    }
                                    
                                >
                                    <Meta
                                    avatar={<ShopOutlined  style={{fontSize:'30px', color:'blue'}} />}
                                    style={{textAlign:'center', fontFamily:'Kalam'}}
                                    title="Give Lease"
                                    description="Here you can choose to give lease to other manufacturers"
                                    />
                                </Card>
                                </div>




                                <div style={{flex:1}}>
                                <Card
                                    hoverable
                                    style={{
                                    width: 300,
                                    }}
                                    cover={
                                    <img
                                        alt="example"
                                        src="https://firebasestorage.googleapis.com/v0/b/reman-manufacturer.appspot.com/o/Misc%2FBoughtInventories.svg?alt=media&token=e7f7a51c-1799-42dc-a268-db50dd019bac"
                                    />
                                    }
                                    
                                >
                                    <Meta
                                    avatar={<ShopOutlined  style={{fontSize:'30px', color:'blue'}} />}
                                    style={{textAlign:'center', fontFamily:'Kalam'}}
                                    title="Bought Inventories"
                                    description="Here you can see the inventories you have bought"
                                    />
                                </Card>
                                </div>


                                <div style={{flex:1}}>
                                <Card
                                    hoverable
                                    style={{
                                    width: 300,
                                    }}
                                    cover={
                                    <img
                                        alt="example"
                                        src="https://firebasestorage.googleapis.com/v0/b/reman-manufacturer.appspot.com/o/Misc%2FLeaseHistory.svg?alt=media&token=cc86f42a-65b8-463c-a94b-857005d54f7e"    
                                    
                                    />
                                    }
                                    
                                >
                                    <Meta
                                    avatar={<ShopOutlined  style={{fontSize:'30px', color:'blue'}} />}
                                    style={{textAlign:'center', fontFamily:'Kalam'}}
                                    title="Lease History"
                                    description="Here you can see the history of the leases you have given and taken"
                                    />
                                </Card>
                                </div>

                                
                            </div>


                                
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

export default LeaseManagement;