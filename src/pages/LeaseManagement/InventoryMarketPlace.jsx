import { Layout, theme, Breadcrumb, Spin, List, Input, Select, Space } from "antd";
import MenuList from "../../components/common/MenuList";
const {Content, Sider} = Layout;
import { useState, useEffect} from "react";
import { CodeSandboxCircleFilled,SearchOutlined, HomeOutlined, FilterTwoTone} from "@ant-design/icons";
import MenuCollapse from "../../components/common/MenuCollapse";
import CustomFooter from "../../components/CustomFooter";
import {useLocation, useNavigate} from 'react-router-dom';
import InventoryMarketplaceCard from "../../components/LeaseManagement/InventoryMarketplaceCard";

function InventoryMarketPlace(){
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


    const [inventoryList, setInventoryList] = useState([]);
    const [showInventoryList, setShowInventoryList] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [filterValue, setFilterValue] = useState('all');




    let response,receivedData;
    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);
            let data = {
                mid: manufacturerId
            }
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/leaseInventory/inventoryMarketplace', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                setLoading(false);
                setInventoryList(receivedData);
                setShowInventoryList(receivedData);
                
            }
            catch(error){
                console.log("Error");
            }
        };
    
        fetchData();
      }, []); 


      const doSearch = (value) => {

        if(filterValue == 'all'){
            setShowInventoryList(inventoryList);
        }
        else if(filterValue == 'manufacturerName'){
            //* Perform a substring search on manufacturer name
            let tmpInventoryList = [];
            inventoryList.map((item) => {
                if(item.OwnerName.toLowerCase().includes(value.toLowerCase())){
                    tmpInventoryList.push(item);
                }
            });   
            setShowInventoryList(tmpInventoryList);
        }
        else if(filterValue == 'location'){
            //* Perform a sub string search on location
            let tmpInventoryList = [];
            inventoryList.map((item) => {

                let tmpLocation = item.AddressDetails.toLowerCase() + " " + item.Division.toLowerCase() + " " + item.Thana.toLowerCase() + " " + item.Street.toLowerCase() + item.HouseNumber.toLowerCase();
                if(tmpLocation.includes(value.toLowerCase())){
                    tmpInventoryList.push(item);
                }
            });
            
            setShowInventoryList(tmpInventoryList);
        }
        else if(filterValue == 'rentLowToHigh'){
            let tmpInventoryList = inventoryList;
            tmpInventoryList.sort((a,b) => {
                return a.PerDayRent - b.PerDayRent;
            });

            setShowInventoryList(tmpInventoryList);
        }
        else if(filterValue == 'rentHighToLow'){
            let tmpInventoryList = inventoryList;
            tmpInventoryList.sort((a,b) => {
                return b.PerDayRent - a.PerDayRent;
            });
            setShowInventoryList(tmpInventoryList);
        }
        else if(filterValue == 'sizeLowToHigh'){

            let tmpInventoryList = inventoryList;
            tmpInventoryList.sort((a,b) => {
                return a.Capacity - b.Capacity;
            });
            setShowInventoryList(tmpInventoryList);
        }
        else if(filterValue == 'sizeHighToLow'){
            let tmpInventoryList = inventoryList;
            tmpInventoryList.sort((a,b) => {
                return b.Capacity - a.Capacity;
            });
            setShowInventoryList(tmpInventoryList);
        }
        else if(filterValue == 'type'){
            let tmpInventoryList = [];
            inventoryList.map((item) => {
                if(item.Type.toLowerCase().includes(value.toLowerCase())){
                    tmpInventoryList.push(item);
                }
            });
            setShowInventoryList(tmpInventoryList);
        }
      }



      const setFilter = (value) => {
            setFilterValue(value);

            if(value == 'all'){
                setShowInventoryList(inventoryList);
            }
            else if(value == 'manufacturerName'){
                //* Perform a   
            }
            else if(value == 'location'){
                //* Perform a sub string search on location
                
            }
            else if(value == 'rentLowToHigh'){
                let tmpInventoryList = inventoryList;
                tmpInventoryList.sort((a,b) => {
                    return a.PerDayRent - b.PerDayRent;
                });
                setShowInventoryList(tmpInventoryList);
            }
            else if(value == 'rentHighToLow'){
                let tmpInventoryList = inventoryList;
                tmpInventoryList.sort((a,b) => {
                    return b.PerDayRent - a.PerDayRent;
                });
                setShowInventoryList(tmpInventoryList);
            }
            else if(value == 'sizeLowToHigh'){

                let tmpInventoryList = inventoryList;
                tmpInventoryList.sort((a,b) => {
                    return a.Capacity - b.Capacity;
                });
                setShowInventoryList(tmpInventoryList);
            }
            else if(value == 'sizeHighToLow'){
                let tmpInventoryList = inventoryList;
                tmpInventoryList.sort((a,b) => {
                    return b.Capacity - a.Capacity;
                });
                setShowInventoryList(tmpInventoryList);
            }
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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'black', fontSize:'20px'}}>Lease Management</p></Breadcrumb.Item>
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Inventory Marketplace </p></Breadcrumb.Item>
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
                             <div style={{display:'flex', justifyContent:'center'}}>
                                <p style={{color:'#001529',fontSize:'50px',fontFamily:'Kalam'}}>Welcome To Inventory Marketplace</p>
                                
                            </div>



                            <div style={{flex:'3', display:'flex', justifyContent:'right', justifySelf:'left'}}>
                                    <div style={{flex:'1', justifyContent:'center', justifySelf:'left'}}>
                                        <p style={{ color:'#001529', fontFamily:'Kalam'}}>Search here:</p>
                                        <Input
                                            onChange={(e) => doSearch(e.target.value)}
                                            placeholder="Search Here"
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
                                            
                                        />
                                    </div>
                                    <div style={{flex:'1', textAlign:'right', fontFamily:'Kalam'}}>
                                        <p style={{ color:'#001529'}}>Filter By:</p>
                                        <Select  onChange={setFilter} defaultValue="all" style={{fontFamily:'Kalam', border: '2px solid blue', borderRadius: '8px', width:'80%'}}>
                                            <Select.Option value="all"   key={"0"} style={{fontFamily:'Kalam'}}>All Inventories</Select.Option>
                                            <Select.Option value="manufacturerName"  style={{fontFamily:'Kalam'}} key={"1"}>by Manufacturer Name</Select.Option>
                                            <Select.Option value="location" style={{fontFamily:'Kalam'}}  key={"2"}>by Inventory Location</Select.Option>
                                            <Select.Option value="rentLowToHigh"  style={{fontFamily:'Kalam'}} key={"3"}>Per Day Rent(Low To High)</Select.Option>
                                            <Select.Option value="rentHighToLow" style={{fontFamily:'Kalam'}}  key={"4"}>Per Day Rent(High to Low)</Select.Option>
                                            <Select.Option value="sizeLowToHigh"  style={{fontFamily:'Kalam'}} key={"5"}>Size(Low To High)</Select.Option>
                                            <Select.Option value="sizeHighToLow" style={{fontFamily:'Kalam'}}  key={"6"}>Size(High to Low)</Select.Option>
                                            <Select.Option value="type" style={{fontFamily:'Kalam'}}  key={"7"}>Type</Select.Option>
                                        </Select>
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

                            {
                                (inventoryList != undefined && inventoryList.length != 0) &&
                                <List>


                                <List
                                    grid={{
                                        gutter: 16,
                                        xs: 1,
                                        sm: 2,
                                        md: 3,
                                        lg: 3,
                                        xl: 3,
                                        xxl: 3,
                                    }}
                                    dataSource={showInventoryList}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <InventoryMarketplaceCard value={
                                                {
                                                    inventory: item,
                                                    manufacturerId: manufacturerId,
                                                    manufacturerName: manufacturerName,
                                                    manufacturerLogo: manufacturerLogo
                                                }
                                            }/>
                                        </List.Item>
                                    )}
                                    />
                                      
                                </List>
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

export default InventoryMarketPlace;