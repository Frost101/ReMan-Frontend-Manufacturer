
import { NotificationTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';
import { Card, Collapse, Avatar} from 'antd';
const { Panel } = Collapse;
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;

const UnreadNotificationCard = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };


  let notification = props.value.notification;
  const manufacturerName = props.value.manufacturerName;
  const manufacturerId = props.value.manufacturerId;
  const manufacturerLogo = props.value.manufacturerLogo;

  let imgSrc ;
  if(notification.Priority === "High"){
    imgSrc = "https://firebasestorage.googleapis.com/v0/b/reman-manufacturer.appspot.com/o/Misc%2Fnot-red.jpg?alt=media&token=053e4876-31c2-4863-b174-8faac78d71fe";
  }
    else if(notification.Priority === "Mid"){
        imgSrc = "https://firebasestorage.googleapis.com/v0/b/reman-manufacturer.appspot.com/o/Misc%2Fmot-yellow.png?alt=media&token=23af1323-e009-4d82-81a6-cd85a9f55645";
    }
    else {
        imgSrc = "https://firebasestorage.googleapis.com/v0/b/reman-manufacturer.appspot.com/o/Misc%2Fnot-blue2.png?alt=media&token=c01030bc-e6d1-4784-9f0f-091862a80cbf";
    }


  const goToInventoryPage = () => {
    navigate('/man/inventoryList/showProduct', {state: {
      manufacturerId: manufacturerId,
      manufacturerName: manufacturerName,
      manufacturerLogo: manufacturerLogo,
    } });
  }

  const processDate = (originalDate) => {
    originalDate = new Date(originalDate);
    const day = originalDate.getUTCDate().toString().padStart(2, '0');
    const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = originalDate.getUTCFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  const ProcessTime = (originalDate) => {
    originalDate = new Date(originalDate);
    const hours = originalDate.getHours().toString().padStart(2, '0');
    const minutes = originalDate.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }

  
  return (
    <>
      
      <Panel
            header={
                <>
                    

                    <div
                        style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                        }}
                    >
                        <Avatar src = {imgSrc}
                        size={50}
                        style={{ marginRight: '10px'}}
                        >

                        </Avatar>
                        <span style={{ fontFamily: 'Kalam', fontSize: '20px', flex:'4' }}>{notification.Message}</span>
                        
                    </div>
                    <div
                        style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                        }}
                    >
                        <span style={{flex:'4'}}></span>
                        <span style={{ fontFamily: 'Kalam', fontSize: '15px', flex:'1', textAlign:'right' }}>Date: {processDate(notification.DateAndTime)}</span>
                        <span style={{ fontFamily: 'Kalam', fontSize: '15px', flex:'1', textAlign:'right' }}>Time: {ProcessTime(notification.DateAndTime)}</span>
    
                        
                    </div>

                </>
            }
            style={{
                transition: 'background-color 0.3s',
                backgroundColor: 'transparent',
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e6f7ff';
                e.currentTarget.style.transform = 'scale(1.02,1.05)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1,1)';
            }}
            >
        </Panel>
      
    </>
  );
};
export default UnreadNotificationCard;