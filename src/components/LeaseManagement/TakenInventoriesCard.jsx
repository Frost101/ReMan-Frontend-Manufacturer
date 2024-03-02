
import { BankOutlined, ReconciliationFilled } from '@ant-design/icons';
import React, { useState } from 'react';
import { Card, Modal, Input, Avatar, Form, DatePicker, Button, notification} from 'antd';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
import moment from 'moment';

const TakenInventoriesCard = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };


  let inventory = props.value.inventory;
  const manufacturerName = props.value.manufacturerName;
  const manufacturerId = props.value.manufacturerId;
  const manufacturerLogo = props.value.manufacturerLogo;


  const processDate = (originalDate) => {
    originalDate = new Date(originalDate);
    const day = originalDate.getUTCDate().toString().padStart(2, '0');
    const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = originalDate.getUTCFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }





  
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
            e.currentTarget.style.backgroundColor = '#e6f7ff'; 
            e.currentTarget.style.transform = 'scale(1.02,1.05)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = ''; 
            e.currentTarget.style.transform = 'scale(1,1)';
        }}
        
      >
        <Meta
          avatar={<BankOutlined style = {{color:'#08c', fontSize: '28px'}} />}
          title={<div style={{ fontFamily: 'Kalam', fontSize: '20px' }}>{inventory.InventoryName}</div>}
        />
        <div style={{display:'flex', paddingTop:'10px', paddingBottom: '0'}}>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Location: {inventory.Street + ", "+ inventory.Thana + ", "+ inventory.Division }</p>
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Occupied From:  {processDate(inventory.OccupiedFrom)} </p>
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Occupied Till:  {processDate(inventory.OccupiedTill)} </p>
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Storage Type:  {inventory.Type} </p>
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Size: {inventory.Capacity} sqft</p>
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}> Taken By: {inventory.CompanyName} </p>  
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}> Per Day Rent: {inventory.PerDayRent} </p>  
            </div>
        </div>
      </Card>
      
    </>
  );
};
export default TakenInventoriesCard;