import { Layout, theme, Breadcrumb,  Spin, Collapse, Avatar } from "antd";
import MenuList from "../../components/common/MenuList";
import ProductCard from "../../components/common/ProductCard";
const {Content, Sider} = Layout;
const { Panel } = Collapse;
import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { CodeSandboxCircleFilled, HomeOutlined, CaretRightOutlined, PlusCircleFilled, MinusCircleFilled, CheckCircleFilled} from "@ant-design/icons";
import MenuCollapse from "../../components/common/MenuCollapse";
import CustomFooter from "../../components/CustomFooter";
import {useLocation} from 'react-router-dom';

function ProductList(){
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
    const [categoryList, setCategoryList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);


    //* Add product, remove product, update product
    const addProduct = () => {
        navigate("/man/productList/newProduct", {state:{manufacturerId: manufacturerId,
            manufacturerName: manufacturerName,
            manufacturerLogo: manufacturerLogo}});
    }

    //* Fetch Inventory List
    let response,receivedData;
    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);
            let data = {
                manufacturerId: manufacturerId
            }
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/products/manufacturerCategories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                setCategoryList(receivedData);
                console.log(receivedData);
            }
            catch(error){
                console.log("Error while fetching categories");
            }

            
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/products/byManufacturer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                setLoading(false);
                setProductList(receivedData);
                console.log(receivedData);
            }
            catch(error){
                console.log("Error while fetching products");
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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Product List</p></Breadcrumb.Item>
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
                                <p style={{color:'#001529',fontSize:'50px',fontFamily:'Kalam',flex:'1'}}>Categories and Products:</p>
                                <div style={{flex:'1', display:'flex', justifyContent:'right', justifySelf:'right'}}>

                                    <div onClick={addProduct} style={{cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign:'center',paddingLeft:'5px' }}>
                                        <PlusCircleFilled style={{ fontSize: '50px', color: '#08c', marginLeft: '30px' }} />
                                        <p style={{ fontFamily: 'Kalam', alignSelf: 'center',  marginLeft: '30px' }}>Add New Product</p>
                                    </div>
                
                                </div>
                            </div>



                             {/* //*Loading effect   */  }
                             {
                                loading &&
                                <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>
                                    <Spin spinning={loading} size="large">
                                    </Spin>
                                </div>
                            }


                             {/* <Card title="Collapsible Card"> */}
                                <Collapse accordion expandIconPosition="left" expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
                                    {
                                        (categoryList != undefined && categoryList.length !=0) && categoryList.uniqueCategories.map((category, index) => {
                                            return (<Panel header={
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <Avatar src="https://i.pinimg.com/474x/8e/bc/e5/8ebce5e43c230715aa6ca5d5bd9b8f21.jpg" size={50} style={{ marginRight: '10px' }} /> {/* Use Avatar component with the image */}
                                                            <span style={{ fontFamily: 'Kalam', fontSize: '40px' }}>{category.CategoryName}</span>
                                                        </div>
                                                    } key={index}>
                                                {
                                                    ( productList != undefined && productList.length != 0) && productList.products.map((product, index) => {
                                                        return (
                                                                (product.CategoryName == category.CategoryName) && (<ProductCard key = {index} values={
                                                                    {
                                                                        product: product,
                                                                        manufacturerId: manufacturerId,
                                                                        manufacturerName: manufacturerName,
                                                                        manufacturerLogo: manufacturerLogo
                                                                    }
                                                                } 
                                                                />) 

                                                                );
                                                    })
                                                }
                                            </Panel>);
                                        }
                                        )
                                    }
                                </Collapse>
                            {/* </Card> */}
                            
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

export default ProductList;