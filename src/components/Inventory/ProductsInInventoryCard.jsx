
import { BankOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Card, Avatar} from 'antd';
const { Meta } = Card;
import { useNavigate } from 'react-router-dom';


const ProductsInInventoryCard = (props) => {
  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };
  const navigate = useNavigate();

  let product = props.value.product;
  const manufacturerId = props.value.manufacturerId;
  const manufacturerName = props.value.manufacturerName;
  const manufacturerLogo = props.value.manufacturerLogo;
  const iid = props.value.iid;
  const inventoryName = props.value.inventoryName;

  const goToProductBatchPage = () => {
    navigate('/man/inventoryList/showProduct/showBatch',{
      state: {
        pid: product.pid,
        productName: product.ProductName,
        manufacturerId : manufacturerId,
        manufacturerName : manufacturerName,
        manufacturerLogo : manufacturerLogo,
        iid : iid,
        inventoryName : inventoryName
      }
    })
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
            e.currentTarget.style.backgroundColor = '#e6f7ff'; // Change the background color on hover
            e.currentTarget.style.transform = 'scale(1.02,1.05)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = ''; // Revert to the original background color on hover out
            e.currentTarget.style.transform = 'scale(1,1)';
        }}
        onClick={goToProductBatchPage}
      >
        <Meta
          avatar={<Avatar src="https://pngimg.com/d/gift_PNG100238.png" size={50} style={{ marginRight: '10px' }} /> } 
          title={<div style={{ fontFamily: 'Kalam', fontSize: '20px' }}>{product.ProductName}</div>}
        />
        <div style={{display:'flex', paddingTop:'10px', paddingBottom: '0'}}>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Category: {product.CategoryName}</p>
            </div>
            <div style={{flex:'1',paddingLeft:'8px'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0', fontColor:'#001529'}}>Weight/Volume:  {product.Weight_volume} {product.Unit} </p>
            </div>
            <div style={{flex:'1'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Unit Price: {product.UnitPrice} </p>
            </div>
            <div style={{flex:'2'}}>
                <p style={{fontFamily:'Kalam', fontSize:'15px', margin:'0'}}>Description: {product.Description} </p>
            </div>
           
        </div>
      </Card>
      
    </>
  );
};
export default ProductsInInventoryCard;