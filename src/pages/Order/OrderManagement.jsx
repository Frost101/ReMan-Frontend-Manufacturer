import { Layout, theme, Breadcrumb,  Card, Collapse, Avatar, Spin } from "antd";
import MenuList from "../../components/common/MenuList";
import ProductsInOrderCard from "../../components/Order/ProductsInOrderCard";
const {Content, Sider} = Layout;
const { Panel } = Collapse;
import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { CodeSandboxCircleFilled, HomeOutlined, CaretRightOutlined, PlusCircleFilled, MinusCircleFilled, CheckCircleFilled} from "@ant-design/icons";
import MenuCollapse from "../../components/common/MenuCollapse";
import CustomFooter from "../../components/CustomFooter";
import {useLocation} from 'react-router-dom';

function OrderManagement(){
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

    //* Add product, remove product, update product
    const addProduct = () => {
        navigate("/man/productList/newProduct", {state:{manufacturerId: manufacturerId,
            manufacturerName: manufacturerName,
            manufacturerLogo: manufacturerLogo}});
    }

    //* Fetch Order List
    let response,receivedData;
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let data = {
                manufacturerId: manufacturerId
            }
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/order/manufacturer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                setLoading(false);
                setOrderList(receivedData);
                setShowOrderList(receivedData);
                console.log(receivedData);
            }
            catch(error){
                console.log("Error while fetching categories");
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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Orders</p></Breadcrumb.Item>
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

                                
                                <p style={{color:'#001529',fontSize:'50px',fontFamily:'Kalam',flex:'1'}}>My Orders:</p>
                                <div style={{flex:'1', display:'flex', justifyContent:'center', justifySelf:'right'}}>
                                    
                                   
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
                                        (showOrderList != undefined && showOrderList.length !=0) && showOrderList.orders.map((order, index) => {
                                            return (<Panel
                                                header={
                                                    <>
                                                        <div
                                                            style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            cursor: 'pointer',
                                                            transition: 'background-color 0.3s',
                                                            }}
                                                        >
                                                            <Avatar
                                                            src="https://e7.pngegg.com/pngimages/494/693/png-clipart-logo-shopping-list-design-product-shopping-list-purple-angle-thumbnail.png"
                                                            size={50}
                                                            style={{ marginRight: '10px' }}
                                                            />
                                                            <span style={{ fontFamily: 'Kalam', fontSize: '40px' }}>{order.ShopName}</span>
                                                        </div>
                                                        
                                                        <div
                                                            style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            cursor: 'pointer',
                                                            transition: 'background-color 0.3s',
                                                            }}
                                                        >
                                                            <span style={{ fontFamily: 'Kalam', fontSize: '15px', flex:'2' }}>Order ID: {order.oid}</span>
                                                            <span style={{ fontFamily: 'Kalam', fontSize: '15px', flex:'1' }}>Shop Phone : {order.ShopPhoneNumber}</span>
                                                            <span style={{ fontFamily: 'Kalam', fontSize: '15px', flex:'1' }}>Total Amount : {order.FinalPrice}</span>
                                                            <span style={{ fontFamily: 'Kalam', fontSize: '15px', flex:'1', display:'flex' }}>
                                                                Shipment Status : 
                                                                {
                                                                    order.ShipmentStatus==='Shipped' ? 
                                                                    (
                                                                    <> 
                                                                        Shipped
                                                                        <div
                                                                        style={{
                                                                            width: '10px',
                                                                            height: '10px',
                                                                            borderRadius: '50%',
                                                                            backgroundColor: 'green',
                                                                            marginLeft: '8px',
                                                                            marginTop: '5px'                   
                                                                        }}> </div>
                                                                    </>): order.ShipmentStatus === 'Not Shipped' ?
                                                                    (
                                                                    <>
                                                                        Not Shipped
                                                                        <div
                                                                        style={{
                                                                            width: '10px',
                                                                            height: '10px',
                                                                            borderRadius: '50%',
                                                                            backgroundColor: 'red',
                                                                            marginLeft: '8px',
                                                                            marginTop: '5px'                   
                                                                        }}> </div>
                                                                    </>
                                                                    ):
                                                                    (
                                                                    <>
                                                                        Partially Shipped
                                                                        <div
                                                                        style={{
                                                                            width: '10px',
                                                                            height: '10px',
                                                                            borderRadius: '50%',
                                                                            backgroundColor: 'yellow',
                                                                            marginLeft: '8px',
                                                                            marginTop: '5px'                   
                                                                        }}> </div>
                                                                    </>
                                                                    )
                                                                }
                                                                
                                                            </span>
                                                        </div>
                                                        <div
                                                            style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            cursor: 'pointer',
                                                            transition: 'background-color 0.3s',
                                                            }}
                                                        >
                                                            <span style={{ fontFamily: 'Kalam', fontSize: '15px', flex:'2' }}>Order Date: {processDate(order.OrderDate)}</span>
                                                            <span style={{ fontFamily: 'Kalam', fontSize: '15px', flex:'1' }}>Payment Method : {order.PaymentMethod}</span>
                                                            <span style={{ fontFamily: 'Kalam', fontSize: '15px', flex:'1' }}>Paid Amount : {order.PaidAmount}</span>
                                                            <span style={{ fontFamily: 'Kalam', fontSize: '15px', flex:'1', display:'flex' }}> 
                                                                Delivery Status : 
                                                                {
                                                                    order.DeliveryStatus==='Delivered' ? 
                                                                    (
                                                                    <> 
                                                                        Delivered
                                                                        <div
                                                                        style={{
                                                                            width: '10px',
                                                                            height: '10px',
                                                                            borderRadius: '50%',
                                                                            backgroundColor: 'green',
                                                                            marginLeft: '8px',   
                                                                            marginTop: '5px'                
                                                                        }}> </div>
                                                                    </>): order.DeliveryStatus === 'Not Delivered' ?
                                                                    (
                                                                    <>
                                                                        Not Delivered
                                                                        <div
                                                                        style={{
                                                                            width: '10px',
                                                                            height: '10px',
                                                                            borderRadius: '50%',
                                                                            backgroundColor: 'red',
                                                                            marginLeft: '8px',
                                                                            marginTop: '5px'                   
                                                                        }}> </div>
                                                                    </>
                                                                    ):
                                                                    (
                                                                    <>
                                                                        Partially Delivered
                                                                        <div
                                                                        style={{
                                                                            width: '10px',
                                                                            height: '10px',
                                                                            borderRadius: '50%',
                                                                            backgroundColor: 'yellow',
                                                                            marginLeft: '8px',
                                                                            marginTop: '5px'                   
                                                                        }}> </div>
                                                                    </>
                                                                    )
                                                                }
                                                            </span>
                                                        </div>

                                                    </>
                                                }
                                                key={index}
                                                style={{
                                                  transition: 'background-color 0.3s',
                                                  backgroundColor: 'transparent',
                                                }}
                                                onMouseOver={(e) => {
                                                  e.currentTarget.style.backgroundColor = '#e6f7ff';
                                                  e.currentTarget.style.transform = 'scale(1.02,1.05)';
                                                }}
                                                onMouseOut={(e) => {
                                                  e.currentTarget.style.backgroundColor = 'transparent';
                                                  e.currentTarget.style.transform = 'scale(1,1)';
                                                }}
                                              >
                                                {
                                                    ( order.Products != undefined && order.Products.length != 0) && order.Products.map((product, index) => {
                                                        return (
                                                                <ProductsInOrderCard key = {index} value={
                                                                    {
                                                                        product: product,
                                                                        manufacturerId: manufacturerId,
                                                                        manufacturerName: manufacturerName,
                                                                        manufacturerLogo: manufacturerLogo,
                                                                        oid: order.oid
                                                                    }
                                                                } /> 

                                                                );
                                                    })
                                                }
                                            </Panel>);
                                        }
                                        )
                                    }
                            </Collapse>
                                
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

export default OrderManagement;