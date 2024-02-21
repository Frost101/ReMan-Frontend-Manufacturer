import { Layout, theme, Breadcrumb, Spin, Space, Input, Select, notification, Modal, Avatar } from "antd";
import MenuList from "../../components/common/MenuList";
const {Content, Sider} = Layout;
import { useState, useEffect} from "react";
import { CodeSandboxCircleFilled, HomeOutlined, CheckCircleTwoTone, SearchOutlined,  ShopTwoTone } from "@ant-design/icons";
import MenuCollapse from "../../components/common/MenuCollapse";
import CustomFooter from "../../components/CustomFooter";
import {useLocation} from 'react-router-dom';
import ShiftBatchCard from "../../components/Inventory/ShiftBatchCard";
import { useNavigate } from "react-router-dom";

function AddToMarketPlace(){
    const location = useLocation();
    const navigate = useNavigate();

    const pid = location.state.pid;
    const productName = location.state.productName;
    const manufacturerId = location.state.manufacturerId;
    const manufacturerName = location.state.manufacturerName;
    const manufacturerLogo = location.state.manufacturerLogo;
    const iid = location.state.iid;
    const inventoryName = location.state.inventoryName;
    
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



    const [batchList, setBatchList] = useState([]);
    const [showBatchList, setShowBatchList] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [shiftBatchList, setShiftBatchList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);


   
    let response,receivedData;
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let data = {
                iid : iid,
                pid : pid
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
                setLoading(false);
                setBatchList(receivedData);
                setShowBatchList(receivedData);
            }
            catch(error){
                console.log("Error");
            }

        };
    
        fetchData();
      }, []); 


      const addToBatchList = async(bid) => {
            setShiftBatchList([...shiftBatchList, bid]);
      }


      const removeFromBatchList = async(bid) => {
            setShiftBatchList(shiftBatchList.filter((batch) => batch != bid));
      }


    //* Handle batch search
    const handleBatchSearch = (e) => {
        const searchbid = e.target.value;
        console.log(batchList);


        let filtered = {
            batches: []
        };
        setShowBatchList(filtered);

        if(batchList != undefined && batchList.length != 0){
            //* Filter batch list
            for(let i=0; i<batchList.batches.length; i++) {
                if(batchList.batches[i].bid.includes(searchbid)){
                    filtered.batches.push(batchList.batches[i]);
                }
            }
            setShowBatchList(filtered);
        }
    };


    const showModal = () => {
        if(shiftBatchList.length == 0){

            notification.error({
                message: `No batch selected`,
                duration: 2, //? Duration in seconds
            });
            return;
        }
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleOk = async() => {
        
        let data = {
            bid: shiftBatchList
        }

        let response,receivedData;
        try{
            response = await fetch(import.meta.env.VITE_API_URL+'/batch/addToMarket', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
    
            receivedData = await response.json();
            if(response.status == 200){
                notification.success({
                    message: `Successfully added batch to marketplace`,
                    duration: 1, //? Duration in seconds
                    onClose: () => {
                        console.log("Closed");
                        window.location.reload(true);
                        
                    },
                });
                setModalVisible(false);
                
            }
            else{
                notification.error({
                    message: `Error in adding batch to marketplace`,
                    duration: 2, //? Duration in seconds
                });
                setModalVisible(false);
            }
        }
        catch(error){
            console.log("Error");
        }
        
    };

    
    return (
        <div>


        <Modal
        title={
        <div style={{ fontSize: '30px', fontFamily: 'Kalam', textAlign: 'center', color:'blue' }}>
            Confirm Adding to Marketplace
        </div>}     
        open={modalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        style={{fontFamily: 'Kalam'}}
        >
            
            <div style={{display:'flex',justifyContent:'center', flexDirection: 'column', alignItems: 'center'}}>
                <div>
                    <Avatar icon={<ShopTwoTone />} size={100} style={{color:'blue' ,marginRight: '10px' }} />
                </div>
                <div style={{
                    flex: '1',
                    paddingRight: '10px', // Add some padding to avoid horizontal scrollbar
                    fontFamily: 'Kalam',
                    }}>
                        Following batches will be added to the marketplace: <br />
                        {shiftBatchList.map((batch, index) => {
                            return(
                                <p key={index} style={{fontFamily:'Kalam', fontSize:'15px', color:'red'}}>{batch}</p>
                            );
                        }
                        )}
                </div>
            </div>
        </Modal>


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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Inventory </p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Product</p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Batch</p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Add to Marketplace</p></Breadcrumb.Item>
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
                            
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                                
                                <p style={{flex:'1', color: '#001529', fontSize: '30px', fontFamily: 'Kalam', textAlign:'left' }}>
                                    {inventoryName} <br></br>
                                    <img
                                    src="https://pngimg.com/d/gift_PNG100238.png"
                                    alt="Avatar"
                                    style={{ marginRight: '10px', width: '30px', height: '30px' }}
                                    />
                                    
                                    {productName}
                                </p>
                                <div style={{
                                    flex: '1',
                                    textAlign: 'right',
                                    overflowY: 'auto', // Enable vertical overflow
                                    maxHeight: '100px', // Set a maximum height for scrolling
                                    paddingRight: '10px', // Add some padding to avoid horizontal scrollbar
                                    fontFamily: 'Kalam',
                                    }}>
                                        Selected Batches: <br />
                                        {shiftBatchList.map((batch, index) => {
                                            return(
                                                <p key={index} style={{fontFamily:'Kalam', fontSize:'15px', color:'red'}}>{batch}</p>
                                            );

                                        }
                                        )}
                                </div>

                            </div>

                            <div style={{display:'flex', justifyContent:'center'}}>
                                <p style={{color:'#001529',fontSize:'50px',fontFamily:'Kalam',flex:'1'}}>Select Batches:</p>
                                <div onClick={showModal} style={{flex:'1', display:'flex', justifyContent:'right', justifySelf:'right'}}>
                                    <div style={{cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',paddingLeft:'5px' }}>
                                        <CheckCircleTwoTone  style={{ fontSize: '50px', color: '#08c', marginLeft: '30px' }} />
                                        <p style={{ fontFamily: 'Kalam', alignSelf: 'center',  marginLeft: '30px' }}>Confirm Adding to Marketplace</p>
                                    </div>
                                </div>
                            </div>


                            <div style={{flex:'3', display:'flex', justifyContent:'right', justifySelf:'left'}}>
                                    <div style={{flex:'1', justifyContent:'center', justifySelf:'left'}}>
                                        <Input
                                            placeholder="Enter Batch ID"
                                            style={{
                                                display:'flex',
                                                borderRadius: '8px', // Set the border radius for rounded corners
                                                border: '2px solid blue', // Set the blue-colored border
                                                fontFamily:'Kalam',
                                                width:'80%'
                                            }}
                                            prefix={
                                                <Space>
                                                  <SearchOutlined style={{ color: 'blue' }} />
                                                </Space>
                                            }
                                            onChange={handleBatchSearch}
                                        />
                                    </div>
                                    <div style={{flex:'1'}}>

                                    </div>
                            </div>


                            {
                                loading &&
                                <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>
                                    <Spin spinning={loading} size="large">
                                    </Spin>
                                </div>
                            }
                        
                            {
                                (showBatchList != undefined && showBatchList.length != 0) && showBatchList.batches.map((batch, index) => {
                                   
                                       return(

                                        batch.MarketStatus ? null : 
                                        <ShiftBatchCard key = {batch.bid} value={{
                                            batch : batch,
                                            addToBatchList : addToBatchList,
                                            removeFromBatchList : removeFromBatchList,
                                            selectedStatus : shiftBatchList.includes(batch.bid)
                                        }} />
                                        
                                       );
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

export default AddToMarketPlace;