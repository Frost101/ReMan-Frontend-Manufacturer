import {Row, Col} from 'antd';
import { Divider } from 'antd';


const aboutItemsManufacturer = [
    {
        key: "1",
        icon: <i class="fa fa-line-chart fa-lg" aria-hidden="true"></i>,
        title: "Boost Your Sales",
        content: "Our large network of retailers ensures an increase in your sales"
    },
    {
        key: "2",
        icon: <i class="fa fa-bullhorn" aria-hidden="true"></i>,
        title: "Increase your brand visibility",
        content: "Increase your brand visibility even in areas where your distribution does not reach."
    },
    {
        key: "3",
        icon: <i class="fa fa-truck" aria-hidden="true"></i>,
        title: "Reach remote areas",
        content: "Get your products delivered to 60+ districts, even to the most hard to reach areas"
    },
    {
        key: "4",
        icon: <i class="fa fa-pie-chart" aria-hidden="true"></i>,
        title: "Maximize Profitability",
        content: "Secure Fair Pricing for Manufacturers and Retailers"
    },
]



const aboutItemsRetailer = [
    {
        key: "1",
        icon: <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        ,
        title: "One stop market",
        content: "Get all products from ReMan , no need to visit markets or talk to hundreds of salespeople"
    },
    {
        key: "2",
        icon: <i class="fa fa-usd" aria-hidden="true"></i>
        ,
        title: "Buy now pay later",
        content: "Do business with us, with a good record, you can buy products on credit"
    },
    {
        key: "3",
        icon: <i class="fa fa-cubes" aria-hidden="true"></i>
        ,
        title: "Bulk Bonanza",
        content: "Purchase in bulk and enjoy exclusive discounts. Elevate your business with cost-effective solutions"
    },
    {
        key: "4",
        icon: <i class="fa fa-bar-chart" aria-hidden="true"></i>
        ,
        title: "Data Analytics",
        content: "Leverage advanced data analytics tools to gain insights into market trends, customer preferences, and optimize your product offerings for maximum sales"
    },
]


function LandingAbout(){
    return(
        <>
        <div className="block aboutBlock" style={{backgroundColor:'#ade8f4'}}>
            <div className="container-fluid" >

                <div >
                    <div className="titleHolder">
                        <h2 style={{fontFamily:'Kalam'}}>About Us</h2>
                        <p style={{fontFamily:'Kalam'}}>Welcome to ReMan, where innovation meets collaboration in the world of commerce. We are passionate about fostering connections between manufacturers and retailers to catalyze business growth and redefine industry standards.</p>
                    </div>
                    <div className="titleHolder">
                        <h2 style={{fontFamily:'Kalam'}}>Who We Are</h2>
                        <p style={{fontFamily:'Kalam'}}>At ReMan, we are more than just a platform; we are the architects of a thriving ecosystem where businesses flourish. Founded on the principles of transparency, efficiency, and trust, we aim to revolutionize the way manufacturers and retailers interact, creating a seamless and mutually beneficial marketplace.</p>
                    </div>
                    <div className="titleHolder">
                        <h2 style={{fontFamily:'Kalam'}}>Our Vision</h2>
                        <p style={{fontFamily:'Kalam'}}>Our vision is simple — to empower businesses, big and small, by providing them with access to the country's largest retail distribution network. We believe in the transformative power of collaboration, where manufacturers can showcase their innovations, and retailers can discover new and exciting products to elevate their offerings.</p>
                    </div>
                </div>
                
            </div>
        </div>  

        <div className="block aboutBlock">
            <div className='container-fluid'>
                <div style={{ padding: '20px' }}>
                        <h2 style={{fontFamily:'Kalam', fontSize:"40px",textAlign: 'center'}}>How Manufacturers are benefitted</h2>
                        <Row gutter={[16, 16]}>
                        {
                            aboutItemsManufacturer.map(item => {
                                return (
                                    <Col md={{span: 6}} key={item.id}>
                                        <div className="content">
                                            <div style={{color:'#1890ff', fontSize:'60px'}}>
                                                {item.icon}
                                            </div>
                                            <h1 style={{fontFamily:'Kalam', color:'#00377e'}}>{item.title}</h1>
                                            <p style={{fontFamily:'Kalam'}}>{item.content}</p>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                        </Row>
                    </div>

                    <Divider style={{ borderColor: '#1890ff', borderWidth: '3px' }} />

                    <div style={{ padding: '20px' }}>
                        <h2 style={{fontFamily:'Kalam', fontSize:"40px",textAlign: 'center'}}>How Retailers are benefitted</h2>
                        <Row gutter={[16, 16]}>
                        {
                            aboutItemsRetailer.map(item => {
                                return (
                                    <Col md={{span: 6}} key={item.id}>
                                        <div className="content">
                                            <div style={{color:'#1890ff', fontSize:'60px'}}>
                                                {item.icon}
                                            </div>
                                            <h1 style={{fontFamily:'Kalam', color:'#00377e'}}>{item.title}</h1>
                                            <p style={{fontFamily:'Kalam'}}>{item.content}</p>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                        </Row>
                    </div>
                    <Divider style={{ borderColor: '#1890ff', borderWidth: '3px' }} />
            </div>
        </div>
        </>
    );
}

export default LandingAbout;