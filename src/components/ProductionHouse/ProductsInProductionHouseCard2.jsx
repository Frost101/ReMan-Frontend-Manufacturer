
import { BankOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Card, List} from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
const { Meta } = Card;

const ProductsInProductionHouseCard2 = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);


  let product = props.value.product;
  const manufacturerId = props.value.manufacturerId;
  const manufacturerName = props.value.manufacturerName;
  const manufacturerLogo = props.value.manufacturerLogo;
  const phid = props.value.phid;
  const productionHouseName = props.value.productionHouseName;


  const goToProductBatchPage = () => {
    navigate('/man/productionHouseList/showProduct/showBatch',{
      state: {
        pid: product.pid,
        productName: product.ProductName,
        manufacturerId : manufacturerId,
        manufacturerName : manufacturerName,
        manufacturerLogo : manufacturerLogo,
        phid : phid,
        productionHouseName : productionHouseName
      }
    })
  }
    
  
  
  return (
    <>
      
      <List.Item>
    <Card
        hoverable
        onClick={goToProductBatchPage}
        style={{
            border: '1px solid #d9d9d9',
            borderRadius: '8px',
            margin: '16px',
            transition: 'border-color 0.5s, box-shadow 0.5s',
            textAlign: 'center',
            width:'80%',
            height:'50%',
            height:'auto',
        }}
    >
        <img src={product.Image} 
        
        alt="bal" style={{ maxWidth: '50%', textAlign:'center',maxHeight:'50%', height: 'auto' }} />
        <Card.Meta
              title={<h3 style={{ fontSize:'20px',fontFamily: 'Kalam', color: '#333', marginTop:'2%' }}> {product.ProductName}</h3>}
              description={
                <>
                  <p style={{ fontFamily: 'Kalam', fontSize: '16px', color: '#666' }}>Category: {product.CategoryName} <br></br>
                  Weight/Volume:  {product.Weight_volume} {product.Unit} <br></br>
                  Unit Price: {product.UnitPrice} <br></br>
                  Description: {product.Description} </p>   
                </>
              }
        />
    </Card>
    </List.Item>
      
    </>
  );
};
export default ProductsInProductionHouseCard2;