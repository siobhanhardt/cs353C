import React from "react";
import styles from "../Login.module.css";

interface RunnerProps {
    direction: "left" | "right";
}

const Runner: React.FC<RunnerProps> = ({ direction }) => {
    return <div className={`${styles.runner} ${styles[`runner-${direction}`]} ${styles["running-animation"]}`} />;
};

export default Runner;
