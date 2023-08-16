import React from 'react';
import styles from './weather.module.css';
const Card = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{props.icon}</div>
      <div className={styles.text}>
        <h5>{props.description}</h5>
        <h2>{props.largeText}</h2>
      </div>
    </div>
  );
};

export default Card;
