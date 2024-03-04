import { Layout, Button, theme, Breadcrumb,  Col, Row, Statistic, Card } from "antd";
import CountUp from 'react-countup';
const {Header,Content, Sider} = Layout;
import { CodeSandboxCircleFilled,HomeOutlined,BankTwoTone, SettingTwoTone, HourglassTwoTone, ArrowUpOutlined, DropboxOutlined, DollarTwoTone } from "@ant-design/icons";
import { useState, useEffect} from "react";
import MenuList from "../../components/common/MenuList"
import MenuCollapse from "../../components/common/MenuCollapse";
import CustomFooter from "../../components/CustomFooter";
import {useLocation, useNavigate} from 'react-router-dom';
const { Meta } = Card;

const formatter = (value) => <CountUp end={value} separator="," />;

function HomePage(){
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [manInfo, setManInfo] = useState({manInfo:[]});
    const [inventoryList, setInventoryList] = useState([]);
    const [productionHouseList, setProductionHouseList] = useState([]);
    const [countInfo, setCountInfo] = useState(
        {
            "InventoryCount": 0,
            "ProductionHouseCount": 0,
            "DistinctProductCount": 0,
            "BatchCount": 0,
            "CategoryCount": 0,
            "TotalProductCount": 0,
            "TotalOrderCount": 0,
            "TodayIncome": 0
          }
    );
    const {
        token: { colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const [marginLeft, setMarginLeft] = useState(200);
    const location = useLocation();
    const manufacturerId = location.state.manufacturerId;


    let response,receivedData;
    useEffect(() => {
        const fetchData = async () => {
            let data = {
                manufacturerId: manufacturerId
            }
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/manufacturer/info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                setManInfo(receivedData);
            }
            catch(error){
        
            }



            data = {
                manufacturerId: manufacturerId
            }
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/inventory/inventoryList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                setInventoryList(receivedData.inventories);
                console.log(receivedData.inventories);
                
            }
            catch(error){
                console.log(error);
            }


            data = {
                manufacturerId: manufacturerId
            }
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/productionhouse/productionHouseList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                setProductionHouseList(receivedData.productionHouses);
            }
            catch(error){
                console.log("Error");
            }



            data = {
                manufacturerId: manufacturerId
            }
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/manufacturer/countInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                setCountInfo(receivedData);
            }
            catch(error){
                console.log("Error");
            }
        };
    
        fetchData();
      }, []); 


    const goToInventoryPage = () => {
        navigate("/man/inventoryList", {state:{manufacturerId: manufacturerId
                                                ,manufacturerName: manInfo.Name
                                                ,manufacturerLogo: manInfo.Image}});
    }
    const goToProductionHousePage = () => {
        navigate("/man/productionHouseList", {state:{manufacturerId: manufacturerId,
                                                    manufacturerName: manInfo.Name,
                                                    manufacturerLogo: manInfo.Image}});
    }
    const goToProductListPage = () => {
        navigate("/man/productList", {state:{manufacturerId: manufacturerId,
                                                    manufacturerName: manInfo.Name,
                                                    manufacturerLogo: manInfo.Image}});
    }


    const handleMenuCollapse = (collapsed) => {
        setCollapsed(collapsed);
        if(collapsed){
            setMarginLeft(80);
        }
        else{
            setMarginLeft(200);
        }
    };

    return(
        <div>
            <Layout>
                <Sider 
                collapsed={collapsed}
                collapsible
                trigger={null} 
                className="sidebar"
                style={{position:'fixed'}}>
                <div className="logo" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center',marginBottom:'10px', padding:'10px' }}>
                        <CodeSandboxCircleFilled style={{ fontSize: '45px', color: '#08c', marginTop:'10px', display:'flex', alignItems:'center', justifyContent:'center' }} />
                    </div>
                    <div>
                    <p style={{fontSize:'25px', margin: '0', marginLeft: '4px', marginTop:'5px', fontFamily:'Chewy', color:'#fff'}}>REMAN</p>
                </div>
                </div>
                
                <MenuList  value={{manufacturerId:manufacturerId,
                                    manufacturerName: manInfo.Name,
                                    manufacturerLogo: manInfo.Image}}/>
                </Sider>
                <Layout style={{marginLeft, minHeight:'100vh'}}>
                    <MenuCollapse  sendDataToParent={handleMenuCollapse}/>
                    <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                    >
                        <Breadcrumb
                            style={{
                            margin: '65px 0 0 0',
                            display: 'flex',
                            justifyContent: 'left',
                            }}
                        >
                            <Breadcrumb.Item><HomeOutlined style={{color:'Black', fontSize:'20px'}}/></Breadcrumb.Item>
                            <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Manufacturer</p></Breadcrumb.Item>
                            <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Home</p></Breadcrumb.Item>
                        </Breadcrumb>


                
                        <Content
                            style={{
                            paddingTop: 0,
                            paddingLeft: 24,
                            paddingRight: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            }}
                        >

                            <div style={{display:'flex', alignContent:'center', textAlign:'center', justifyContent:'center'}}>
                                <p style={{fontFamily:'Lobster', fontSize: '60px',textAlign:'center', color:'#001515'}}> Welcome, {manInfo.Name}</p>
                                <div className="logo" style={{ textAlign: 'center', margin:'1%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center',marginBottom:'10px', padding:'10%' }}>
                                            {/* <CodeSandboxCircleFilled style={{ fontSize: '45px', color: '#08c', display:'flex', alignItems:'center', justifyContent:'center' }} /> */}
                                            <img src = {manInfo.Image} style={{width:'70px', height:'70px', borderRadius:'50%'}}/>
                                        </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign:'center' }}>
                            <Row gutter={16} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Col span={8} >
                                    <Card
                                        hoverable
                                        style={{ width: '100%'}}
                                        cover={<img alt="example" src="https://firebasestorage.googleapis.com/v0/b/reman-manufacturer.appspot.com/o/Misc%2Finv2.svg?alt=media&token=2e180a7f-5d3b-49e9-a213-850d01d07010" />}
                                    >
                                        <Meta title=" Explore your inventories " style={{fontFamily:'Kalam'}} description={<Button type="primary" onClick={goToInventoryPage} style={{fontFamily:'Lobster'}}> Inventory</Button>} />
                                    </Card>
                                </Col>

                                <Col span={8}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%' }}
                                        cover={<img alt="example" src="https://firebasestorage.googleapis.com/v0/b/reman-manufacturer.appspot.com/o/Misc%2Fproductionhouse.svg?alt=media&token=24bf19e4-3b49-4026-b8ba-c538d231eaea" />}
                                    >
                                        <Meta title=" Explore your production houses " style={{fontFamily:'Kalam'}} description={<Button type="primary" onClick={goToProductionHousePage} style={{fontFamily:'Lobster'}}> Production House</Button>} />
                                    </Card>
                                </Col>

                                <Col span={8}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%' }}
                                        cover={<img alt="example" src="https://firebasestorage.googleapis.com/v0/b/reman-manufacturer.appspot.com/o/Misc%2Fproducts.svg?alt=media&token=cb65e1b8-6dd4-476d-bf6b-a12007ec4458" />}
                                    >
                                        <Meta title=" View your products " style={{fontFamily:'Kalam'}} description={<Button type="primary" onClick={goToProductListPage} style={{fontFamily:'Lobster'}}> Products</Button>} />
                                    </Card>

                                </Col>

                            </Row>
                            </div>


                            
                            <Row gutter={16}>
                                <Col span={5}>
                                    <Card
                                        hoverable
                                        style={{
                                            border: '1px solid #d9d9d9',
                                            borderRadius: '8px',
                                            margin: '16px',
                                            transition: 'border-color 0.5s, box-shadow 0.5s',
                                            textAlign: 'center',
                                            width:'90%',
                                            height:'auto',
                                        }}
                                    >
                                    <Statistic title={<p style={{fontFamily:'Lobster',color:'#001515',textAlign:'center', fontSize:'25px'}}>Total Inventories</p>}
                                    prefix={<BankTwoTone />}
                                    valueStyle={{fontFamily:'Lobster', color: 'blue', fontSize:'25px', textAlign:'center'}}
                                    value={inventoryList.length}
                                    formatter={formatter} />
                                    </Card>
                                </Col>
                                <Col span={5}>
                                    <Card
                                        hoverable
                                        style={{
                                            border: '1px solid #d9d9d9',
                                            borderRadius: '8px',
                                            margin: '16px',
                                            transition: 'border-color 0.5s, box-shadow 0.5s',
                                            textAlign: 'center',
                                            width:'90%',
                                            height:'auto',
                                        }}
                                    >
                                    <Statistic title={<p style={{fontFamily:'Lobster',color:'#001515',textAlign:'center', fontSize:'25px'}}>Production Houses</p>}
                                    prefix={<SettingTwoTone />}
                                    valueStyle={{fontFamily:'Lobster', color: 'blue', fontSize:'25px', textAlign:'center'}}
                                    value={productionHouseList.length}
                                    formatter={formatter} />
                                    </Card>
                                </Col>
                                <Col span={4}>
                                    <Card
                                        hoverable
                                        style={{
                                            border: '1px solid #d9d9d9',
                                            borderRadius: '8px',
                                            margin: '16px',
                                            transition: 'border-color 0.5s, box-shadow 0.5s',
                                            textAlign: 'center',
                                            width:'90%',
                                            height:'auto',
                                        }}
                                    >
                                    <Statistic title={<p style={{fontFamily:'Lobster',color:'#001515',textAlign:'center', fontSize:'25px'}}>Total Products</p>}
                                    prefix={<DropboxOutlined />}
                                    valueStyle={{fontFamily:'Lobster', color: 'blue', fontSize:'25px', textAlign:'center'}}
                                    value={countInfo.DistinctProductCount}
                                    formatter={formatter} />
                                    </Card>
                                </Col>
                                <Col span={5}>
                                    <Card
                                        hoverable
                                        style={{
                                            border: '1px solid #d9d9d9',
                                            borderRadius: '8px',
                                            margin: '16px',
                                            transition: 'border-color 0.5s, box-shadow 0.5s',
                                            textAlign: 'center',
                                            width:'90%',
                                            height:'auto',
                                        }}
                                    >
                                    <Statistic title={<p style={{fontFamily:'Lobster',color:'#001515',textAlign:'center', fontSize:'25px'}}>Orders Count</p>}
                                    prefix={<HourglassTwoTone />}
                                    suffix={<ArrowUpOutlined />}
                                    valueStyle={{fontFamily:'Lobster', color: '#3f8600', fontSize:'25px', textAlign:'center'}}
                                    value={countInfo.TotalOrderCount}
                                    formatter={formatter} />
                                    </Card>
                                </Col>
                                <Col span={5}>
                                    <Card
                                        hoverable
                                        style={{
                                            border: '1px solid #d9d9d9',
                                            borderRadius: '8px',
                                            margin: '16px',
                                            transition: 'border-color 0.5s, box-shadow 0.5s',
                                            textAlign: 'center',
                                            width:'90%',
                                            height:'auto',
                                        }}
                                    >
                                    <Statistic title={<p style={{fontFamily:'Lobster',color:'#001515',textAlign:'center', fontSize:'25px'}}>Today's Income</p>}
                                    suffix={<ArrowUpOutlined />}
                                    prefix={<DollarTwoTone />}
                                    valueStyle={{fontFamily:'Lobster', color: '#3f8600', fontSize:'25px', textAlign:'center'}}
                                    value={countInfo.TodayIncome}
                                    formatter={formatter} />
                                    </Card>
                                </Col>
                            </Row>
                            
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

export default HomePage;