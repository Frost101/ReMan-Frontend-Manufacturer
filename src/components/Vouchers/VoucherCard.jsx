
import { BankOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Card, List} from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
const { Meta } = Card;

const VoucherCard = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };


  let voucher = props.value.voucher;
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


  const goToUpdateVoucherPage = () => {
    navigate("/man/myVouchers/update", {state:{manufacturerId: manufacturerId,
      manufacturerName: manufacturerName,
      manufacturerLogo: manufacturerLogo,
      voucher: voucher}});
  }
    
  
  
  return (
    <>
      
      <List.Item>
    <Card
        hoverable
        onClick={goToUpdateVoucherPage}
        style={{
          borderRadius: '8px',
          margin: '16px',
          transition: 'border-color 0.5s, box-shadow 0.5s',
          textAlign: 'center',
          width: '80%',
          height: 'auto',
          background: 'linear-gradient(to right, #90e0ef, #FFF)',
          color: 'white', // Set text color to white for better visibility
        }}
    >
       
        <Card.Meta
              title={<h3 style={{ fontSize:'20px',fontFamily: 'Kalam', color: '#333' }}>Voucher Code: {voucher.VoucherCode}</h3>}
              description={
                <>
                  <p style={{ fontFamily: 'Kalam', fontSize: '16px', color: '#666' }}>Details: {voucher.VoucherDetails} <br></br>
                  Discount rate: {voucher.VoucherPercentage} % <br></br>
                  Minimum Purchase Amount: {voucher.MinPurchase}  <br></br>
                  Validity: {processDate(voucher.Validity)}  <br></br>
                  Max Usage: {voucher.MaxUsage} </p>   
                </>
              }
        />
    </Card>
    </List.Item>
      
    </>
  );
};
export default VoucherCard;