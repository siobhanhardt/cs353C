import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormInstance } from 'antd';

interface LoginFormProps {
    form: FormInstance;
    onFinish?: (values: { username: string; password: string }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ form, onFinish }) => {
    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};
