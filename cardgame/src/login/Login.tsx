import React from 'react';
import { Form } from 'antd';
import { LoginForm } from '../login/Loginconpomment/LoginForm';
import styles from './Login.module.css';
import Runner from '../login/Loginconpomment/runner';

const Login = () => {
    const [form] = Form.useForm();

    const handleFinish = (values: { username: string; password: string }) => {
        console.log(values);
    };

    return (
        <div className={styles['login-container']}>
            <Runner direction="right" />
            <LoginForm form={form} onFinish={handleFinish} />
        </div>
    );
};

export default Login;
