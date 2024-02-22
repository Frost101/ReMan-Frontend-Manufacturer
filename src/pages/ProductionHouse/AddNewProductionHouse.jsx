import { Layout, theme, Breadcrumb, Upload, Button, Form,Cascader,
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

function AddNewProductionHouse(){
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
    const [fileList, setFileList] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [categoryList, setCategoryList] = useState([]);


    //* Fetch Inventory List
    useEffect(() => {
        const fetchData = async () => {
            let response;
            let receivedData;
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/products/allCategories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                });
        
                receivedData = await response.json();
                setCategoryList(receivedData.categories);
                console.log(receivedData);
            }
            catch(error){
                console.log("Error");
            }
        };
    
        fetchData();
      }, []); 



      


      const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };

      console.log(fileList);


      const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
      };

      const onFinish = async (values) => { 

        if(fileList.length === 0){
            notification.error({
                message: `Please upload at least one image`,
                duration: 1, //? Duration in seconds
            });
            return;
        }

        //* Upload images to firebase storage
        let urls = [];
        await Promise.all(
            fileList.map(async (file) => {
                const storageRef = ref(storage, `images/${manufacturerName}/ProductionHouse/${values.ProductionHouseName}/${v4()}`);
                
                try {
                    const snapshot = await uploadBytes(storageRef, file.originFileObj);
                    console.log('Uploaded a blob or file!');
                    
                    const url = await getDownloadURL(snapshot.ref);
                    urls.push(url);
                } catch (error) {
                    console.error('Error uploading or getting URL:', error);
                }
            })
        );
        setImageUrls(urls);

        values.Image = urls[0];

        console.log('Received values:', values);

        let data = {
            MID : manufacturerId,
            ProductionHouseName: values.ProductionHouseName,
            Details: values.Details,
            ProductionHouseType: values.ProductionHouseType,
            Capacity: values.Capacity,
            HouseNumber: values.HouseNumber,
            Street: values.Street,
            ZIP: values.ZIP,
            Thana: values.Thana,
            Division: values.Division,
            AddressDetails: values.AddressDetails,
            Image: values.Image
        }

        let response, receivedData;
        try{
            response = await fetch(import.meta.env.VITE_API_URL+'/productionhouse/addProductionHouse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
    
            receivedData = await response.json();
            console.log(receivedData);
            if(response.status === 201){
                notification.success({
                    message: `Production House Added Successfully`,
                    duration: 1, //? Duration in seconds
                    onClose: () => {
                        window.location.reload(true);
                    }
                });
            }
            else{
                notification.error({
                    message: `Error Adding Production House`,
                    duration: 1, //? Duration in seconds
                });
            }
        }
        catch(error){
            console.log("Error");
        }

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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Add new</p></Breadcrumb.Item>
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
                            <p style={{ color: '#001529', fontSize: '50px', fontFamily: 'Kalam', textAlign: 'center' }}>
                                Add A New Production House
                            </p>

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
                                    Production House Description Section
                                </Divider>

                                <h3 style={{fontFamily:'Kalam', alignContent:'left', paddingLeft:'10%'}}>Production House Name:</h3>
                                <Form.Item
                                    name="ProductionHouseName"
                                    rules= {[
                                        {
                                            required: true,
                                            message:
                                                'Enter a valid production House name!',
                                        },
                                    ]}
                                    hasFeedback
                                    style={{textAlign:'center'}}
                                >
                                    <Input 
                                        placeholder='Enter production house name: (Ex: prodhouse1)'
                                        maxLength={30}
                                        showCount
                                        allowClear
                                        style={{
                                            width: '80%',
                                            margin: 'auto',
                                            border: '2px solid blue',    // Set the border color to blue
                                            borderRadius: '8px',        // Set border-radius for rounded corners
                                            padding: '8px',             // Add padding for better appearance
                                            boxSizing: 'border-box',     // Include padding and border in the total width
                                          }}
                                    />
                                </Form.Item>

                                <h3 style={{fontFamily:'Kalam', alignContent:'left', paddingLeft:'10%'}}>Description:</h3>
                                <Form.Item
                                    name="Details"
                                    type="text"
                                    rules={[{ required: true, message: 'Enter a valid description!' }]}
                                    style={{textAlign:'center'}}
                                >
                      
                                    <Input.TextArea
                                    allowClear
                                    placeholder="Example: Crafting a fusion of crispy chips and refreshing juices for a delightful snacking experience"
                                    style={{
                                        width: '80%',
                                        margin: 'auto',
                                        border: '2px solid blue',    // Set the border color to blue
                                        borderRadius: '8px',        // Set border-radius for rounded corners
                                        padding: '8px',             // Add padding for better appearance
                                        boxSizing: 'border-box',     // Include padding and border in the total width
                                      }}
                                    rows={4}
                                    />
                                </Form.Item>



                                <h3 style={{fontFamily:'Kalam', alignContent:'left', paddingLeft:'10%'}}>Production House Type:</h3>
                                <Form.Item
                                    name="ProductionHouseType"
                                    rules= {[
                                        {
                                            required: true,
                                            message:
                                                'Enter a valid production house type!',
                                        },
                                    ]}
                                    hasFeedback
                                    style={{textAlign:'center'}}
                                >
                                    <Input 
                                        placeholder='Example: Chips, Juices, Snacks'
                                        maxLength={50}
                                        showCount
                                        allowClear
                                        style={{
                                            width: '80%',
                                            margin: 'auto',
                                            border: '2px solid blue',    // Set the border color to blue
                                            borderRadius: '8px',        // Set border-radius for rounded corners
                                            padding: '8px',             // Add padding for better appearance
                                            boxSizing: 'border-box',     // Include padding and border in the total width
                                          }}
                                    />
                                </Form.Item>

                                <h3 style={{fontFamily:'Kalam', alignContent:'left', paddingLeft:'10%'}}>Size(In sqft):</h3>
                                <Form.Item
                                    name="Capacity"
                                    style={{paddingLeft:'10%'}}
                                    rules={[
                                    { required: true, message: 'Please enter the size in sqft' },
                                    { type: 'number', message: 'Please enter a valid number' }
                                    ]}
                                >
                                    <InputNumber
                                    min={0}
                                    style={{ 
                                        width: '89%',
                                        margin: 'auto',
                                        border: '2px solid blue',    // Set the border color to blue
                                        borderRadius: '8px',        // Set border-radius for rounded corners
                                        paddingLeft: '5px',             // Add padding for better appearance
                                        boxSizing: 'border-box',     // Include padding and border in the total width
                                        }}
                                    placeholder="weight/volume"
                                    step={1} 
                                    />
                                </Form.Item>


                                <Divider orientation="left" style={{ color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                    Address Section
                                </Divider>

                                <div style={{width: '100%', display: 'flex', flexDirection:'column' ,justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{display:'flex', width:'80%',justifyContent:'center',alignItems:'center' }}>
                                        <div style={{flex:'1', textAlign:'left' }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>House Number :</h3>
                                            <Form.Item
                                                name="HouseNumber"
                                                rules={[
                                                { required: true, message: 'Please enter a valid House Number' },
                                                ]}
                                            >
                                                <Input
                                                style={{ 
                                                    width: '80%',
                                                    margin: 'auto',
                                                    border: '2px solid blue', // Blue border color
                                                    borderRadius: '8px', // Rounded corners
                                                 }}
                                                placeholder="Ex:A-121"
                                                />
                                            </Form.Item>
                                        </div>

                                        <div style={{flex:'1', textAlign:'right'}}>
                                            <h3 style={{fontFamily:'Kalam', textAlign:'left', paddingLeft:'20%'}}>Street Name:</h3>
                                            <Form.Item
                                                name="Street"
                                                rules={[
                                                { required: true, message: 'Please enter a valid street name' },
                                                { type: 'text', message: 'Please enter a valid street name' },
                                                ]}
                                            >
                                                <Input
                                                style={{ 
                                                    width: '80%',
                                                    margin: 'auto',
                                                    border: '2px solid blue', // Blue border color
                                                    borderRadius: '8px', // Rounded corners
                                                 }}
                                                placeholder="Ex: Rankin Street"
                                                />
                                            </Form.Item>
                                        </div>

                                    </div>


                                    <div style={{display:'flex', width:'80%',justifyContent:'center',alignItems:'center' }}>
                                        <div style={{flex:'1', textAlign:'left', }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>ZIP Code:</h3>
                                            <Form.Item
                                                name="ZIP"
                                                rules={[
                                                { required: true, message: 'Please enter the valid ZIP Code' },
                                                { type: 'number', message: 'Please enter a valid ZIP Code' },
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
                                                placeholder="Ex:6000"
                                                />
                                            </Form.Item>
                                        </div>

                                        <div style={{flex:'1'}}>

                                        </div>
                                       

                                    </div>

                                    


                                    <div style={{display:'flex', width:'80%',justifyContent:'center',alignItems:'center' }}>
                                        <div style={{flex:'1', textAlign:'left' }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Thana:</h3>
                                            <Form.Item
                                                name="Thana"
                                                rules={[
                                                { required: true, message: 'Please enter a valid Thana Name' },
                                                ]}
                                            >
                                                <Input
                                                style={{ 
                                                    width: '80%',
                                                    margin: 'auto',
                                                    border: '2px solid blue', // Blue border color
                                                    borderRadius: '8px', // Rounded corners
                                                 }}
                                                placeholder="Ex:Rajpara"
                                                />
                                            </Form.Item>
                                        </div>

                                        <div style={{flex:'1', textAlign:'right'}}>
                                            <h3 style={{fontFamily:'Kalam', textAlign:'left', paddingLeft:'20%'}}>Division:</h3>
                                            <Form.Item
                                                name="Division"
                                                rules={[
                                                { required: true, message: 'Please enter a valid Division' },
                                                ]}
                                            >
                                                <Input
                                                style={{ 
                                                    width: '80%',
                                                    margin: 'auto',
                                                    border: '2px solid blue', // Blue border color
                                                    borderRadius: '8px', // Rounded corners
                                                 }}
                                                placeholder="Ex:Rajshahi"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <h3 style={{fontFamily:'Kalam'}}>Address Details:</h3>
                                    <Form.Item
                                        name="AddressDetails"
                                        type="text"
                                        rules={[{ required: true, message: 'Enter Valid Address details!' }]}
                                        style={{textAlign:'center', width:'100%'}}
                                    >
                        
                                        <Input.TextArea
                                        allowClear
                                        placeholder="Example: Near the jame mosjid"
                                        style={{
                                            width: '80%',
                                            margin: 'auto',
                                            border: '2px solid blue',    // Set the border color to blue
                                            borderRadius: '8px',        // Set border-radius for rounded corners
                                            padding: '8px',             // Add padding for better appearance
                                            boxSizing: 'border-box',     // Include padding and border in the total width
                                        }}
                                        rows={4}
                                        />
                                    </Form.Item>

                                </div>

                                <Divider orientation="left" style={{ color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                    Image Upload Section
                                </Divider>


                                <h3 style={{fontFamily:'Kalam', textAlign:'center'}}>Upload Production House Image:</h3>
                                <div style={{display:'flex', textAlign:'center'}}>
                                    <ImgCrop rotationSlider>
                                        <Upload
                                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                            listType="picture-card"
                                            fileList={fileList}
                                            onChange={onChange}
                                            onPreview={onPreview}
                                            preventDefault={false}
                                        >
                                            {fileList.length < 1 && '+ Upload'}
                                        </Upload>
                                    </ImgCrop>
                                </div>
                              

                                
                                <Form.Item>
                                    <Button block type="primary" htmlType="submit" style={{width:'100%', fontFamily:'Kalam', textAlign:'center'}}>
                                     Add Production House
                                    </Button>
                                </Form.Item>
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

export default AddNewProductionHouse;