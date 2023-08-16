// import Image from 'next/image';
import React from 'react';
import styles from './loader.module.css';

const LoaderPage = () => {
  return (
    <div className={styles.loading}>
      <img width={100} height={100} alt="Loading..." src="/loader.svg" />
    </div>
  );
};

export default LoaderPage;
