import { Layout, theme, Breadcrumb, Select, Collapse, Avatar, Spin } from "antd";
import MenuList from "../../components/common/MenuList";
import ProductsInOrderCard from "../../components/Order/ProductsInOrderCard";
const {Content, Sider} = Layout;
const { Panel } = Collapse;
import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { CodeSandboxCircleFilled, HomeOutlined, CaretRightOutlined, CloseCircleTwoTone} from "@ant-design/icons";
import MenuCollapse from "../../components/common/MenuCollapse";
import CustomFooter from "../../components/CustomFooter";
import UnreadNotificationCard from "../../components/Notification/UnreadNotificationCard";
import {useLocation} from 'react-router-dom';

function UnreadNotification(){
    const location = useLocation();
    const navigate = useNavigate();

    const manufacturerId = location.state.manufacturerId;
    const manufacturerName = location.state.manufacturerName;
    const manufacturerLogo = location.state.manufacturerLogo;
    
    //* Menu Collapse ...
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


    //* Process Date to "dd/mm/yyyy"
    const processDate = (originalDate) => {
        
        originalDate = new Date(originalDate);
        const day = originalDate.getUTCDate().toString().padStart(2, '0');
        const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const year = originalDate.getUTCFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }


    //* Set order list
    const [orderList, setOrderList] = useState([]);
    const [showOrderList, setShowOrderList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [notification, setNotification] = useState([]);
    const [showNotification, setShowNotification] = useState([]);
    const [filter, setFilter] = useState("unread");

    //* Add product, remove product, update product
    const addProduct = () => {
        navigate("/man/productList/newProduct", {state:{manufacturerId: manufacturerId,
            manufacturerName: manufacturerName,
            manufacturerLogo: manufacturerLogo}});
    }

   
    let response,receivedData;
    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);
            let data = {
                mid: manufacturerId
            }

            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/notification/unreadNotificationsManufacturer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    });
            
                    receivedData = await response.json();
                    setLoading(false);
                    setNotification(receivedData.notifications);
                    setShowNotification(receivedData.notifications);
            }
            catch(error){
                console.log("Error while fetching notifications");
            }


            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/notification/updateNotificationStatusManufacturer', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    });
            
                    receivedData = await response.json();
            }
            catch(error){
                console.log("Error while updating notifications");
            }

        };
    
        fetchData();
      }, []); 


      const handleFilter = async(value) => {
        setFilter(value);
        let data = {
            mid: manufacturerId
        }
        if(value === "unread"){
            setLoading(true);
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/notification/unreadNotificationsManufacturer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    });
            
                    receivedData = await response.json();
                    setLoading(false);
                    setNotification(receivedData.notifications);
                    setShowNotification(receivedData.notifications);
            }
            catch(error){
                console.log("Error while fetching notifications");
            }
        }
        else{
            setLoading(true);
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/notification/allNotificationsManufacturer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    });
            
                    receivedData = await response.json();
                    setLoading(false);
                    setNotification(receivedData.notifications);
                    setShowNotification(receivedData.notifications);
            }
            catch(error){
                console.log("Error while fetching notifications");
            }
        }
      }



      const deleteAllNotifications = async() => {
        let data = {
            mid: manufacturerId
        }
        setLoading(true);
        try{
            response = await fetch(import.meta.env.VITE_API_URL+'/notification/deleteAllNotificationManufacturer', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                setLoading(false);
                setNotification([]);
                setShowNotification([]);

        }
        catch(error){
            console.log("Error while deleting notifications");
        }
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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Notification</p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Unread</p></Breadcrumb.Item>
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

                            <div style={{display:'flex', justifyContent:'center'}}>
                                <p style={{color:'#001529',fontSize:'50px',fontFamily:'Kalam'}}>My Notifications</p>
                            </div>
                            <div style={{display:'flex', justifyContent:'center'}}>

                                <Select onChange={handleFilter} defaultValue="unread" style={{flex:'1', marginTop:'2%',fontFamily:'Kalam', border: '2px solid blue', borderRadius: '8px', width:'80%'}}>
                                        <Select.Option value="unread"   key={"0"} style={{fontFamily:'Kalam'}}>Unread Notification</Select.Option>
                                        <Select.Option value="all"  key={"1"} style={{fontFamily:'Kalam'}}>All Notification</Select.Option>
                                </Select>
                                <div style={{flex:'1', display:'flex', justifyContent:'right', justifySelf:'right'}}>
                                    <div onClick={deleteAllNotifications} style={{cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',paddingLeft:'5px' }}>
                                        <CloseCircleTwoTone   style={{ fontSize: '50px', color: '#08c', marginLeft: '30px' }} />
                                        <p style={{ fontFamily: 'Kalam', alignSelf: 'center',  marginLeft: '30px' }}>Clear All</p>
                                    </div>
                                </div>
                                
                            </div>



                            {/* //*Loading effect while fetching or filtering batches */  }
                            {
                                loading &&
                                <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>
                                    <Spin spinning={loading} size="large">
                                    </Spin>
                                </div>
                            }


                             {/* <Card title="Collapsible Card"> */}
                             <Collapse accordion expandIconPosition="start" expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
                                    {
                                        (showNotification != undefined && showNotification.length !=0) && showNotification.map((notification, index) => {
                                            return (
                                                <UnreadNotificationCard key={index} value={
                                                    {
                                                        notification: notification,
                                                        manufacturerName: manufacturerName,
                                                        manufacturerId: manufacturerId,
                                                        manufacturerLogo: manufacturerLogo
                                                    }
                                                } />

                                                
                                            );
                                        }
                                        )
                                    }
                                    
                            </Collapse>
                                    {
                                        (showNotification == undefined || (showNotification.length == 0)) &&
                                        <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>
                                            <p style={{fontFamily:'Kalam', fontSize:'20px', color:'purple'}}>No Notifications to Show</p>
                                        </div>
                                    }
                                
                            {/* </Card> */}
                            
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

export default UnreadNotification;