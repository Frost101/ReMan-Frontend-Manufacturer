import { Layout, theme, Breadcrumb, Spin } from "antd";
import MenuList from "../../components/common/MenuList";
const {Content, Sider} = Layout;
import { useState, useEffect} from "react";
import { CodeSandboxCircleFilled, HomeOutlined, TagsOutlined, ShoppingCartOutlined, MinusCircleTwoTone, PlusCircleTwoTone} from "@ant-design/icons";
import MenuCollapse from "../../components/common/MenuCollapse";
import CustomFooter from "../../components/CustomFooter";
import {useLocation} from 'react-router-dom';
import BatchesInInventoryCard from "../../components/Inventory/BatchesInInventoryCard";
import { useNavigate } from "react-router-dom";


function InventoryShowBatch(){
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


    //* Set inventory list
    const [batchList, setBatchList] = useState([]);
    const [loading, setLoading] = useState(false); 



    //* Fetch Inventory List
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
                console.log(receivedData);
            }
            catch(error){
                console.log("Error");
            }
        };
    
        fetchData();
      }, []); 



      const goToShiftBatch = (batchId) => {
            navigate("/man/inventoryList/showProduct/shiftBatch", {state: 
                {
                    manufacturerId:manufacturerId,
                    manufacturerName:manufacturerName,
                    manufacturerLogo:manufacturerLogo,
                    pid:pid,
                    productName:productName,
                    iid:iid,
                    inventoryName:inventoryName,      
                }
                
            })
      }


      const goToBatchSale = () => {
           navigate("/man/inventoryList/showProduct/showBatch/sale", {state:
            {
                manufacturerId:manufacturerId,
                manufacturerName:manufacturerName,
                manufacturerLogo:manufacturerLogo,
                pid:pid,
                productName:productName,
                iid:iid,
                inventoryName:inventoryName,

            }}
            );   
      }

      const goToAddToMarketplace = () => {
            navigate("/man/inventoryList/showProduct/showBatch/addToMarketPlace",{
                state: {
                    manufacturerId:manufacturerId,
                    manufacturerName:manufacturerName,
                    manufacturerLogo:manufacturerLogo,
                    pid:pid,
                    productName:productName,
                    iid:iid,
                    inventoryName:inventoryName,
                }
            });
      }

      const goToRemoveFromMarketplace = () => {
            navigate("/man/inventoryList/showProduct/showBatch/removeFromMarketPlace",{
                state: {
                    manufacturerId:manufacturerId,
                    manufacturerName:manufacturerName,
                    manufacturerLogo:manufacturerLogo,
                    pid:pid,
                    productName:productName,
                    iid:iid,
                    inventoryName:inventoryName,
                }
            });
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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Inventory </p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Product</p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Batch</p></Breadcrumb.Item>
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
                                    <img
                                    src="https://pngimg.com/d/gift_PNG100238.png"
                                    alt="Avatar"
                                    style={{ marginRight: '10px', width: '50px', height: '50px' }}
                                    />
                                    {productName}
                                </p>
                            </div>

                            <div style={{display:'flex', justifyContent:'center'}}>
                                <p style={{color:'#001529',fontSize:'50px',fontFamily:'Kalam',flex:'1'}}>Batches in {inventoryName}:</p>
                                <div style={{flex:'1', display:'flex', justifyContent:'right', justifySelf:'right'}}>
                                    <div onClick={goToShiftBatch} style={{cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',paddingLeft:'5px' }}>
                                        <ShoppingCartOutlined style={{ fontSize: '50px', color: '#08c', marginLeft: '30px' }} />
                                        <p style={{ fontFamily: 'Kalam', alignSelf: 'center',  marginLeft: '30px' }}>Shift Product</p>
                                    </div>

                                    <div onClick={goToBatchSale} style={{cursor:'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',paddingLeft:'10px' }}>
                                        <TagsOutlined style={{cursor: 'pointer', fontSize: '50px', color: '#08c', marginLeft: '30px' }} />
                                        <p style={{ fontFamily: 'Kalam', alignSelf: 'center', marginLeft: '30px'}}>Offer Sale/Discount</p>
                                    </div>


                                    <div onClick={goToAddToMarketplace} style={{cursor:'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',paddingLeft:'10px' }}>
                                        <PlusCircleTwoTone style={{cursor: 'pointer', fontSize: '50px', color: '#08c', marginLeft: '30px' }} />
                                        <p style={{ fontFamily: 'Kalam', alignSelf: 'center', marginLeft: '30px'}}>Add to Marketplace</p>
                                    </div>

                                    <div onClick={goToRemoveFromMarketplace} style={{cursor:'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',paddingLeft:'10px' }}>
                                        <MinusCircleTwoTone  style={{cursor: 'pointer', fontSize: '50px', color: '#08c', marginLeft: '30px' }} />
                                        <p style={{ fontFamily: 'Kalam', alignSelf: 'center', marginLeft: '30px'}}>Remove From Marketplace</p>
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
                        
                            {
                                (batchList != undefined && batchList.length != 0) && batchList.batches.map((batch, index) => {
                                   
                                       return(
                                        <BatchesInInventoryCard key = {index} value={{
                                            batch : batch
                                        }} />
                                       );
                                        // console.log(product.Product);
                                    
                                    
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

export default InventoryShowBatch;