import { Row, Col, Card, Button,Typography } from 'antd';
const { Meta } = Card;
const { Title } = Typography;


import ShopImage from '../assets/images/shop.svg';
import ManufacturerImage from '../assets/images/manufacturer1.svg';

function JoinNow(){
    return(
        <div className="block featureBlock" id='join'>
            <div className="container-fluid" style={{justifyContent:'center'}}>
                <Row gutter={[48, 32]}>
                    <Col span={12} >
                        <Card
                            hoverable
                            cover={<img alt="example" src={ShopImage} />}
                        >
                            <Meta title={<Title style={{fontFamily:'Kalam'}}level={2}>Step into a retail revolution! </Title>} />
                            <Button type="primary" style={{marginTop:'20px', size:'50%'}}><h3 style={{fontFamily:'Kalam'}}><a href="https://reman-retailer.vercel.app/reg" style={{color:'#fff'}}>Join As Retailer</a></h3></Button>

                        </Card> 
                    </Col>
                    <Col span={12} >  
                        <Card
                                hoverable
                                
                                cover={<img alt="example" src={ManufacturerImage} />}
                            >
                                <Meta title={<Title style={{fontFamily:'Kalam'}}level={2}>Manufacture with Confidence!  </Title>} />
                                <Button type="primary" style={{marginTop:'20px', size:'50%'}}><h3 style={{fontFamily:'Kalam'}}>Join As Manufacturer</h3></Button>
                        </Card>
        
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default JoinNow;