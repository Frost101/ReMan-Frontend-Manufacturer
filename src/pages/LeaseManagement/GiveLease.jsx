import { Layout, theme, Breadcrumb,InputNumber, Spin, Space, Input, Select, notification, Modal, Avatar, Button, Form } from "antd";
import MenuList from "../../components/common/MenuList";
const {Content, Sider} = Layout;
import { useState, useEffect} from "react";
import { CodeSandboxCircleFilled, HomeOutlined, CheckCircleTwoTone, SearchOutlined, ReconciliationFilled, PlusOutlined, MinusOutlined} from "@ant-design/icons";
import MenuCollapse from "../../components/common/MenuCollapse";
import CustomFooter from "../../components/CustomFooter";
import {useLocation} from 'react-router-dom';
import ShiftBatchCard from "../../components/Inventory/ShiftBatchCard";
import GiveLeaseCard from "../../components/LeaseManagement/GiveLeaseCard";
import { useNavigate } from "react-router-dom";

function GiveLease(){
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
    const [value, setValue] = useState(0);
    const [filter, setFilter] = useState('all');

    const [selectedInventoryNames, setSelectedInventoryNames] = useState([]);
    const [selectedInventoryIds, setSelectedInventoryIds] = useState([]);
    const [emptyInventoryList, setEmptyInventoryList] = useState([]);
    const [showEmptyInventoryList, setShowEmptyInventoryList] = useState([]);

   
    let response,receivedData;
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            //* Fetch Empty Inventory List to give lease
            let data = {
                mid : manufacturerId
            }

            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/leaseInventory/emptyInventoryList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                if(response.status == 200){
                    setEmptyInventoryList(receivedData);
                    setShowEmptyInventoryList(receivedData);
                    console.log(receivedData);
                    setLoading(false);
                }
                else{
                    notification.error({
                        message: `Error in fetching batch list`,
                        duration: 2, //? Duration in seconds
                    });
                    setLoading(false);
                }
            }
            catch(error){
                console.log("Error");
            }
           
        };
    
        fetchData();
      }, []); 


      
    const addToSelectedInventoryList = async(iid, inventoryName) => {
        setSelectedInventoryIds([...selectedInventoryIds, iid]);
        setSelectedInventoryNames([...selectedInventoryNames, inventoryName]);
    }

    const removeFromSelectedInventoryList = async(iid, inventoryName) => {
        setSelectedInventoryIds(selectedInventoryIds.filter((inventory) => inventory != iid));
        setSelectedInventoryNames(selectedInventoryNames.filter((inventory) => inventory != inventoryName));
    }

      const addToBatchList = async(bid) => {
            setShiftBatchList([...shiftBatchList, bid]);
      }


      const removeFromBatchList = async(bid) => {
            setShiftBatchList(shiftBatchList.filter((batch) => batch != bid));
      }



    const handleInventorySearch = (e) => {
        const searchInventoryName = e.target.value;
        let filtered = [];
        setShowEmptyInventoryList(filtered);

        if(emptyInventoryList != undefined && emptyInventoryList.length != 0){
            //* Filter inventory list
            for(let i=0; i<emptyInventoryList.length; i++) {
                //* Case insensitive search
                if(emptyInventoryList[i].InventoryName.toLowerCase().includes(searchInventoryName.toLowerCase())){
                    filtered.push(emptyInventoryList[i]);
                }
            }
            setShowEmptyInventoryList(filtered);
        }
    }


    const showModal = () => {
        if(selectedInventoryNames.length == 0){

            notification.error({
                message: `No inventory selected`,
                duration: 2, //? Duration in seconds
            });
            return;
        }
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

        
      
    

    const onFinish = async(values) => {
        console.log('Success:', values);
        let data = {
            mid : manufacturerId,
            iid : selectedInventoryIds[0],
            Duration : values.Duration,
            PerDayRent : values.PerDayRent,
            Details : values.Details
        }

        try{
            response = await fetch(import.meta.env.VITE_API_URL+'/leaseInventory/giveLease', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
    
            receivedData = await response.json();
            if(response.status == 200){
                setModalVisible(false);
                notification.success({
                    message: `Lease given successfully`,
                    duration: 2, //? Duration in 
                    onClose: () => {
                        window.location.reload(true);
                    }
                });
                
                
            }
            else{
                notification.error({
                    message: `Error in giving lease`,
                    duration: 2, //? Duration in seconds
                });
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
            Confirm Lease
        </div>}     
        open={modalVisible}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: 'none' } }}
        style={{fontFamily: 'Kalam'}}
        >
            
            <div style={{display:'flex',justifyContent:'center', flexDirection: 'column', alignItems: 'center'}}>
                <div>
                    <Avatar icon={<ReconciliationFilled />} size={100} style={{color:'blue' ,marginRight: '10px' }} />
                </div>
                <div >
                <div style={{
                    flex: '1',
                    paddingRight: '10px', // Add some padding to avoid horizontal scrollbar
                    fontFamily: 'Kalam',
                    }}>
                        Following Inventories will be added to MarketPlace for Lease : <br />
                        {selectedInventoryNames.map((name, index) => {
                            return(
                                <p key={index} style={{fontFamily:'Kalam', fontSize:'15px', color:'red'}}>{name}</p>
                            );
                        }
                        )}
                </div>
                </div>
                    
                
                <div style={{ display:'flex', justifyContent:'center'}}>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                        >
                            <h3 style={{fontFamily:'Kalam', alignContent:'left', paddingLeft:'10%'}}>Lease Duration(in days):</h3>
                            <Form.Item
                                name="Duration"
                                rules= {[
                                    {
                                        required: true,
                                        type: 'number',
                                        message:
                                            'Enter a valid duration in days!',
                                    },
                                ]}
                                style={{textAlign:'center'}}
                            >
                                <InputNumber
                                    min={0}
                                    placeholder="Duration(in days)"
                                    
                                    style={{
                                        width: '80%',
                                        margin: 'auto',
                                        border: '2px solid blue',    // Set the border color to blue
                                        borderRadius: '8px',        // Set border-radius for rounded corners
                                      }}

                                />
                            </Form.Item>


                            <h3 style={{fontFamily:'Kalam', alignContent:'left', paddingLeft:'10%'}}>Per Day Rent:</h3>
                            <Form.Item
                                name="PerDayRent"
                                rules= {[
                                    {
                                        required: true,
                                        type: 'number',
                                        message:
                                            'Enter a valid rent!',
                                    },
                                ]}
                                style={{textAlign:'center'}}
                            >
                                <InputNumber
                                    min={0}
                                    placeholder="rent(in taka)"
                                  
                                    style={{
                                        width: '80%',
                                        margin: 'auto',
                                        border: '2px solid blue',    // Set the border color to blue
                                        borderRadius: '8px',        // Set border-radius for rounded corners
                                      }}

                                />
                            </Form.Item>

                            <h3 style={{fontFamily:'Kalam', alignContent:'left', paddingLeft:'10%'}}>Details/Note:</h3>
                            <Form.Item
                                name="Details"
                                rules= {[
                                    {
                                        required: true,
                                        message:
                                            'Enter a valid text!',
                                    },
                                ]}
                                style={{textAlign:'center'}}
                            >
                                <Input.TextArea
                                   
                                    placeholder="Ex:It is for seasonal foods and fresh storage"
                                   
                                    style={{
                                        width: '80%',
                                        margin: 'auto',
                                        border: '2px solid blue',    // Set the border color to blue
                                        borderRadius: '8px',        // Set border-radius for rounded corners
                                      }}

                                />
                            </Form.Item>
                            <Form.Item>
                                <Button block type="primary" htmlType="submit" style={{width:'100%', fontFamily:'Kalam', textAlign:'center'}}>
                                    Confirm Lease
                                </Button>
                            </Form.Item>

                        </Form>
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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Lease Management </p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Give Lease</p></Breadcrumb.Item>
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
                                <div style={{
                                    flex: '1',
                                    textAlign: 'right',
                                    overflowY: 'auto', // Enable vertical overflow
                                    maxHeight: '100px', // Set a maximum height for scrolling
                                    paddingRight: '10px', // Add some padding to avoid horizontal scrollbar
                                    fontFamily: 'Kalam',
                                    }}>
                                        Selected Inventories: <br />
                                        {selectedInventoryNames.map((name, index) => {
                                            return(
                                                <p key={index} style={{fontFamily:'Kalam', fontSize:'15px', color:'red'}}>{name}</p>
                                            );

                                        }
                                        )}
                                </div>

                            </div>

                            <div style={{display:'flex', justifyContent:'center'}}>
                                <p style={{color:'#001529',fontSize:'50px',fontFamily:'Kalam',flex:'1'}}>Select Inventories For Lease:</p>
                                <div onClick={showModal} style={{flex:'1', display:'flex', justifyContent:'right', justifySelf:'right'}}>
                                    <div style={{cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',paddingLeft:'5px' }}>
                                        <CheckCircleTwoTone  style={{ fontSize: '50px', color: '#08c', marginLeft: '30px' }} />
                                        <p style={{ fontFamily: 'Kalam', alignSelf: 'center',  marginLeft: '30px' }}>Give Lease </p>
                                    </div>
                                </div>
                            </div>


                            <div style={{flex:'1', display:'flex', justifyContent:'right', justifySelf:'left', width:'50%'}}>
                                    <div style={{flex:'1', justifyContent:'center', justifySelf:'left'}}>
                                        <Input
                                            placeholder="Enter Inventory Name"
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
                                            onChange={handleInventorySearch}
                                        />
                                    </div>
                            </div>

                            {/* //*Loading effect while  */  }
                            {
                                loading &&
                                <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>
                                    <Spin spinning={loading} size="large">
                                    </Spin>
                                </div>
                            }
                        

                            {
                                (showEmptyInventoryList != undefined && showEmptyInventoryList.length != 0) && showEmptyInventoryList.map((inventory, index) => {
                                      
                                        return(
                                         <GiveLeaseCard key = {inventory.iid} value={{
                                              inventory : inventory,
                                              addToSelectedInventoryList : addToSelectedInventoryList,
                                              removeFromSelectedInventoryList : removeFromSelectedInventoryList,
                                              selectedStatus : selectedInventoryIds.includes(inventory.iid)
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

export default GiveLease;