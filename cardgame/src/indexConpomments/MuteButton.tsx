import React, { useState } from 'react';
import { Button } from 'antd';
import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons';
import styles from './MuteButton.module.css';

type MuteButtonProps = {
    muteButton?: boolean;
    onClick?: () => void;
};

const MuteButton: React.FC<MuteButtonProps> = ({ muteButton = false, onClick }) => {
    const [muted, setMuted] = useState(false);

    const handleClick = () => {
        setMuted(!muted);
        onClick && onClick();
    };

    return (
        <Button
            className={muteButton ? styles.muteButton : ''}
            shape="circle"
            size="large"
            icon={muted ? <AudioMutedOutlined /> : <AudioOutlined />}
            onClick={handleClick}
        />
    );
};

export default MuteButton;
