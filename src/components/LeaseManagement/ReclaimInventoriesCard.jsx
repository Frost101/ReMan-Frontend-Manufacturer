
import { BankOutlined, ReconciliationFilled } from '@ant-design/icons';
import React, { useState } from 'react';
import { Card, Modal, Input, Avatar, Form, DatePicker, Button, notification} from 'antd';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
import moment from 'moment';

const ReclaimInventoriesCard = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
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


    const showModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    

    const onFinish = async() => {
        let data = {
            rid: inventory.rid,
        }
        try{
            let response = await fetch(import.meta.env.VITE_API_URL+'/leaseInventory/deleteFromRental', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            let receivedData = await response.json();
            if(response.status === 200){
                notification.success({
                    message: 'Success',
                    description: 'Reclaimed successfully',
                    duration: 2,
                    onClose: () => {
                        navigate(-1);
                    }
                });
                setModalVisible(false);
            }
            else{
                notification.error({
                    message: 'Error',
                    description: 'Failed to reclaim',
                });
            }
        }
        catch(error){
            console.log("Error");
        }
    }



  
  return (
    <>



        <Modal
        title={
        <div style={{ fontSize: '30px', fontFamily: 'Kalam', textAlign: 'center', color:'blue' }}>
            Confirm Reclaim
        </div>}     
        open={modalVisible}
        onCancel={handleCancel}
        onOk={onFinish}
        style={{fontFamily: 'Kalam'}}
        >
            
            <div style={{display:'flex',justifyContent:'center', flexDirection: 'column', alignItems: 'center'}}>
                <div>
                    <Avatar icon={<ReconciliationFilled />} size={100} style={{color:'blue' ,marginRight: '10px' }} />
                </div>
                <div >
                    
                </div>

                
            </div>
        </Modal>

      
      <Card
        onClick={showModal}
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
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Free From:  {processDate(inventory.FreeFrom)} </p>
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Free Till:  {processDate(inventory.FreeTill)} </p>
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Storage Type:  {inventory.Type} </p>
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Size: {inventory.Capacity} sqft</p>
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}> Per Day Rent: {inventory.PerDayRent} </p>  
            </div>
        </div>
      </Card>
      
    </>
  );
};
export default ReclaimInventoriesCard;