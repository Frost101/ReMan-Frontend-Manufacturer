import { Layout, theme, Breadcrumb, Spin, List, Input, Select, Space, Avatar } from "antd";
import MenuList from "../../components/common/MenuList";
const {Content, Sider} = Layout;
import { useState, useEffect} from "react";
import { CodeSandboxCircleFilled,SearchOutlined, HomeOutlined, CreditCardTwoTone, PlusCircleFilled} from "@ant-design/icons";
import MenuCollapse from "../../components/common/MenuCollapse";
import CustomFooter from "../../components/CustomFooter";
import {useLocation, useNavigate} from 'react-router-dom';
import VoucherCard from "../../components/Vouchers/VoucherCard";

function MyVouchers(){
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


    const [loading, setLoading] = useState(false); 
    const [filterValue, setFilterValue] = useState('all');

    const [voucherList, setVoucherList] = useState([]);
    const [showVoucherList, setShowVoucherList] = useState([]);




    let response,receivedData;
    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);
            let data = {
                manufacturerId: manufacturerId
            }
            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/vouchers/fetchVouchersByManufacturer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        
                receivedData = await response.json();
                setLoading(false);
                setVoucherList(receivedData);
                setShowVoucherList(receivedData);
                
            }
            catch(error){
                console.log("Error");
            }
        };
    
        fetchData();
      }, []); 


      const doSearch = (value) => {

            if(value == ''){
                setShowVoucherList(voucherList);
            }
            else{
                let temp = showVoucherList.filter((voucher) => {
                    if(voucher.VoucherCode.toLowerCase().includes(value.toLowerCase())){
                        return voucher;
                    }
                });
                setShowVoucherList(temp);
            }

      }



      const setFilter = (value) => {
            setFilterValue(value);

            if(value == 'all'){
                setShowVoucherList(voucherList);
            }
            else if(value == 'dateLH'){
                let temp = voucherList;
                temp.sort((a,b) => {
                    return new Date(a.Validity) - new Date(b.Validity);
                });
                setShowVoucherList(temp);
            }
            else if(value == 'dateHL'){
                let temp = voucherList;
                temp.sort((a,b) => {
                    return new Date(b.Validity) - new Date(a.Validity);
                });
                setShowVoucherList(temp);
            }
            else if(value == 'discountLH'){
                let temp = voucherList;
                temp.sort((a,b) => {
                    return a.VoucherPercentage - b.VoucherPercentage;
                });
                setShowVoucherList(temp);
            }
            else if(value == 'discountHL'){
                let temp = voucherList;
                temp.sort((a,b) => {
                    return b.VoucherPercentage - a.VoucherPercentage;
                });
                setShowVoucherList(temp);
            }
            else if(value == 'maxUsageLH'){
                let temp = voucherList;
                temp.sort((a,b) => {
                    return a.MaxUsage - b.MaxUsage;
                });
                setShowVoucherList(temp);
            }
            else if(value == 'maxUsageHL'){
                let temp = voucherList;
                temp.sort((a,b) => {
                    return b.MaxUsage - a.MaxUsage;
                });
                setShowVoucherList(temp);
            }            
      }

      const goToAddNewVoucherPage = () => {
        navigate("/man/myVouchers/addNew", {state:{manufacturerId: manufacturerId,
                                                    manufacturerName: manufacturerName,
                                                    manufacturerLogo: manufacturerLogo}});
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
                                    <Breadcrumb.Item><p style={{fontFamily:'Kalam', color:'Highlight', fontSize:'20px'}}>Voucher </p></Breadcrumb.Item>
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
                               
                                 <p style={{color:'#001529',fontSize:'50px',fontFamily:'Kalam'}}>Available Vouchers</p>
                                
                            </div>

                            <div style={{ display:'flex', justifyContent:'right', justifySelf:'right'}}>
                                    <div onClick={goToAddNewVoucherPage} style={{cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',paddingLeft:'5px' }}>
                                        <PlusCircleFilled style={{ fontSize: '50px', color: '#08c', marginLeft: '30px' }} />
                                        <p style={{ fontFamily: 'Kalam', alignSelf: 'center',  marginLeft: '30px' }}>Add New Voucher</p>
                                    </div>
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
                                            <Select.Option value="all"   key={"0"} style={{fontFamily:'Kalam'}}>All Vouchers</Select.Option>
                                            <Select.Option value="dateLH"  key={"2"} style={{fontFamily:'Kalam'}}>Sort by validity(Low to high)</Select.Option>
                                            <Select.Option value="dateHL"  key={"3"} style={{fontFamily:'Kalam'}}>Sort by validity(High to Low)</Select.Option>
                                            <Select.Option value="discountLH"  key={"4"} style={{fontFamily:'Kalam'}}>Sort by discount(Low to high)</Select.Option>
                                            <Select.Option value="discountHL"  key={"5"} style={{fontFamily:'Kalam'}}>Sort by discount(High to Low)</Select.Option>
                                            <Select.Option value="maxUsageLH"  key={"6"} style={{fontFamily:'Kalam'}}>Sort by max usage(Low to high)</Select.Option>
                                            <Select.Option value="maxUsageHL"  key={"7"} style={{fontFamily:'Kalam'}}>Sort by max usage(High to Low)</Select.Option>
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
                                (showVoucherList != undefined && showVoucherList.length != 0) &&
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
                                    dataSource={showVoucherList}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <VoucherCard value={
                                                {
                                                    voucher: item,
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

export default MyVouchers;