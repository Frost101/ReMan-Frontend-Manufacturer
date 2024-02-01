import {Layout, ConfigProvider} from 'antd';
const {Footer} = Layout;
import {CodeSandboxCircleFilled, FacebookOutlined, TwitterOutlined, LinkedinOutlined, InstagramOutlined, MailOutlined, WhatsAppOutlined} from '@ant-design/icons';

function CustomFooter(){
    return (
        <div id = 'contact'>
            <Footer
            style={{
            textAlign: 'center',
            }}
        >
            
            <div className="logo">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center',marginBottom:'10px' }}>
                    <CodeSandboxCircleFilled style={{ fontSize: '45px', color: '#08c' }} />
                    <p style={{fontSize:'25px', margin: '0', marginLeft: '10px', fontFamily:'Chewy'}}>REMAN</p>
                </div>
            </div>
            <div className="logo">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', marginBottom:'10px' }}>
                    <FacebookOutlined style={{ fontSize: '30px', color: '#fff' }}/>
                    <TwitterOutlined style={{ fontSize: '30px', color: 'blue', marginLeft:'10px' }}/>
                    <LinkedinOutlined style={{ fontSize: '30px', color: '#0077b5', marginLeft:'10px' }}/>
                    <InstagramOutlined style={{ fontSize: '30px', color: '#fa7e1e', marginLeft:'10px' }}/>
                    <MailOutlined style={{ fontSize: '30px', color: '#3e65cf', marginLeft:'10px' }}/>
                    <WhatsAppOutlined style={{ fontSize: '30px', color: '#075E54', marginLeft:'10px' }}/>
                </div>
            </div>
            ReMan ©{new Date().getFullYear()} Powered by ReMan Team
        </Footer>
        </div>
    );
}

export default CustomFooter;