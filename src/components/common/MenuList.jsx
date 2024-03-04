import {Menu, Select} from 'antd';
import {HomeOutlined,
        ProfileOutlined,
        HistoryOutlined,
        ShoppingCartOutlined,
        NotificationOutlined,
        AreaChartOutlined,
        ShopOutlined,
        PoweroffOutlined,
        DropboxOutlined,
        SettingOutlined,
        CreditCardOutlined
} from '@ant-design/icons';
import { useState, useEffect, } from "react";

import {useNavigate} from 'react-router-dom';

import '../../assets/css/Sidebar.css';
import LeaseManagement from '../../pages/LeaseManagement/LeaseManagement';

const MenuList = (props) => {

    const navigate = useNavigate();
    const [notification, setNotification] = useState([]);


    let response,receivedData;
    useEffect(() => {
        const fetchData = async () => {

           
            let data = {
                mid: props.value.manufacturerId
            }

            try{
                response = await fetch(import.meta.env.VITE_API_URL+'/notification/unreadNotificationsManufacturer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    });
            
                    receivedData = await response.json();
                    setNotification(receivedData.notifications);
            
            }
            catch(error){
                console.log("Error while fetching notifications");
            }

        };
    
        fetchData();
      }, []);


    //* Navigation
    const goToInventoryPage = () => {
        navigate("/man/inventoryList", {state:{manufacturerId: props.value.manufacturerId
                                                ,manufacturerName: props.value.manufacturerName
                                                ,manufacturerLogo: props.value.manufacturerLogo}});
    }
    const goToHomePage = () => {
        navigate("/man/home", {state:{manufacturerId: props.value.manufacturerId
                                                ,manufacturerName: props.value.manufacturerName
                                                ,manufacturerLogo: props.value.manufacturerLogo}});
    }
    const goToProductionHousePage = () => {
        navigate("/man/productionHouseList", {state:{manufacturerId: props.value.manufacturerId,
                                                    manufacturerName: props.value.manufacturerName,
                                                    manufacturerLogo: props.value.manufacturerLogo}});
    }
    const goToProductListPage = () => {
        navigate("/man/productList", {state:{manufacturerId: props.value.manufacturerId,
                                                    manufacturerName: props.value.manufacturerName,
                                                    manufacturerLogo: props.value.manufacturerLogo}});
    }

    const goToOrderManagementPage = () => {
        navigate("/man/orderManagement", {state:{manufacturerId: props.value.manufacturerId,
                                                    manufacturerName: props.value.manufacturerName,
                                                    manufacturerLogo: props.value.manufacturerLogo}});
    }


    const goToLeaseManagementPage = () => {
        navigate("/man/leaseManagement", {state:{manufacturerId: props.value.manufacturerId,
                                                    manufacturerName: props.value.manufacturerName,
                                                    manufacturerLogo: props.value.manufacturerLogo}});
    }


    const goToVoucherPage = () => {
        navigate("/man/myVouchers", {state:{manufacturerId: props.value.manufacturerId,
                                                    manufacturerName: props.value.manufacturerName,
                                                    manufacturerLogo: props.value.manufacturerLogo}});
    }

    const goToUnreadNotificationPage = () => {
        navigate("/man/notification/unread", {state:{manufacturerId: props.value.manufacturerId,
                                                    manufacturerName: props.value.manufacturerName,
                                                    manufacturerLogo: props.value.manufacturerLogo}});
    }


    const goToProfilePage = () => {
        navigate("/man/profile", {state:{manufacturerId: props.value.manufacturerId,
                                                    manufacturerName: props.value.manufacturerName,
                                                    manufacturerLogo: props.value.manufacturerLogo}});

    }

    const goToDataAnalyticsPage = () => {
        navigate("/man/dataAnalytics", {state:{manufacturerId: props.value.manufacturerId,
                                                    manufacturerName: props.value.manufacturerName,
                                                    manufacturerLogo: props.value.manufacturerLogo}});
    }


    const signout = () => {
        navigate("/");
    }

    return (
        <div style={{ overflowY:'auto'}}>
        <Menu theme='dark' mode='inline' className='menu-bar' style={{fontFamily:'Kalam',fontSize:'15px'}}>
            <Menu.Item key="home" icon={<HomeOutlined />} onClick={goToHomePage} className="menu-item">
                Home
            </Menu.Item>
            <Menu.Item onClick={goToProfilePage} key="Profile" icon={<ProfileOutlined />} className="menu-item">
                Profile
            </Menu.Item>
            <Menu.Item key="notification" icon={<NotificationOutlined />} onClick={goToUnreadNotificationPage} className="menu-item">
                Notification
                {
                    notification.length != 0 ? <span style={{color:'red',fontSize:'15px'}}>({notification.length})</span> : null
                }
            </Menu.Item>
            <Menu.Item key="history" icon={<HistoryOutlined />} onClick={goToOrderManagementPage} className="menu-item">
                Order Management
            </Menu.Item>
            <Menu.Item key="inventory" icon={<ShoppingCartOutlined />} onClick={goToInventoryPage} className="menu-item">
                Inventory
            </Menu.Item>
            <Menu.Item key="production" icon={<ShopOutlined />} onClick={goToProductionHousePage} className="menu-item">
                Production House
            </Menu.Item>
            <Menu.Item key="products" icon={<DropboxOutlined />} onClick={goToProductListPage} className="menu-item">
                Products
            </Menu.Item>
            <Menu.Item key="leaseManagement" icon={<SettingOutlined />} onClick={goToLeaseManagementPage} className="menu-item">
                LeaseManagement
            </Menu.Item>
            <Menu.Item key="leaseManagement" icon={<CreditCardOutlined />} onClick={goToVoucherPage} className="menu-item">
                Voucher
            </Menu.Item>
            <Menu.Item onClick={goToDataAnalyticsPage} key="data" icon={<AreaChartOutlined />} className="menu-item">
                Data Analytics
            </Menu.Item>
            <Menu.Item key="signout" icon={<PoweroffOutlined color='red' /> } className="menu-item" onClick={signout}>
                SignOut
            </Menu.Item>

        </Menu>
        </div>
    );
}

export default MenuList;