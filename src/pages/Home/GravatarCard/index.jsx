import React from 'react';
import styles from './style.module.scss';

const GravatarCard = (props) => {
  const { card } = props;
  return (
    <div className={styles.card}>
      <div className={styles.title}>{card.displayName}</div>
      <div className={styles.descr}>{card.owner}</div>
    </div>
  );
};

export default GravatarCard;
