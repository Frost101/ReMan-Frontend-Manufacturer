import React from "react";
import { Button, Carousel } from "antd";


const carouselItems = [
    {
        key: "1",
        title: "Endless Possibilities",
        content: "Explore a vast array of products from top-notch manufacturers, unlocking endless possibilities for your retail business to thrive",
    },
    {
        key: "2",
        title: "Take advantage of the countrys largest retail distribution network",
        content: "Unlock unparalleled opportunities for your business by leveraging the country's largest retail distribution network. Connect seamlessly with manufacturers and tap into a vast marketplace, propelling your products to new heights and reaching customers far and wide",
    },
    {
        key: "3",
        title: "We are here to help you grow your business",
        content: "At ReMan, our mission is simple: to help you grow your business. Whether you're a manufacturer seeking wider reach or a retailer aiming for expanded product offerings, we provide the tools and connections to fuel your success. Join us on the journey of growth and prosperity.",
    }
]



function LandingHero(){
    return (
        <div className="heroBlock">
                <Carousel autoplay = {true} autoplaySpeed={2500} infinite={true}>
                    {
                        carouselItems.map(item => {
                            return (
                                <div key={item.id} className="container-fluid">
                                    <div className="content">
                                        <h1 style={{fontFamily:'Kalam', fontSize:'40px'}}>{item.title}</h1>
                                        <p style={{fontFamily:'Kalam'}}>{item.content}</p>
                                        <div className="btnHolder">
                                            <Button type="primary" style={{fontFamily:'Kalam'}} size="large"><a href='#join'>Join Today</a></Button>
                                            <Button size="large" style={{fontFamily:'Kalam'}} ><i className="fas fa-desktop"></i> Watch a Demo</Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Carousel>
        </div>
    );
}


export default LandingHero;