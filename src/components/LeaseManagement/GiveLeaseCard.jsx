
import { BankOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import React, { useState , useEffect } from 'react';
import { Card, Avatar, notification} from 'antd';
import { useNavigate } from 'react-router-dom';
import GiveLease from '../../pages/LeaseManagement/GiveLease';
const { Meta } = Card;

const GiveLeaseCard = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(false);
  const [visible, setVisible] = useState(false);

  const onChange = (checked) => {
    setLoading(!checked);
  };


  let inventory = props.value.inventory;
  const selectedStatus = props.value.selectedStatus;

  useEffect(() => {
    setSelected(selectedStatus);
    setVisible(selectedStatus); 
}, [selectedStatus]);
  

    const setSelectionStatus = () => {
        if(!selected){
            props.value.addToSelectedInventoryList(inventory.iid, inventory.InventoryName);  
            notification.success({
            message: `${inventory.InventoryName} added to the list`,
            duration: 2, //? Duration in seconds
        });
        }
        else{
            props.value.removeFromSelectedInventoryList(inventory.iid, inventory.InventoryName);
            notification.error({
            message: `${inventory.InventoryName} removed from the list`,
            duration: 2, //? Duration in seconds
        });
        }
        setSelected(!selected);
        setVisible(!visible);
    }

  
  return (
    <>
      
      <Card
        onClick={setSelectionStatus}
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
            <div style={{flex:'2'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Location: {inventory.HouseNumber} , {inventory.AddressDetails}, {inventory.Thana}, {inventory.Division} - {inventory.zip}</p>
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Storage Type:  {inventory.Type} </p>
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Size: {inventory.Capacity} sqft</p>
            </div>
            
            <div style={{flex:'1',display:'flex', fontFamily:'Kalam', fontSize:'15px', alignItems:'center'}}> Empty: 
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
                </>
            </div>

            {
                visible && (
                    <div style={{textAlign:'right'}}>
                        <CheckCircleTwoTone  style={{ fontSize: '50px', color: '#08c' }} />
                    </div>
                )
            }
        </div>
      </Card>
      
    </>
  );
};
export default GiveLeaseCard;