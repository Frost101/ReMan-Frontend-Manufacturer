import { Layout, theme, Breadcrumb,  Card, Collapse, Avatar, Select, Spin } from "antd";
import MenuList from "../../components/common/MenuList";
const {Content, Sider} = Layout;
const { Panel } = Collapse;
import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { CodeSandboxCircleFilled, HomeOutlined, CaretRightOutlined, PlusCircleFilled, MinusCircleFilled, CheckCircleFilled} from "@ant-design/icons";
import MenuCollapse from "../../components/common/MenuCollapse";
import CustomFooter from "../../components/CustomFooter";
import {useLocation} from 'react-router-dom';
import BatchesInOrderCard from "../../components/Order/BatchesInOrderCard";

function OrderDispatch(){
    const location = useLocation();
    const navigate = useNavigate();

    const manufacturerId = location.state.manufacturerId;
    const manufacturerName = location.state.manufacturerName;
    const manufacturerLogo = location.state.manufacturerLogo;
    const oid = location.state.oid;
    const pid = location.state.pid;
    
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
    const [inventoryList, setInventoryList] = useState([]);                 //? Inventory List are fetched and stored here
    const [selectedInventory, setSelectedInventory] = useState("default");  //? Selected Inventory from the dropdown
    const [batchList, setBatchList] = useState([]);                         //? Batch List are fetched and stored here of a selected inventory
    const [showBatchList, setShowBatchList] = useState([]);                 //? Batch List are shown here of a selected inventory
    const [loading, setLoading] = useState(false);                          //? Set loading effect while fetching or filtering batches
    const [productInfo, setProductInfo] = useState([]);                    //? Product Info are fetched and stored here


    //* Set selected inventory
    const handleInventoryChange = async(value) => {
        setSelectedInventory(value);

        setLoading(true);
        
        //* Fetch batch list of that inventory
        let response,receivedData;
        let data = {
            iid: value,
            pid: pid
        }
        try{
            response = await fetch(import.meta.env.VITE_API_URL+'/batch/inventoryBatchList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
    
            receivedData = await response.json();
            setBatchList(receivedData);
            setShowBatchList(receivedData);
            setLoading(false);              //? Loading effect is removed
            console.log(receivedData);
        }
        catch(error){
            console.log("Error while fetching batches from inventories");
        }
    }


    //* Fetch Order List
    let response,receivedData;
    useEffect(() => {
        const fetchData = async () => {
            let data = {
                manufacturerId: manufacturerId,
                oid: oid,
                pid: pid
            }
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/order/orderedProductInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                setProductInfo(receivedData.productInfo);
                console.log(receivedData.productInfo);
                
            }
            catch(error){
                console.log("Error while fetching ordered Product Info");
            }




            //* Fetch Inventory List
            data = {
                pid: pid
            }
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/products/getInventories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                setInventoryList(receivedData);
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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Orders</p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Dispatch</p></Breadcrumb.Item>
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
                            
                            {/* //*Ordered Product Info */}
                            {
                                (productInfo != undefined && productInfo.length != 0) &&

                                <div style={{display:'flex', justifyContent:'left'}}>
                                    <div style={{}}>
                                        <p style={{color:'blue',fontSize:'20px',fontFamily:'Kalam'}}> 
                                        Product Name: {productInfo.ProductName} <br/>
                                        Ordered Quantity: {productInfo.Quantity} <br/>
                                        Shipped Quantity: {productInfo.ShippedQuantity} <br/>
                                        </p>
                                        
                                    </div>
                                </div>
                            }

                            <div style={{display:'flex', justifyContent:'center'}}>
                                <p style={{color:'#001529',fontSize:'50px',fontFamily:'Kalam',flex:'1'}}> Dispatch Orders:</p>
                                <div style={{flex:'3', display:'flex', justifyContent:'center', justifySelf:'right', marginTop:'20px'}}>
                                    <div style={{flex:'1', display:'flex', justifyContent:'center', justifySelf:'right'}}>
                                        <Select defaultValue="default" onChange={handleInventoryChange} style={{fontFamily:'Kalam', border: '1px solid blue', borderRadius: '8px', width:'60%'}}>
                                            <Select.Option value="default"  disabled key={"a"}>Select Inventories</Select.Option>
                                            {
                                                (inventoryList != undefined && inventoryList.length != 0) &&
                                                inventoryList.inventories.map((inventory, index) => {
                                                    return(
                                                        <Select.Option value={inventory.iid} style={{fontFamily:'Kalam'}} key={index}>{inventory.InventoryName}</Select.Option>
                                                    )
                                                }
                                                )
                                            }
                                        </Select>
                                    </div>
                                </div>
                            </div>


                                                          
                            {/* //*If no inventory is selected then */}
                            {
                                selectedInventory == "default" &&
                                <div style={{display:'flex', justifyContent:'center'}}>
                                    <div style={{}}>
                                        <p style={{color:'red',fontSize:'30px',fontFamily:'Kalam'}}> Please select an inventory</p>
                                    </div>
                                </div>
                            }

                            {/* //*Loading effect while fetching or filtering batches */  }
                            {
                                loading &&
                                <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>
                                    <Spin spinning={loading} size="large">
                                    </Spin>
                                </div>
                            }

                            {
                                (showBatchList != undefined && showBatchList.length != 0) &&
                                showBatchList.batches.map((batch, index) => {
                                    return(
                                        <BatchesInOrderCard key={index} value={
                                            {
                                                batch: batch,
                                                manufacturerId: manufacturerId,
                                                manufacturerLogo: manufacturerLogo,
                                                manufacturerName: manufacturerName,
                                                oid: oid,
                                                pid: pid,
                                                totalQuantity: productInfo.Quantity,
                                                shippedQuantity: productInfo.ShippedQuantity
                                            }
                                        } />
                                    )
                                })
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

export default OrderDispatch;