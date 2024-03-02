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

function AddNewVoucher(){
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


    
    
    useEffect(() => {
        const fetchData = async () => {
            
        };
    
        fetchData();
      }, []); 

    

      const onFinish = async (values) => { 
            console.log(values);

            let data = {
                manufacturerId: manufacturerId,
                VoucherCode: values.VoucherCode,
                VoucherPercentage: values.VoucherPercentage,
                Validity: values.Validity,
                MinPurchase: values.MinPurchase,
                MaxUsage: values.MaxUsage,
                VoucherDetails: values.VoucherDetails,
            };
            let response, receivedData;
            
            try {
                response = await fetch(import.meta.env.VITE_API_URL+'/vouchers/addVoucher', {
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
                        message: 'Voucher added successfully',
                        duration: 1, //? Duration in seconds
                        onClose: () => {
                            navigate(-1);
                        },
                    });
                } else {
                    notification.error({
                        message: 'Failed to add Voucher',
                        duration: 1, 
                    });
                }
            }
            catch (err) {
                notification.error({
                    message: 'Failed to add Voucher',
                    description: 'Something went wrong while adding the Voucher',
                });
            }
      };


      const disabledDate = (current) => {
            //* Disable all dates before today
            //* But enable today
            return current && current <= moment().startOf('day');
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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Voucher</p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Add New</p></Breadcrumb.Item>
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
                                Add A New Voucher
                            </p>
                           
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}>
                                <Form
                                name="form"
                                labelCol={{span:8}}
                                initialValues={{  }}
                                onFinish={onFinish}
                                style={{
                                    padding: '16px',         
                                    width: '100%', 
                                }}
                                 >

                                <Divider orientation="left" style={{ width:'80%', color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                    Voucher Details Section
                                </Divider>

                                <div style={{width: '100%', display: 'flex', flexDirection:'column' ,justifyContent: 'center', alignItems: 'center' }}>



                                <div style={{display:'flex', width:'80%',justifyContent:'center',alignItems:'center' }}>
                                        <div style={{flex:'1', textAlign:'left' }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Voucher Code:</h3>
                                            <Form.Item
                                                name="VoucherCode"
                                                rules={[
                                                { required: true, message: 'Please enter a valid voucher code' },
                                                ]}
                                            >
                                                <Input
                                                style={{ 
                                                    width: '80%',
                                                    margin: 'auto',
                                                    border: '2px solid blue', // Blue border color
                                                    borderRadius: '8px', // Rounded corners
                                                 }}
                                                placeholder="Ex: ABC250" 
                                                />
                                            </Form.Item>
                                        </div>


                                        <div style={{flex:'1', textAlign:'right', width:'100%' }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Discount Rate:</h3>
                                            <Form.Item
                                                name="VoucherPercentage"
                                                rules={[
                                                { required: true, message: 'Please enter a valid discount rate' },
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
                                                placeholder="Ex: 5%"
                                                step={0.1} 
                                                />
                                            </Form.Item>
                                        
                                            
                                        </div>
                                    </div>


                                    



                                    <div style={{display:'flex', width:'80%',justifyContent:'center',alignItems:'center' }}>
                                        <div style={{flex:'1', textAlign:'left' }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Validity:</h3>
                                            <Form.Item
                                                name="Validity"
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select validity date!',
                                                },
                                                ]}
                                            >
                                                <DatePicker
                                                placeholder="Select validity"
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


                                        <div style={{flex:'1', textAlign:'right', width:'100%' }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Minimum Purchase Amount:</h3>
                                            <Form.Item
                                                name="MinPurchase"
                                                rules={[
                                                { required: true, message: 'Please enter a valid purchase amount' },
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
                                                placeholder="Ex: 1000"
                                                step={1} 
                                                />
                                            </Form.Item>
                                        
                                            
                                        </div>
                                    </div>


                                    


                                    <div style={{display:'flex', width:'80%',justifyContent:'center',alignItems:'center' }}>
                                        <div style={{ textAlign:'center', width:'100%' }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Max Usage:</h3>
                                            <Form.Item
                                                name="MaxUsage"
                                                rules={[
                                                { required: true, message: 'Please enter a valid number' },
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
                                                placeholder="Ex:2"
                                                step={1} 
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div style={{display:'flex', width:'80%',justifyContent:'center',alignItems:'center' }}>
                                        <div style={{ textAlign:'center', width:'100%' }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Details:</h3>
                                            <Form.Item
                                                name="VoucherDetails"
                                                rules={[
                                                { required: true, message: 'Please enter a valid voucher details' },
                                                ]}
                                            >
                                                <Input.TextArea
                                               
                                                style={{ 
                                                    width: '50%',
                                                    margin: 'auto',
                                                    border: '2px solid blue', // Blue border color
                                                    borderRadius: '8px', // Rounded corners
                                                 }}
                                                placeholder="Ex: 5% discount on all products"
                                                
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>    

                                <div style={{width:'100%', alignContent:'center', textAlign:'center', }}>
                                    <Form.Item>
                                        <Button block type="primary" htmlType="submit"
                                         style={{width:'40%' ,fontFamily:'Kalam', textAlign:'center'}}>
                                        Add New Voucher
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

export default AddNewVoucher;