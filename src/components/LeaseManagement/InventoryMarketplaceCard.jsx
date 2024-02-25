
import { BankOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Card, List} from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
const { Meta } = Card;

const InventoryMarketplaceCard = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };


  let inventory = props.value.inventory;
  const manufacturerName = props.value.manufacturerName;
  const manufacturerId = props.value.manufacturerId;
  const manufacturerLogo = props.value.manufacturerLogo;


  const goToInventoryDetails = () => {
    navigate("/man/leaseManagement/inventoryMarketPlace/inventoryDetails",
        {
            state: {
            inventory: inventory,
            manufacturerName: manufacturerName,
            manufacturerId: manufacturerId,
            manufacturerLogo: manufacturerLogo
            }
        })
    }
    
  
  
  return (
    <>
      
      <List.Item>
    <Card
        hoverable
        onClick={goToInventoryDetails}
        style={{
            border: '1px solid #d9d9d9',
            borderRadius: '8px',
            margin: '16px',
            transition: 'border-color 0.5s, box-shadow 0.5s',
            textAlign: 'center',
            width:'80%',
            height:'auto',
        }}
    >
        <img src="https://firebasestorage.googleapis.com/v0/b/reman-manufacturer.appspot.com/o/Misc%2FInventory.svg?alt=media&token=feb2323b-81a9-49c3-9096-f53351c1f6b6" 
        
        alt="bal" style={{ maxWidth: '70%', textAlign:'center',maxHeight:'70%', height: 'auto' }} />
        <Card.Meta
              title={<h3 style={{ fontSize:'20px',fontFamily: 'Kalam', color: '#333' }}> {inventory.InventoryName} <br></br> Manufacturer: {inventory.OwnerName}</h3>}
              description={
                <>
                  <p style={{ fontFamily: 'Kalam', fontSize: '16px', color: '#666' }}>Capacity: {inventory.Capacity} sqft <br></br>
                  Type: {inventory.Type} <br></br>
                  Per Day Rent: {inventory.PerDayRent} taka <br></br>
                  Division: {inventory.Division} </p>   
                </>
              }
        />
    </Card>
    </List.Item>
      
    </>
  );
};
export default InventoryMarketplaceCard;