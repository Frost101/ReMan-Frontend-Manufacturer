import { Layout, theme,InputNumber, Breadcrumb,notification, Spin, Form, Card, Row, Col, Divider, Modal,Input, Avatar, Button } from "antd";
import MenuList from "../../components/common/MenuList";
const {Content, Sider} = Layout;
import { useState, useEffect} from "react";
import { CodeSandboxCircleFilled, HomeOutlined,ReconciliationFilled,  CheckCircleTwoTone} from "@ant-design/icons";
import MenuCollapse from "../../components/common/MenuCollapse";
import CustomFooter from "../../components/CustomFooter";
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ProductRating from "../../components/DataAnalytics/ProductRating";
import TotalRevenue from "../../components/DataAnalytics/TotalRevenue";
import TotalQuantity from "../../components/DataAnalytics/TotalQuantity";


function DataAnalytics(){
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
    const [profile, setProfile] = useState([]);
    const [rating, setRating] = useState([]);
    const [revenue, setRevenue] = useState([]);
    const [quantity, setQuantity] = useState([]);



   
    let response,receivedData;
    useEffect(() => {
        const fetchData = async () => {
            let data = {
                manufacturerId: manufacturerId
            }
            setLoading(true);
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/manufacturer/info',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                receivedData = await response.json();
                console.log(receivedData);
                setLoading(false);
                setProfile(receivedData);
            }
            catch(error){
                console.log(error);
                setLoading(false);
            }




            data = {
                manufacturerId: manufacturerId
            }
            setLoading(true);
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/products/ProductRatingbyManufacturer',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                receivedData = await response.json();
                console.log("Rating");
                console.log(receivedData);
                setLoading(false);
                setRating(receivedData.data);
            }
            catch(error){
                console.log(error);
                setLoading(false);
            }





            data = {
                manufacturerId: manufacturerId
            }
            setLoading(true);
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/products/ProductsOrderedbyManufacturer',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                receivedData = await response.json();
                console.log(receivedData);
                setLoading(false);
                setQuantity(receivedData.data);
            }
            catch(error){
                console.log(error);
                setLoading(false);
            }



            data = {
                manufacturerId: manufacturerId
            }
            setLoading(true);
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/products/ProductsRevenuebyManufacturer',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                receivedData = await response.json();
                console.log(receivedData);
                setLoading(false);
                setRevenue(receivedData.data);
            }
            catch(error){
                console.log(error);
                setLoading(false);
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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Data Analytics </p></Breadcrumb.Item>
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
                                <p style={{color:'#001529',fontSize:'50px',fontFamily:'Kalam',textAlign:'center'}}> Data Analytics</p>
                                
                            </div>

                            {/* //*Loading effect while  */  }
                            {
                                loading &&
                                <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>
                                    <Spin spinning={loading} size="large">
                                    </Spin>
                                </div>
                            }

                            <Divider orientation="left" style={{ color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                    Product Rating
                            </Divider>
                            
                            {
                                rating.length != 0 &&
                                
                                    <ProductRating value={rating}/>
                                
                            }
                            


                            <Divider orientation="left" style={{ color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                    Total Revenue
                            </Divider>

                            {
                                revenue.length != 0 &&
                                
                                    <TotalRevenue value={revenue}/>
                                
                            }

                            

                            <Divider orientation="left" style={{ color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                    Total Sold Quantity
                            </Divider>

                            {
                                quantity.length != 0 &&
                                
                                    <TotalQuantity value={quantity}/>
                                
                            
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

export default DataAnalytics;