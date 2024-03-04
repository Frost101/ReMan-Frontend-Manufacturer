import { Layout, theme, Breadcrumb, Spin, Card, Row, Col, Divider, Rate  } from "antd";
import MenuList from "../../components/common/MenuList";
const {Content, Sider} = Layout;
import { useState, useEffect} from "react";
import { CodeSandboxCircleFilled, HomeOutlined, DiffTwoTone, PlusCircleTwoTone} from "@ant-design/icons";
import MenuCollapse from "../../components/common/MenuCollapse";
import CustomFooter from "../../components/CustomFooter";
import {useLocation} from 'react-router-dom';
import BatchesInInventoryCard from "../../components/Inventory/BatchesInInventoryCard";
import { useNavigate } from "react-router-dom";


function ProductDetails(){
    const location = useLocation();
    const navigate = useNavigate();

    const pid = location.state.pid;
    const productName = location.state.productName;
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
    const [productDetails, setProductDetails] = useState([]);


   
    let response,receivedData;
    useEffect(() => {
        let response,receivedData;
        const fetchData = async () => {
            let data = {
                pid: pid,
            }
            setLoading(true);
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/products/productDetails',
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
                setProductDetails(receivedData.productInfo);
            }
            catch(error){
                console.log(error);
                setLoading(false);
            }
        };
    
        fetchData();
      }, []); 



     
    const goToUpdateProductInfo = () => {
        navigate("/man/productList/productDetails/updateProductInfo",
            {
                state: {
                    pid: pid,
                    productName: productName,
                    manufacturerId: manufacturerId,
                    manufacturerName: manufacturerName,
                    manufacturerLogo: manufacturerLogo

            }       
        } 
        );
    }


     

    
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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Product List </p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Product Details</p></Breadcrumb.Item>
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
                            
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                                <p style={{ color: '#001529', fontSize: '50px', fontFamily: 'Kalam', textAlign: 'center' }}>
                                    
                                    {productName}
                                </p>
                            </div>

                            <div style={{display:'flex', justifyContent:'center'}}>
                                <p style={{color:'#001529',fontSize:'50px',fontFamily:'Kalam',flex:'1'}}> </p>
                                <div style={{flex:'1', display:'flex', justifyContent:'right', justifySelf:'right'}}>
                                    
                                    <div onClick={goToUpdateProductInfo} style={{cursor:'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',paddingLeft:'10px' }}>
                                        <DiffTwoTone  style={{cursor: 'pointer', fontSize: '50px', color: '#08c', marginLeft: '30px' }} />
                                        <p style={{ fontFamily: 'Kalam', alignSelf: 'center', marginLeft: '30px'}}>Update Product Info</p>
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

                            
                            { productDetails.length != 0 && productDetails != undefined && (
                            <Card 
                            hoverable
                            >
                                <Row gutter={16}>
                                    <Col span={6}>

                                    <img src={productDetails.Image}
                                    alt="example"
                                     style={{ width: '80%', height: 'auto' }}
                                      />

                                    {
                                        productDetails.OtherImages.map((image, index) => {
                                            return (
                                                <img src={image}
                                                alt="example"
                                                key={index}
                                                 style={{ width: '40%', height: 'auto', marginTop:'10px' }}
                                                  />
                                            )
                                        }
                                        )
                                    }

                                    </Col>
                                    <Col span={18}>


                                    <Divider orientation="left" style={{ color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                        Product Name & Details 
                                    </Divider>
                                    
                                    <div
                                        style={{fontFamily:'Kalam', fontSize:'20px', color:'#001529', textAlign:'left'}}
                                    >
                                        <p><strong style={{color:'blue'}}>Product Name:</strong> {productDetails.ProductName}</p>
                                        <p><strong style={{color:'blue'}}>Category Name:</strong> {productDetails.CategoryName} </p>
                                        <p><strong style={{color:'blue'}}>Description:</strong> {productDetails.Description} </p>
                                        <p><strong style={{color:'blue'}}>Rating:</strong> {productDetails.Rating} <Rate allowHalf value={productDetails.Rating} /></p>
                                        
                                        <br></br>
                                    </div>

                                    <Divider orientation="left" style={{ color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                        Owner Info & Quantity
                                    </Divider>

                                    <div 
                                        style={{fontFamily:'Kalam', fontSize:'20px', color:'#001529', textAlign:'left'}}
                                    >
                                        <p><strong style={{color:'blue'}}>Manufacturer Name:</strong> {productDetails.ManufacturerName}</p>
                                        <p><strong style={{color:'blue'}}>Total Quantity:</strong> {productDetails.TotalQuantity}</p>
                                        
                                        <br></br>
                                    </div>
                                    
                                    <Divider orientation="left" style={{ color: 'purple', borderColor: 'purple', borderWidth: '5px', fontFamily:'Kalam' }}>
                                        Price Details & Adjustment
                                    </Divider>

                                    <div
                                        style={{fontFamily:'Kalam', fontSize:'20px', color:'#001529', textAlign:'left'}}
                                    >
                                        <p><strong style={{color:'blue'}}>Wweight/Volume : </strong>{productDetails.Weight_volume} {productDetails.Unit} </p>
                                        <p><strong style={{color:'blue'}}>Unit Price: </strong>{productDetails.UnitPrice} taka</p>
                                        <p><strong style={{color:'blue'}}>Minimum Quantity For Sale:</strong>  {productDetails.MinQuantityForSale}</p>
                                        <p><strong style={{color:'blue'}}>Minimum Quantity For Discount:</strong>  {productDetails.MinQuantityForDiscount}</p>
                                        <p><strong style={{color:'blue'}}>Minimum Discount:</strong>  {productDetails.MinimumDiscount} %</p>
                                        <p><strong style={{color:'blue'}}>Maximum Discount:</strong>  {productDetails.MaximumDiscount} %</p>
                                        <p><strong style={{color:'blue'}}>Discount Increment:</strong>  {productDetails.DiscountRate} %</p>
                                        <p><strong style={{color:'blue'}}>Product Quantity For Discount Rate:</strong>  {productDetails.ProductQuantityForDiscountRate} </p>
                                        <p><strong style={{color:'blue'}}>Minimum Delivery Charge:</strong>  {productDetails.MinimumDeliveryCharge} taka</p>
                                        <p><strong style={{color:'blue'}}>Delivery Charge Increment:</strong>  {productDetails.DeliveryChargeIncreaseRate} taka</p>
                                        <br></br>
                                    </div>
                                    
                                    
                                    </Col>
                                </Row>
                                </Card>
                            )}


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

export default ProductDetails;