import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/reset.css';

const LoginForm = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Add your login logic here
  };

  return (
    <div style={{alignItems:'flex-end', display:'flex', justifyContent: 'center', padding:'10%'}}>
        
            <Form
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        >
            <h1 style={{fontFamily:'Kalam', fontSize:'50px', display:'flex', justifyContent:'center'}}>Welcome</h1>
        <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit">
            Log in
            </Button>
        </Form.Item>
        </Form>
    </div>
  );
};

export default LoginForm;
