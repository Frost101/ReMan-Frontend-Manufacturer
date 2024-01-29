import {Menu} from 'antd';
import {HomeOutlined,
        ProfileOutlined,
        HistoryOutlined,
        ShoppingCartOutlined,
        NotificationOutlined,
        AreaChartOutlined,
        ShopOutlined,
        PoweroffOutlined
} from '@ant-design/icons';

import '../../assets/css/Sidebar.css';

const MenuList = () => {
    return (
        <Menu theme='dark' mode='inline' className='menu-bar' style={{fontFamily:'Kalam',fontSize:'15px'}}>
            <Menu.Item key="home" icon={<HomeOutlined />} className="menu-item">
                Home
            </Menu.Item>
            <Menu.Item key="Profile" icon={<ProfileOutlined />} className="menu-item">
                Profile
            </Menu.Item>
            <Menu.Item key="history" icon={<HistoryOutlined />} className="menu-item">
                Order History
            </Menu.Item>
            <Menu.Item key="inventory" icon={<ShoppingCartOutlined />} className="menu-item">
                Inventory
            </Menu.Item>
            <Menu.Item key="production" icon={<ShopOutlined />} className="menu-item">
                Production House
            </Menu.Item>
            <Menu.Item key="notification" icon={<NotificationOutlined />} className="menu-item">
                Notification
            </Menu.Item>
            <Menu.Item key="data" icon={<AreaChartOutlined />} className="menu-item">
                Data Analytics
            </Menu.Item>
            <Menu.Item key="signout" icon={<PoweroffOutlined color='red' />} className="menu-item">
                SignOut
            </Menu.Item>

        </Menu>
    );
}

export default MenuList;