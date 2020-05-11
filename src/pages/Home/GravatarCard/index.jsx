import React from 'react';
import { Button } from 'antd';
import makeBlockie from 'ethereum-blockies-base64';
import utils from 'utils';
import styles from './style.module.scss';

const GravatarCard = (props) => {
  const { card } = props;
  return (
    <div className={styles.card}>
      <div className={styles.title}>{card.displayName}</div>
      <div className={styles.centered}>
        <img src={makeBlockie(card.owner)} alt="" />
      </div>
      <div className={styles.descr}>Id: {card.id}</div>
      <div className={styles.descr}>Owner: {utils.getShortAddress(card.owner)}</div>
      <div className={styles.centered}>
        <Button primary>Update Gravatar</Button>
      </div>
    </div>
  );
};

export default GravatarCard;
