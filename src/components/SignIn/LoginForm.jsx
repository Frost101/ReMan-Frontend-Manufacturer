import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/reset.css';
import LogoAndName from '../LogoAndName';
import {MailOutlined, LockOutlined } from '@ant-design/icons';
import { Alert, Space } from 'antd';

const LoginForm = () => {

    const [showError, setShowError] = useState(false);
  const onFinish = async (values) => {

    console.log('Received values:', values);

    let response;
    let data = {
        email: values.email,
        password: values.password
    }
    try{
        response = await fetch('https://reman.us.to/api/authentication/manufacturer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });
    }
    catch(error){

    }

    if(response.status === 200){
        setShowError(false);
        window.location.href = '/man/home';
    }
    else{
        console.log('Invalid Credentials');
        setShowError(true);

    }
    // window.location.href = '/';
  };

  return (
    <>
    <Space direction="vertical" style={{ width: '100%', marginBottom: showError ? '16px' : '0' }}>
        {showError && (
            <Alert type="error" message="Invalid Credentials" banner closable />
        )}
    </Space>
    <div style={{alignItems:'flex-end', display:'flex', justifyContent: 'center', padding:'10%'}}>
        
        <Form
            name="login-form"
            labelCol={{span:8}}
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <LogoAndName />
            <h1 style={{fontFamily:'Kalam', fontSize:'50px', display:'flex', justifyContent:'center'}}>Welcome</h1>
            <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Company Email:</h3>
        <Form.Item
            name="email"
            rules= {[
                {
                    required: true,
                    type: 'email',
                    message:
                        'Enter a valid email address!',
                },
            ]}
            hasFeedback
        >
            {/* <p style={{fontFamily:'Kalam'}}>Company Email:</p> */}
            <Input 
                placeholder='abc@gmail.com'
                maxLength={30}
                showCount
                allowClear
                prefix={<MailOutlined style={{color:'blue'}} />}
            />
        </Form.Item>

        <h3 style={{fontFamily:'Kalam', alignContent:'left'}}>Password:</h3>
        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            {/* <p style={{fontFamily:'Kalam'}}>Password:</p> */}
            <Input.Password 
            allowClear
            prefix={<LockOutlined  style={{color:'blue'}}/>}
            />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
            <Button block type="primary" htmlType="submit">
            Log in
            </Button>
        </Form.Item>
        </Form>
    </div>
    </>
  );
};

export default LoginForm;
