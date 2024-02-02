
import { BankOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Card} from 'antd';
const { Meta } = Card;


const ProductionHouseCard = (props) => {
  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };

  let productionHouse = props.productionHouse;
  return (
    <>
      
      <Card
        style={{
          width: '100%',
          marginTop: 16,
          borderRadius: 10, // Rounded corners
          border: '3px solid #001529',
          boxShadow: '0 0 10px #001529',
        }}
        hoverable
        onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#e6f7ff'; // Change the background color on hover
            e.currentTarget.style.transform = 'scale(1.02,1.05)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = ''; // Revert to the original background color on hover out
            e.currentTarget.style.transform = 'scale(1,1)';
        }}
      >
        <Meta
          avatar={<BankOutlined style = {{color:'#08c', fontSize: '28px'}} />}
          title={<div style={{ fontFamily: 'Kalam', fontSize: '20px' }}>{productionHouse.ProductionHouseName}</div>}
        />
        <div style={{display:'flex', paddingTop:'10px', paddingBottom: '0'}}>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Location: {productionHouse.Street + ", "+ productionHouse.Thana + ", "+ productionHouse.Division }</p>
            </div>
            <div style={{flex:'1',paddingLeft:'8px'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0', fontColor:'#001529'}}>Product Categories:  {productionHouse.Type} </p>
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Size: {productionHouse.Capacity} sqft</p>
            </div>
            <div style={{flex:'2'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Details: {productionHouse.Details} </p>
            </div>
           
        </div>
      </Card>
      
    </>
  );
};
export default ProductionHouseCard;