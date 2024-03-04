
import { BankOutlined, ReconciliationFilled } from '@ant-design/icons';
import React, { useState } from 'react';
import { Card, Modal, Input, Avatar, Form, DatePicker, Button, notification} from 'antd';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
import moment from 'moment';

const RentedInventoryCard = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [calculatedRent, setCalculatedRent] = useState(0);
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

    const disabledDate = (current) => {
        //* Disable all dates before occupied till date
        //* Also Disable all dates after FreeTill date
        return current && (current < moment(inventory.OccupiedTill) || current > moment(inventory.FreeTill));
    };

    const handleDateChange = (date, dateString) => {
        //* Calculate rent
        //* day = date - occupiedTill
        //* rent = day * perDayRent
        const occupiedTill = new Date(inventory.OccupiedTill);
        const newOccupiedTill = new Date(dateString);
        const diffTime = Math.abs(newOccupiedTill - occupiedTill);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const rent = diffDays * inventory.PerDayRent;
        setCalculatedRent(rent);
    }

    const onFinish = async(values) => {
        //* Send request to extend lease
        let data = {
            rid: inventory.rid,
            OccupiedTill: values.OccupiedTill,
        }
        try{
            let response = await fetch(import.meta.env.VITE_API_URL+'/payment/paymentOnlineForExtendingLease', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            let receivedData = await response.json();
            localStorage.setItem('manufacturerId', manufacturerId);
            localStorage.setItem('manufacturerLogo',manufacturerLogo);
            localStorage.setItem('manufacturerName',manufacturerName);
            window.location.href(receivedData.url);
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
            Select Date for extending lease
        </div>}     
        open={modalVisible}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: 'none' } }}
        style={{fontFamily: 'Kalam'}}
        >
            
            <div style={{display:'flex',justifyContent:'center', flexDirection: 'column', alignItems: 'center'}}>
                <div>
                    <Avatar icon={<ReconciliationFilled />} size={100} style={{color:'blue' ,marginRight: '10px' }} />
                </div>
                <div >
                    <p>
                        calculated rent: {calculatedRent}
                    </p>
                </div>

                <div>
                        <Form
                        name="form"
                        labelCol={{span:8}}
                        initialValues={{  }}
                        onFinish={onFinish}
                        style={{
                            
                        }}
                        >
                            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>New Occupied Date:</h3>
                            <Form.Item
                                name="OccupiedTill"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please select correct date!',
                                },
                                ]}
                            >
                                <DatePicker
                                onChange={handleDateChange}
                                placeholder="Select date"
                                disabledDate={disabledDate}
                                style={{ 
                                    width: '80%',
                                    margin: 'auto',
                                    border: '2px solid blue', // Blue border color
                                    borderRadius: '8px', // Rounded corners
                                }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button block type="primary" htmlType="submit" style={{width:'100%', fontFamily:'Kalam', textAlign:'center'}}>
                                    Confirm Extension
                                </Button>
                            </Form.Item>
                        </Form>
                    
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
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}> Original Owner: {inventory.CompanyName} </p>  
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}> Per Day Rent: {inventory.PerDayRent} </p>  
            </div>
        </div>
      </Card>
      
    </>
  );
};
export default RentedInventoryCard;