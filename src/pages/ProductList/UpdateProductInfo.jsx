import { Layout, theme, Breadcrumb, Upload, Button, Form,Cascader,Spin,
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

function UpdateProductInfo(){
    const location = useLocation();
    const navigate = useNavigate();

    const manufacturerId = location.state.manufacturerId;
    const manufacturerName = location.state.manufacturerName;
    const manufacturerLogo = location.state.manufacturerLogo;
    const pid = location.state.pid;
    const productName = location.state.productName;
    
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


    const [productInfo, setProductInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [categoryList, setCategoryList] = useState([]);


    
    useEffect(() => {
        const fetchData = async () => {
            let response,receivedData;
            setLoading(true);

            let data = {
                pid: pid
            }
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/products/productDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                console.log(receivedData);
                setLoading(false);
                setProductInfo(receivedData.productInfo);

                //* Set the fileList
                let fileListTmp = [];
                let urlsTmp = [];
                fileListTmp.push({
                    uid: '1',
                    name: 'image1.png',
                    status: 'uploaded',
                    url: receivedData.productInfo.Image,
                });
                urlsTmp.push(receivedData.productInfo.Image);
                receivedData.productInfo.OtherImages.map((url, index) => {
                    fileListTmp.push({
                        uid: (index+2),
                        name: 'image' + (index+2) +'.png',
                        status: 'uploaded',
                        url: url,
                    });
                    urlsTmp.push(url);
                });
                setFileList(fileListTmp);
                setImageUrls(urlsTmp);
                
            }
            catch(error){
                console.log("Error");
            }



            setLoading(true);
            //* Fetch Category List
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/products/allCategories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
                });
        
                receivedData = await response.json();
                console.log(receivedData);
                setLoading(false);
                setCategoryList(receivedData.categories);
                
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

      console.log("FileList: ",fileList);


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


      const onRemove = async (file) => {

            imageUrls.map((url, index) => {
                if(url === file.url){
                    imageUrls.splice(index, 1);
                }
            });
            if(file.status != undefined && file.status === 'uploaded'){
                let src = file.url;
                try {
                    const storage = getStorage();
        
                    const desertRef = ref(storage, src);
                   
                    deleteObject(desertRef).then(() => {
                       
                        console.log('File deleted successfully');
                    }).catch((error) => {
                        // Uh-oh, an error occurred!
                        console.log('Uh-oh, an error occurred!');
                    });
                  } catch (error) {
                    console.error('Error deleting image:', error.message);
                  }
            }
      }


      const uploadImages = async () => {
        let urls = [];
        fileList.map(async (file) => {
            const storageRef = ref(storage, `images/${v4()}`);
            await uploadBytes(storageRef, file.originFileObj).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(snapshot.ref).then((url) => {
                    urls.push(url);
                });
            });
        });
        setImageUrls(urls);
      }

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
        urls =  urls.concat(imageUrls);

        await Promise.all(
        fileList.map(async (file) => {

            if(file.status != 'uploaded'){
                const storageRef = ref(storage, `images/${manufacturerName}/products/${values.ProductName}/${v4()}`);
                const snapshot = await uploadBytes(storageRef, file.originFileObj);
                console.log('Uploaded a blob or file!');
                
                const url = await getDownloadURL(snapshot.ref);
                urls.push(url);
            }
            
        })
        );
        setImageUrls(urls);

    

        let response,receivedData;
        let data = {
            PID: pid,
            MID: manufacturerId,
            ProductName: values.ProductName,
            Description: values.Description,
            CategoryName: values.CategoryName,
            Weight_Volume: values.Weight_Volume,
            Unit: values.Unit,
            UnitPrice: values.UnitPrice,
            MinQuantityForSale: values.MinQuantityForSale,
            MinQuantityForDiscount: values.MinQuantityForDiscount,
            MinimumDiscount: values.MinimumDiscount,
            MaximumDiscount: values.MaximumDiscount,
            DiscountRate: values.DiscountRate,
            ProductQuantityForDiscountRate: values.ProductQuantityForDiscountRate,
            MinimumDeliveryCharge: values.MinimumDeliveryCharge,
            DeliveryChargeIncreaseRate: values.DeliveryChargeIncreaseRate,
            Image: urls,
        }

        console.log(data);

        let bodyt = await JSON.stringify(data);
        
        try{

            response = await fetch(import.meta.env.VITE_API_URL+'/products/productUpdate', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyt
            })
            
            
            if(response.status === 200){
                notification.success({
                    message: `Product Info Updated Successfully`,
                    duration: 1, //? Duration in sec
                    onClose: () => {
                        window.location.reload();
                    }
                });
            }
            else{
                notification.error({
                    message: `Product Info Update Failed`,
                    duration: 1, //? Duration in seconds
                });
            }
        }
        catch(error){
            console.log(error);
        }
       
        
      };

      

      console.log(imageUrls);

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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Product List</p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Product Details</p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Update</p></Breadcrumb.Item>
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
                                overflow: 'initial',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',  
                                justifyContent: 'flex-start',  
                            }}
                            >
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                                
                                <p style={{ color: '#001529', fontSize: '50px', fontFamily: 'Kalam', textAlign: 'center' }}>
                                <span style={{  fontSize: '30px', fontFamily: 'Kalam', textAlign: 'center', color:'purple' }}> Update Product Info </span> <br></br>
                                    <img
                                    src="https://pngimg.com/d/gift_PNG100238.png"
                                    alt="Avatar"
                                    style={{ marginRight: '10px', width: '50px', height: '50px' }}
                                    />
                                    {productName}
                                </p>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}>

                                
                            {/* //*Loading effect   */  }
                             {
                                loading &&
                                <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>
                                    <Spin spinning={loading} size="large">
                                    </Spin>
                                </div>
                            }

                            

                            {
                                productInfo != undefined && productInfo.length != 0 &&
                                <Form
                                name="login-form"
                                labelCol={{span:8}}
                                initialValues={
                                    {
                                        MID: manufacturerId,
                                        PID: pid,
                                        ProductName: productInfo.ProductName,
                                        Description: productInfo.Description,
                                        CategoryName: productInfo.CategoryName,
                                        Weight_Volume: productInfo.Weight_volume,
                                        Unit: productInfo.Unit,
                                        UnitPrice: productInfo.UnitPrice,
                                        MinQuantityForSale: productInfo.MinQuantityForSale,
                                        MinQuantityForDiscount: productInfo.MinQuantityForDiscount,
                                        MinimumDiscount: productInfo.MinimumDiscount,
                                        MaximumDiscount: productInfo.MaximumDiscount,
                                        DiscountRate: productInfo.DiscountRate,
                                        ProductQuantityForDiscountRate: productInfo.ProductQuantityForDiscountRate,
                                        MinimumDeliveryCharge: productInfo.MinimumDeliveryCharge,
                                        DeliveryChargeIncreaseRate: productInfo.DeliveryChargeIncreaseRate,
                                    }
                                }
                                onFinish={onFinish}
                                style={{
                                    padding: '16px',          // Add padding for better appearance
                                    width: '100%', 
                                }}
                                 >

                                <Divider orientation="left" style={{ width:'80%', color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                    Product Details Section
                                </Divider>

                                <h3 style={{fontFamily:'Kalam', alignContent:'left', paddingLeft:'10%'}}>ProductName:</h3>
                                <Form.Item
                                    name="ProductName"
                                    
                                    rules= {[
                                        {
                                            required: true,
                                            message:
                                                'Enter a valid product name!',
                                        },
                                    ]}
                                    hasFeedback
                                    style={{textAlign:'center'}}
                                >
                                    <Input  
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

                                <h3 style={{fontFamily:'Kalam', alignContent:'left', paddingLeft:'10%'}}>Product Description:</h3>
                                <Form.Item
                                    name="Description"
                                    type="text"
                                    rules={[{ required: true, message: 'Enter a valid product description!' }]}
                                    style={{textAlign:'center'}}
                                >
                      
                                    <Input.TextArea
                                
                                    allowClear
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

                                <h3 style={{fontFamily:'Kalam', alignContent:'left', paddingLeft:'10%'}}>Product Category:</h3>
                                <Form.Item
                                    name="CategoryName"
                                    rules={[{ required: true, message: 'Please select an option' }]}
                                    style={{textAlign:'center',
                                }}
                                >
                                    <Select
                                    showSearch
                                    style={{
                                        width: '80%',
                                        margin: 'auto',
                                        border: '2px solid blue', // Blue border color
                                         borderRadius: '8px', // Rounded corners
                                      }}
                                    placeholder="Type here...."
                                    optionFilterProp="children"
                                    filterOption={(inputValue, option) =>
                                        option.children.toLowerCase().includes(inputValue.toLowerCase())
                                    }
                                    dropdownStyle={{ maxHeight: 200, overflowY: 'auto' }} 
                                    >
                                    {categoryList.map((option) => (
                                        <Option key={option.CategoryName} value={option.CategoryName} style={{fontFamily:'Kalam'}}>
                                        {option.CategoryName}
                                        </Option>
                                    ))}
                                    </Select>
                                </Form.Item>



                                <Divider orientation="left" style={{ color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                    Weight & Price Adjustment Section
                                </Divider>

                                <div style={{width: '100%', display: 'flex', flexDirection:'column' ,justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{display:'flex', width:'80%',justifyContent:'center',alignItems:'center' }}>
                                        <div style={{flex:'1', textAlign:'left' }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Weight/Volume:</h3>
                                            <Form.Item
                                                name="Weight_Volume"
                                                rules={[
                                                { required: true, message: 'Please enter the weight/volume' },
                                                { type: 'number', message: 'Please enter a valid number' }
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
                                                placeholder="weight/volume"
                                                step={1} 
                                                />
                                            </Form.Item>
                                        </div>

                                        <div style={{flex:'1', textAlign:'right'}}>
                                            <h3 style={{fontFamily:'Kalam', textAlign:'left', paddingLeft:'20%'}}>Unit:</h3>
                                            <Form.Item
                                                name="Unit"
                                                rules={[
                                                { required: true, message: 'Please enter a valid unit' },
                                                { type: 'text', message: 'Please enter a valid unit' },
                                                ]}
                                            >
                                                <Input
                                                style={{ 
                                                    width: '80%',
                                                    margin: 'auto',
                                                    border: '2px solid blue', // Blue border color
                                                    borderRadius: '8px', // Rounded corners
                                                 }}
                                                placeholder="Kg/Litre"
                                                />
                                            </Form.Item>
                                        </div>

                                    </div>


                                    <div style={{display:'flex', width:'80%',justifyContent:'center',alignItems:'center' }}>
                                        <div style={{flex:'1', textAlign:'left', }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Unit Price:</h3>
                                            <Form.Item
                                                name="UnitPrice"
                                                rules={[
                                                { required: true, message: 'Please enter the unit price' },
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
                                                placeholder="Price in taka"
                                                step={1} 
                                                />
                                            </Form.Item>
                                        </div>

                                        <div style={{flex:'1'}}>

                                        </div>
                                       

                                    </div>

                                    


                                    <div style={{display:'flex', width:'80%',justifyContent:'center',alignItems:'center' }}>
                                        <div style={{flex:'1', textAlign:'left' }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Minimum Quantity For Sale:</h3>
                                            <Form.Item
                                                name="MinQuantityForSale"
                                                rules={[
                                                { required: true, message: 'Please enter the unit price' },
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
                                                placeholder="Ex:100"
                                                step={1} 
                                                />
                                            </Form.Item>
                                        </div>

                                        <div style={{flex:'1', textAlign:'right'}}>
                                            <h3 style={{fontFamily:'Kalam', textAlign:'left', paddingLeft:'20%'}}>Minimum Quantity For Discount:</h3>
                                            <Form.Item
                                                name="MinQuantityForDiscount"
                                                rules={[
                                                { required: true, message: 'Please enter minimum Quantity For Discount' },
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
                                                placeholder="Ex:200"
                                                step={1}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>



                                    <div style={{display:'flex', width:'80%',justifyContent:'center',alignItems:'center' }}>
                                        <div style={{flex:'1', textAlign:'left' }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Minimum Discount Rate(in %):</h3>
                                            <Form.Item
                                                name="MinimumDiscount"
                                                rules={[
                                                { required: true, message: 'Please enter the minimum discount' },
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
                                                placeholder="Ex:10.5"
                                                step={0.1} 
                                                />
                                            </Form.Item>
                                        </div>

                                        <div style={{flex:'1', textAlign:'right'}}>
                                            <h3 style={{fontFamily:'Kalam', textAlign:'left', paddingLeft:'20%'}}>Maximum Discount(in %):</h3>
                                            <Form.Item
                                                name="MaximumDiscount"
                                                rules={[
                                                { required: true, message: 'Please enter maximum Quantity For Discount' },
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
                                                placeholder="Ex:20.5"
                                                step={0.1}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>




                                    <div style={{display:'flex', width:'80%',justifyContent:'center',alignItems:'center' }}>
                                        <div style={{flex:'1', textAlign:'left' }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Discount Rate Increment(in %):</h3>
                                            <Form.Item
                                                name="DiscountRate"
                                                rules={[
                                                { required: true, message: 'Please enter the discount rate increment' },
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
                                                placeholder="Ex:0.1"
                                                step={0.1} 
                                                />
                                            </Form.Item>
                                        </div>

                                        <div style={{flex:'1', textAlign:'right'}}>
                                            <h3 style={{fontFamily:'Kalam', textAlign:'left', paddingLeft:'20%'}}>Product Quantity for discount increment:</h3>
                                            <Form.Item
                                                name="ProductQuantityForDiscountRate"
                                                rules={[
                                                { required: true, message: 'Please enter maximum Quantity For Discount' },
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
                                                placeholder="Ex:50"
                                                step={1}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    




                                    <div style={{display:'flex', width:'80%',justifyContent:'center',alignItems:'center' }}>
                                        <div style={{flex:'1', textAlign:'left' }}>
                                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Minimum Delivery Charge(in taka):</h3>
                                            <Form.Item
                                                name="MinimumDeliveryCharge"
                                                rules={[
                                                { required: true, message: 'Please enter the minimum delivery charge' },
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
                                                placeholder="Ex:10"
                                                step={1} 
                                                />
                                            </Form.Item>
                                        </div>

                                        <div style={{flex:'1', textAlign:'right'}}>
                                            <h3 style={{fontFamily:'Kalam', textAlign:'left', paddingLeft:'20%'}}>Delivery Charge Increment Rate per product:</h3>
                                            <Form.Item
                                                name="DeliveryChargeIncreaseRate"
                                                rules={[
                                                { required: true, message: 'Please enter maximum Quantity For Discount' },
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
                                                placeholder="Ex:0.5"
                                                step={0.1}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>


                                </div>

                                <Divider orientation="left" style={{ color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                    Image Upload Section
                                </Divider>
                                





                                <h3 style={{fontFamily:'Kalam', textAlign:'center'}}>Upload Product Images:</h3>
                                <p style={{fontFamily:'Kalam', textAlign:'center', color:'red'}}>[Please Note that the first image will be selected as the primary image]</p>
                                <div style={{display:'flex', textAlign:'center'}}>
                                    <ImgCrop rotationSlider>
                                        <Upload
                                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                            listType="picture-card"
                                            fileList={fileList}
                                            onChange={onChange}
                                            onPreview={onPreview}
                                            onRemove={onRemove}
                                            preventDefault={false}
                                        >
                                            {fileList.length < 5 && '+ Upload'}
                                        </Upload>
                                    </ImgCrop>
                                </div>
                                {/* <Button onClick={uploadImages}>Upload</Button> */}


                                <Form.Item>
                                    <Button block type="primary" htmlType="submit" style={{width:'100%', fontFamily:'Kalam', textAlign:'center'}}>
                                     Update Info
                                    </Button>
                                </Form.Item>
                            </Form>


                            }
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

export default UpdateProductInfo;