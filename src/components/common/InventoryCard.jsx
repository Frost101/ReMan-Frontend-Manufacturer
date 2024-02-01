
import { BankOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Avatar, Card, Empty, Skeleton, Switch} from 'antd';
const { Meta } = Card;


const InventoryCard = (props) => {
  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };

  let inventory = props.inventory;
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
          title={<div style={{ fontFamily: 'Kalam', fontSize: '20px' }}>{inventory.InventoryName}</div>}
        />
        <div style={{display:'flex', paddingTop:'10px', paddingBottom: '0'}}>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Location: {inventory.Street + ", "+ inventory.Thana + ", "+ inventory.Division }</p>
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Storage Type:  {inventory.Type} </p>
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Size: {inventory.Capacity} sqft</p>
            </div>
            <div style={{flex:'1',display:'flex', fontFamily:'Kalam', fontSize:'15px', alignItems:'center',}}>
                Owner Status:  
                {
                        inventory.EmptyStatus ? 
                        (
                        <> 
                            Owned
                            <div
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: 'green',
                                marginLeft: '8px',                   
                            }}> </div>
                        </>):
                        (
                        <>
                            From Lease
                            <div
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: 'red',
                                marginLeft: '8px',                   
                            }}> </div>
                        </>
                        )
                    }
            </div>
            <div style={{flex:'1',display:'flex', fontFamily:'Kalam', fontSize:'15px', alignItems:'center'}}> Empty: 
                    {
                        inventory.OwnerStatus ? 
                        (
                        <> 
                            Yes
                            <div
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: 'red',
                                marginLeft: '8px',                   
                            }}> </div>
                        </>):
                        (
                        <>
                            No
                            <div
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: 'green',
                                marginLeft: '8px',                   
                            }}> </div>
                        </>
                        )
                    }
            </div>
        </div>
      </Card>
      
    </>
  );
};
export default InventoryCard;