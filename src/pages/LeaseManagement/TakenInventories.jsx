import { Layout, theme, Breadcrumb, Spin } from "antd";
import MenuList from "../../components/common/MenuList";
const {Content, Sider} = Layout;
import { useState, useEffect} from "react";
import { CodeSandboxCircleFilled, HomeOutlined, PlusCircleFilled, ExclamationCircleFilled} from "@ant-design/icons";
import MenuCollapse from "../../components/common/MenuCollapse";
import RentedInventoryCard from "../../components/LeaseManagement/RentedInventoryCard";
import TakenInventoriesCard from "../../components/LeaseManagement/TakenInventoriesCard";
import CustomFooter from "../../components/CustomFooter";
import {useLocation, useNavigate} from 'react-router-dom';

function TakenInventories(){
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


    //* Set inventory list
    const [inventoryList, setInventoryList] = useState([]);
    const [loading, setLoading] = useState(false); 



    //* Fetch Inventory List
    let response,receivedData;
    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);
            let data = {
                mid: manufacturerId
            }
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/leaseInventory/leasedInventoriesTaken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                setLoading(false);
                setInventoryList(receivedData);
                
            }
            catch(error){
                console.log("Error");
            }
        };
    
        fetchData();
      }, []); 



      const goToReclaimInventories = () => {
        navigate("/man/leaseManagement/reclaimInventories",
        {state: {manufacturerId: manufacturerId,
                manufacturerName: manufacturerName,
                manufacturerLogo: manufacturerLogo}
        }
        )
      }


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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Lease Management </p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Taken Inventories </p></Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div style={{flex:'1',
                                    margin: '55px 40px 0 0',
                                    display: 'flex',
                                    justifyContent: 'right'}}>

                                    <div className="logo" style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center',marginBottom:'10px', padding:'10px' }}>
                                            {/* <CodeSandboxCircleFilled style={{ fontSize: '45px', color: '#08c', display:'flex', alignItems:'center', justifyContent:'center' }} /> */}
                                            <img src = {manufacturerLogo} style={{width:'50px', height:'50px', borderRadius:'50%'}}/>
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
                             <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                                <p style={{color:'#001529',fontSize:'50px',fontFamily:'Kalam', textAlign:'center'}}>Taken Inventories </p>
                                <p style={{fontSize:'20px',fontFamily:'Kalam', color:'purple',textAlign:'center'}}> (Other Manufacturers have bought these inventories that you own)</p>
                            </div>

                            <div style={{display:'flex', alignItems:'end', alignContent:'end'}}>
                                <div onClick={goToReclaimInventories} style={{cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',paddingLeft:'5px' }}>
                                    <ExclamationCircleFilled style={{ fontSize: '50px', color: '#08c', marginLeft: '30px' }} />
                                    <p style={{ fontFamily: 'Kalam', alignSelf: 'center',  marginLeft: '30px' }}>Reclaim Unsold Inventories</p>
                                </div>
                            </div>

                            {/* //*Loading effect   */  }
                            {
                                loading &&
                                <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>
                                    <Spin spinning={loading} size="large">
                                    </Spin>
                                </div>
                            }

                            
                            {
                                inventoryList.length !=0 && inventoryList.map((inventory, index) => {
                                    return <TakenInventoriesCard key = {index} value={
                                        {
                                            inventory: inventory,
                                            manufacturerId: manufacturerId,
                                            manufacturerName: manufacturerName,
                                            manufacturerLogo: manufacturerLogo
                                        }
                                    }/>
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

export default TakenInventories;