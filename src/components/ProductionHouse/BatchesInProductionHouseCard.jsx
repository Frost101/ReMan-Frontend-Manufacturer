
import { BankOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Card, Avatar} from 'antd';
const { Meta } = Card;
import { useNavigate } from 'react-router-dom';


const BatchesInProductionHouseCard = (props) => {
  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };
  const navigate = useNavigate();

  const processDate = (originalDate) => {
    originalDate = new Date(originalDate);
    const day = originalDate.getUTCDate().toString().padStart(2, '0');
    const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = originalDate.getUTCFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  let batch = props.value.batch;


  //* Set color based on expiry date
  let bgColor = '';
  const getColor = ( expiryDate)=> {
    
    let today = new Date();
    today = processDate(today);
    const now = new Date(
      today.split("/").reverse().join("-")
    );
    const expiry = new Date(expiryDate.split("/").reverse().join("-"));
  
    
    const differenceInMilliseconds = expiry - now;
  
   
    const differenceInMonths =
      (expiry.getFullYear() - now.getFullYear()) * 12 +
      (expiry.getMonth() - now.getMonth());
  
  
    const threshold1 = 2;
    const threshold2 = 6;

    if (differenceInMonths < threshold1) {
      bgColor = "#ffc8c7";
    } else if (differenceInMonths < threshold2) {
      bgColor =  "#fff2b2";
    } else {
      bgColor =  "#74c69d";
    }
  }

  getColor(processDate(batch.ExpiryDate));

  

  return (
    <>
      
      <Card
        style={{
          width: '100%',
          marginTop: 16,
          borderRadius: 10, // Rounded corners
          border: '3px solid #001529',
          boxShadow: '0 0 10px #001529',
          backgroundColor: bgColor
        }}
        hoverable
        onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#e6f7ff'; // Change the background color on hover
            e.currentTarget.style.transform = 'scale(1.02,1.05)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = bgColor; // Revert to the original background color on hover out
            e.currentTarget.style.transform = 'scale(1,1)';
        }}
        
      >
        <Meta
          avatar={<Avatar src="https://pngimg.com/d/gift_PNG100238.png" size={50} style={{ marginRight: '10px' }} /> } 
          title={<div style={{ fontFamily: 'Kalam', fontSize: '20px' }}>ID: {batch.bid} </div>}
        />
        <div style={{display:'flex', paddingTop:'10px', paddingBottom: '0'}}>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Manufacturing Date: {processDate(batch.ManufacturingDate)}</p>
            </div>
            <div style={{flex:'1',paddingLeft:'8px'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0', fontColor:'#001529'}}>Expiry Date:  {processDate(batch.ExpiryDate)} </p>
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}> Quantity: {batch.Quantity} </p>
            </div>
        </div>
      </Card>
      
    </>
  );
};
export default BatchesInProductionHouseCard;