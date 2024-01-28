import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/reset.css';
import LogoAndName from '../LogoAndName';
import {MailOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    setTimeout(() => {
        alert('Login Successful!');
    }
    , 1000);
    // window.location.href = '/';
  };

  return (
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
  );
};

export default LoginForm;
