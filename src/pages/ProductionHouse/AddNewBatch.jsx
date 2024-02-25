import { Layout, theme, Breadcrumb, Upload, Button, Form,Cascader,Space,
    DatePicker,
    Input,
    InputNumber,
    Mentions,
    Select,
    TreeSelect,
    notification,
    Divider } from "antd";
import MenuList from "../../components/common/MenuList";
const {Content, Sider} = Layout;
import { useState, useEffect} from "react";
import { CodeSandboxCircleFilled, HomeOutlined, CloseCircleOutlined} from "@ant-design/icons";
import MenuCollapse from "../../components/common/MenuCollapse";
import CustomFooter from "../../components/CustomFooter";
import {useLocation, useNavigate} from 'react-router-dom';
import ImgCrop from 'antd-img-crop';
import moment from 'moment';

const { RangePicker } = DatePicker;


import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    deleteObject,
    getStorage
} from "firebase/storage";
import { storage } from "../../firebase";
import {v4} from 'uuid';

function AddNewBatch(){
    const location = useLocation();
    const navigate = useNavigate();

    const manufacturerId = location.state.manufacturerId;
    const manufacturerName = location.state.manufacturerName;
    const manufacturerLogo = location.state.manufacturerLogo;
    const pid = location.state.pid;
    const phid = location.state.phid;
    const productName = location.state.productName;
    const productionHouseName = location.state.productionHouseName;
    
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


    
    
    useEffect(() => {
        const fetchData = async () => {
            
        };
    
        fetchData();
      }, []); 

    

      const onFinish = async (values) => { 
            console.log(values);

            //* Calculate expiry date from year, month and day
            let expiryDateTmp = moment(values.manufacturingDate).add(values.year, 'years').add(values.month, 'months').add(values.day, 'days');
           
             
            let manufacturingDate = values.manufacturingDate.toDate() ;
            let expiryDate = expiryDateTmp.toDate();

            let data = {
                manufacturingDate: manufacturingDate,
                expiryDate: expiryDate,
                quantity: values.quantity,
                pid: pid,
                phid: phid,
            };
            let response, receivedData;
            
            try {
                response = await fetch(import.meta.env.VITE_API_URL+'/batch/newBatch', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                receivedData = await response.json();
                console.log(receivedData);
                if (response.status === 201) {
                    notification.success({
                        message: 'Batch Added successfully',
                        duration: 1, //? Duration in seconds
                        onClose: () => {
                            window.location.reload(true);
                            
                        },
                    });
                } else {
                    notification.error({
                        message: 'Failed to add Batch',
                        duration: 1, 
                    });
                }
            }
            catch (err) {
                notification.error({
                    message: 'Failed to add Batch',
                    description: 'Something went wrong while adding the batch',
                });
            }
      };


      const disabledDate = (current) => {
        //* Disable dates after today
        return current && current > moment().endOf('day');
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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Production House</p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Product</p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Batch</p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Add new Batch</p></Breadcrumb.Item>
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
                                overflow: 'initial',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',  
                                justifyContent: 'flex-start',  
                            }}
                            >
                            <p style={{ color: '#001529', fontSize: '50px', fontFamily: 'Kalam', textAlign: 'center', paddingBottom:"0px", marginBottom:'0px' }}>
                                Add A New Batch
                            </p>
                            <span style={{  fontSize: '30px', color:'purple', fontFamily: 'Kalam', textAlign: 'center' }}>
                                    <img
                                    src="https://pngimg.com/d/gift_PNG100238.png"
                                    alt="Avatar"
                                    style={{ marginRight: '10px', width: '50px', height: '50px' }}
                                    />
                                {productName}  <br></br>
                                {productionHouseName}
                            </span>
                           
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}>
                                <Form
                                name="login-form"
                                labelCol={{span:8}}
                                initialValues={{  }}
                                onFinish={onFinish}
                                style={{
                                    padding: '16px',          // Add padding for better appearance
                                    width: '100%', 
                                }}
                                 >

                                <Divider orientation="left" style={{ width:'80%', color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                    Batch Details Section
                                </Divider>

                                <div style={{width: '100%', display: 'flex', flexDirection:'column' ,justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{display:'flex', width:'80%',justifyContent:'center',alignItems:'center' }}>
                                        <div style={{flex:'1', textAlign:'left' }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Select Manufacturing Date:</h3>
                                            <Form.Item
                                                name="manufacturingDate"
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select manufacturing date!',
                                                },
                                                ]}
                                            >
                                                <DatePicker
                                                placeholder="Select Manufacturing Date"
                                                disabledDate={disabledDate}
                                                style={{ 
                                                    width: '80%',
                                                    margin: 'auto',
                                                    border: '2px solid blue', // Blue border color
                                                    borderRadius: '8px', // Rounded corners
                                                }}
                                                />
                                            </Form.Item>
                                        </div>


                                        <div style={{flex:'1', textAlign:'right' }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left', textAlign:'left', paddingLeft:'6%'}}> Product Expires After:</h3>
                                            <div style={{display:'flex',alignContent:'right'}}>
                                                <div style={{flex:'1'}}>
                                                        <Form.Item
                                                        name="year"
                                                        rules={[
                                                        { required: true, message: 'Please enter the valid year in number' },
                                                        { type: 'number', message: 'Please enter a valid number' },
                                                        ]}
                                                    >
                                                        <InputNumber
                                                        min={0}
                                                        style={{ 
                                                            width: '80%',
                                                            margin: 'auto',
                                                            border: '2px solid blue', // Blue border color
                                                            borderRadius: '8px', // Rounded corners
                                                        }}
                                                        placeholder="Year(Ex:1)"
                                                        step={1} 
                                                        />
                                                    </Form.Item>
                                                </div>


                                                <div style={{flex:'1'}}>
                                                    <Form.Item
                                                        name="month"
                                                        rules={[
                                                        { required: true, message: 'Please enter the valid month in number' },
                                                        { type: 'number', message: 'Please enter a valid number' },
                                                        ]}
                                                    >
                                                        <InputNumber
                                                        min={0}
                                                        max={12}
                                                        style={{ 
                                                            width: '80%',
                                                            margin: 'auto',
                                                            border: '2px solid blue', // Blue border color
                                                            borderRadius: '8px', // Rounded corners
                                                        }}
                                                        placeholder="Month(Ex:2)"
                                                        step={1} 
                                                        />
                                                    </Form.Item>
                                                </div>


                                                <div style={{flex:'1'}}>
                                                    <Form.Item
                                                        name="day"
                                                        rules={[
                                                        { required: true, message: 'Please enter the valid days in number' },
                                                        { type: 'number', message: 'Please enter a valid number' },
                                                        ]}
                                                    >
                                                        <InputNumber
                                                        min={0}
                                                        max={30}
                                                        style={{ 
                                                            width: '80%',
                                                            margin: 'auto',
                                                            border: '2px solid blue', // Blue border color
                                                            borderRadius: '8px', // Rounded corners
                                                        }}
                                                        placeholder="Day(Ex:20)"
                                                        step={1} 
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>


                                    <div style={{display:'flex', width:'80%',justifyContent:'center',alignItems:'center' }}>
                                        <div style={{ textAlign:'center', width:'100%' }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Enter Quantity:</h3>
                                            <Form.Item
                                                name="quantity"
                                                rules={[
                                                { required: true, message: 'Please enter a valid quantity' },
                                                { type: 'number', message: 'Please enter a valid number' },
                                                ]}
                                            >
                                                <InputNumber
                                                min={0}
                                                style={{ 
                                                    width: '50%',
                                                    margin: 'auto',
                                                    border: '2px solid blue', // Blue border color
                                                    borderRadius: '8px', // Rounded corners
                                                 }}
                                                placeholder="Quantity(Ex:200)"
                                                step={1} 
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>    

                                <div style={{width:'100%', alignContent:'center', textAlign:'center', }}>
                                    <Form.Item>
                                        <Button block type="primary" htmlType="submit"
                                         style={{width:'40%' ,fontFamily:'Kalam', textAlign:'center'}}>
                                        Add New Batch
                                        </Button>
                                    </Form.Item>
                                </div>
                                
                            </Form>
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

export default AddNewBatch;