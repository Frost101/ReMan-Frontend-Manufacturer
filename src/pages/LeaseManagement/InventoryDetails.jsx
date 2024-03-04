import { Layout, theme,InputNumber, Breadcrumb,notification, Spin, Form, Card, Row, Col, Divider, Modal,Input, Avatar, Button } from "antd";
import MenuList from "../../components/common/MenuList";
const {Content, Sider} = Layout;
import { useState, useEffect} from "react";
import { CodeSandboxCircleFilled, HomeOutlined,ReconciliationFilled,  CheckCircleTwoTone} from "@ant-design/icons";
import MenuCollapse from "../../components/common/MenuCollapse";
import CustomFooter from "../../components/CustomFooter";
import {useLocation} from 'react-router-dom';
import BatchesInInventoryCard from "../../components/Inventory/BatchesInInventoryCard";
import { useNavigate } from "react-router-dom";


function InventoryDetails(){
    const location = useLocation();
    const navigate = useNavigate();

    const inventory = location.state.inventory;
    const iid = inventory.iid;
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
    const [modalVisible, setModalVisible] = useState(false);
    const [rentDays, setRentDays] = useState(0);



   
    let response,receivedData;
    useEffect(() => {
        const fetchData = async () => {
            
        };
    
        fetchData();
      }, []); 
  


    const showModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };


    

    const onFinish = async (values) => {
        setRentDays(values.Duration);

        const data = {
            rid: inventory.rid,
            iid: inventory.iid,
            Duration: values.Duration,
            OwnerID: inventory.OwnerID,
            OwnedToID: manufacturerId,
        }

        let response,receivedData;
        try {
            setLoading(true);
            response = await fetch(import.meta.env.VITE_API_URL+'/payment/paymentOnlineForTakingLease', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            receivedData = await response.json();
            setLoading(false);
            localStorage.setItem('manufacturerId', manufacturerId);
            localStorage.setItem('manufacturerLogo', manufacturerLogo);
            localStorage.setItem('manufacturerName',manufacturerName);
            window.location.href=receivedData.url;
        } catch (err) {
            console.log(err);
        }
    }

    
    return (
        <div>



<Modal
        title={
        <div style={{ fontSize: '30px', fontFamily: 'Kalam', textAlign: 'center', color:'blue' }}>
            Lease Confirmation
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
                    <p style={{fontSize:'20px', color:'blue'}}>Per Day Rent: {inventory.PerDayRent}</p>
                    <p style={{fontSize:'20px', color:'blue'}}>You have to pay: {rentDays * inventory.PerDayRent} taka </p>
                </div>
                </div>
                    
                
                <div style={{ display:'flex', justifyContent:'center', width:'100%', justifySelf:'right'}}>
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
                                    onChange={(value) => {
                                        setRentDays(value);
                                    
                                    }}
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
                                    Take Lease
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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Lease Management</p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Inventory Marketplace </p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Details </p></Breadcrumb.Item>
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
                                <p style={{color:'#001529',fontSize:'50px',fontFamily:'Kalam',flex:'1'}}> Description:</p>
                                <div style={{flex:'1', display:'flex', justifyContent:'right', justifySelf:'right'}}>
                                    
                                    <div onClick={showModal} style={{cursor:'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',paddingLeft:'10px' }}>
                                        <CheckCircleTwoTone  style={{cursor: 'pointer', fontSize: '50px', color: '#08c', marginLeft: '30px' }} />
                                        <p style={{ fontFamily: 'Kalam', alignSelf: 'center', marginLeft: '30px'}}>Take Lease</p>
                                    </div>

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

                            <Card 
                            hoverable
                            >
                                <Row gutter={16}>
                                    <Col span={6}>

                                    <img src={inventory.Image} 
                                    alt={inventory.InventoryName}
                                     style={{ width: '100%', height: 'auto' }}
                                      />

                                    </Col>
                                    <Col span={18}>


                                    <Divider orientation="left" style={{ color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                        Owner Info & Name
                                    </Divider>
                                    
                                    <div
                                        style={{fontFamily:'Kalam', fontSize:'20px', color:'#001529', textAlign:'left'}}
                                    >
                                        <p><strong style={{color:'blue'}}>Inventory Name:</strong> {inventory.InventoryName}</p>
                                        <p><strong style={{color:'blue'}}>Original Owner Name:</strong> {inventory.OwnerName} </p>
                                        <p><strong style={{color:'blue'}}>Owner Phone:</strong> {inventory.OwnerPhoneNumber} </p>
                                        <p><strong style={{color:'blue'}}>Owner Email:</strong> {inventory.OwnerEmail} </p>
                                        
                                        <br></br>
                                    </div>

                                    <Divider orientation="left" style={{ color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                        Inventory Details Section
                                    </Divider>

                                    <div 
                                        style={{fontFamily:'Kalam', fontSize:'20px', color:'#001529', textAlign:'left'}}
                                    >
                                        <p><strong style={{color:'blue'}}>Capacity:</strong> {inventory.Capacity} sqft</p>
                                        <p><strong style={{color:'blue'}}>Inventory Type:</strong> {inventory.Type}</p>
                                        <p><strong style={{color:'blue'}}>Details:</strong> {inventory.Details}</p>
                                        <br></br>
                                    </div>
                                    
                                    <Divider orientation="left" style={{ color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                        Lease Details Section
                                    </Divider>

                                    <div
                                        style={{fontFamily:'Kalam', fontSize:'20px', color:'#001529', textAlign:'left'}}
                                    >
                                        <p><strong style={{color:'blue'}}>Free From:</strong> {new Date(inventory.FreeFrom).toLocaleDateString()}</p>
                                        <p><strong style={{color:'blue'}}>Free Till:</strong> {new Date(inventory.FreeTill).toLocaleDateString()}</p>
                                        <p><strong style={{color:'blue'}}>Per Day Rent:</strong> {inventory.PerDayRent} taka</p>
                                        <br></br>
                                    </div>

                                    <Divider orientation="left" style={{ color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                        Address Section
                                    </Divider>
                                    
                                    <div
                                        style={{fontFamily:'Kalam', fontSize:'20px', color:'#001529', textAlign:'left'}}
                                    >
                                        <p><strong style={{color:'blue'}}>Address:</strong> {`${inventory.HouseNumber}, ${inventory.Street}, ${inventory.zip}, ${inventory.Thana}, ${inventory.Division}`}</p>
                                        <p><strong style={{color:'blue'}}>Address Details:</strong> {inventory.AddressDetails}</p>
                                    </div>
                                    
                                    
                                    </Col>
                                </Row>
                                </Card>

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

export default InventoryDetails;