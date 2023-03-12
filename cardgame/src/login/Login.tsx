import React from 'react';
import { Form } from 'antd';
import { LoginForm } from './LoginForm';
import styles from './Login.module.css';

const Login = () => {
    const [form] = Form.useForm();

    const handleFinish = (values: { username: string; password: string }) => {
        console.log(values);
    };

    return (
        <div className={styles['login-container']}>
            <LoginForm form={form} onFinish={handleFinish} />
        </div>
    );
};

export default Login;
