
import { MinusOutlined, PlusOutlined, ReconciliationFilled} from '@ant-design/icons';
import React, { useState } from 'react';
import { Card, Avatar, Modal, Input, Button, InputNumber, notification} from 'antd';
const { Meta } = Card;
import { useNavigate } from 'react-router-dom';


const BatchesInOrderCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(0);
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
  let manufacturerId = props.value.manufacturerId;
  let manufacturerName = props.value.manufacturerName;
  let manufacturerLogo = props.value.manufacturerLogo;
  let pid = props.value.pid;
  let oid = props.value.oid;
  let totalQuantity = props.value.totalQuantity;
  let shippedQuantity = props.value.shippedQuantity;


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
  

   const showModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleDecrease = () => {
        if (value > 0) {
          setValue(value - 1);
        }
    };
    
    const handleIncrease = () => {
        if (value < 500) {
          setValue(value + 1);
        }
    };

    const handleOk = async() => {
        let response,receivedData;

         //*Show success notification
         notification.success({
            message: 'Operation Successful!',
            description: 'Quantity for shipment has been selected successfully!',
            duration: 3, //? Duration in seconds
         });

         setModalVisible(false);

        let data = {
            manufacturerId: manufacturerId,
            pid: pid,
            oid: oid,
            bid: batch.bid,
            Quantity: value,
        }
        try{
            response = await fetch(import.meta.env.VITE_API_URL+'/order/updateShipmentInfo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
        }
        catch(error){
            console.log("Error while fetching batches from inventories");
        }
        
        window.location.reload();
    }

  

  return (
    <>

        <Modal
        title={
        <div style={{ fontSize: '30px', fontFamily: 'Kalam', textAlign: 'center', color:'blue' }}>
            Select Quantity For Shipment
        </div>}     
        open={modalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        style={{fontFamily: 'Kalam'}}
        >
            
            <div style={{display:'flex',justifyContent:'center', flexDirection: 'column', alignItems: 'center'}}>
                <div>
                    <Avatar icon={<ReconciliationFilled />} size={100} style={{color:'blue' ,marginRight: '10px' }} />
                </div>
                <div >
                    <p>
                        bid: {batch.bid} <br/>
                        Max Available Quantity: {batch.Quantity} <br/>
                        Required Quantity: {totalQuantity-shippedQuantity} <br/>
                    </p>
                </div>

                <div>
                    <Button icon={<MinusOutlined />} onClick={handleDecrease} style={{border: '1px solid blue', borderRadius: '8px'}}/>
                        <InputNumber
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                            min={0}
                            max={totalQuantity-shippedQuantity}
                            style={{border: '1px solid blue', borderRadius: '8px'}}
                        />
                    <Button icon={<PlusOutlined />} onClick={handleIncrease} style={{border: '1px solid blue', borderRadius: '8px'}}/>
                </div>
            </div>
        </Modal>
      
      <Card
        style={{
          width: '100%',
          marginTop: 16,
          borderRadius: 10, // Rounded corners
          border: '3px solid #001529',
          boxShadow: '0 0 10px #001529',
          backgroundColor: bgColor
        }}
        onClick={showModal}
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
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0', display:'flex', alignItems:'center'}}> 
                Sale Rate:
                {
                        (batch.Sale != 0) ? 
                        (
                        <> 
                            {batch.Sale}
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
                            Not in Sale
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
                </p>
            </div>
           
        </div>
      </Card>
      
    </>
  );
};
export default BatchesInOrderCard;