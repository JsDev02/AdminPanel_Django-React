import { Button, Form, Input, Typography, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/login.api';

const { Title } = Typography;

export function Login() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const response = await loginUser(values.username, values.password);

        if (response.success) {
            message.success(response.message);

            const role = localStorage.getItem('role'); 

            if (role === '1') {
                navigate('/admin-panel');
            } else {
                navigate('/user-panel');
            }
        } else {
            message.error(response.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <Title level={3} className="login-title">Login</Title>
                <Form
                    name="login"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="Enter your username" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Ingresar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}