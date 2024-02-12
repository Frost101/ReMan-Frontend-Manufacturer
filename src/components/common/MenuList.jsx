import {Menu, Select} from 'antd';
import {HomeOutlined,
        ProfileOutlined,
        HistoryOutlined,
        ShoppingCartOutlined,
        NotificationOutlined,
        AreaChartOutlined,
        ShopOutlined,
        PoweroffOutlined,
        DropboxOutlined
} from '@ant-design/icons';

import {useNavigate} from 'react-router-dom';

import '../../assets/css/Sidebar.css';

const MenuList = (props) => {

    const navigate = useNavigate();


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

    const signout = () => {
        navigate("/");
    }

    return (
        <Menu theme='dark' mode='inline' className='menu-bar' style={{fontFamily:'Kalam',fontSize:'15px'} }>
            <Menu.Item key="home" icon={<HomeOutlined />} onClick={goToHomePage} className="menu-item">
                Home
            </Menu.Item>
            <Menu.Item key="Profile" icon={<ProfileOutlined />} className="menu-item">
                Profile
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
            <Menu.Item key="notification" icon={<NotificationOutlined />} className="menu-item">
                Notification
            </Menu.Item>
            <Menu.Item key="data" icon={<AreaChartOutlined />} className="menu-item">
                Data Analytics
            </Menu.Item>
            <Menu.Item key="signout" icon={<PoweroffOutlined color='red' /> } className="menu-item" onClick={signout}>
                SignOut
            </Menu.Item>

        </Menu>
    );
}

export default MenuList;