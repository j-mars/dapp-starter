import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';
import utils from 'utils';
import { connect } from 'react-redux';
import styles from './style.module.scss';

const GravatarCard = (props) => {
  const { card, web3, selectedAccount } = props;

  return (
    <div className={styles.card}>
      {web3 && selectedAccount === card.owner ? (
        <div className={styles.title}>MY GRAVATAR: {card.displayName}</div>
      ) : (
        <div className={styles.title}>{card.displayName}</div>
      )}
      <div className={styles.centered}>
        <img src={makeBlockie(card.owner)} alt="" />
      </div>
      <div className={styles.descr}>Id: {card.id}</div>
      <div className={styles.descr}>Owner: {utils.getShortAddress(card.owner)}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  web3: state.login.web3,
  selectedAccount: state.login.selectedAccount,
});

export default connect(mapStateToProps, null)(GravatarCard);
