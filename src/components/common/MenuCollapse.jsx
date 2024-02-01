import { useState, useEffect} from "react";
import { Layout, Button, theme} from "antd";
const {Header} = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";

function MenuCollapse ({ sendDataToParent }){
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const [marginLeft, setMarginLeft] = useState(200);


    const toggleCollapsed = () => {
        console.log(collapsed);
        setCollapsed(!collapsed);
        if(marginLeft === 200){
            setMarginLeft(80);
        }else{
            setMarginLeft(200);
        }
    };

    useEffect(() => {
        sendDataToParent(collapsed);
    }, [collapsed]);

    return (
        <Header style={{marginLeft, padding:0, background: colorBgContainer}}>      
            <Button  
                type="text"
                className="toggle"
                onClick={toggleCollapsed}
                icon = {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
        </Header>
    );
}

export default MenuCollapse;