import React from 'react';
import { Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import Authorize from 'components/LayoutComponents/Authorize';
import { useSubscription } from '@apollo/react-hooks';
import gravatarsWithFilterSubscription from 'core/graphql/gravatarsWithFilterSubscription';
import makeBlockie from 'ethereum-blockies-base64';
import utils from 'utils';
import { toggleUpdateNameModal, toggleCreateModal } from 'core/redux/modals/actions';
import styles from './style.module.scss';

function Customization(props) {
  const { selectedAccount, dispatchToggleUpdateNameModal, dispatchToggleCreateModal } = props;

  const { data, loading } = useSubscription(gravatarsWithFilterSubscription, {
    variables: {
      where: {
        ...(selectedAccount ? { owner: selectedAccount } : {}),
      },
    },
  });

  if (loading || !data) {
    return (
      <Authorize authorizedAccounts={[selectedAccount]} redirect to="/">
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Customize your Gravatar</strong>
            </div>
          </div>
          <div className="card-body">LOADING</div>
        </div>
      </Authorize>
    );
  }

  const gravatar = data && data.gravatars[0];

  let gravatarArea;

  if (gravatar) {
    gravatarArea = (
      <Row justify="space-around" align="middle">
        <Col span={8}>
          <div className={styles.item}>
            <div className={styles.img}>
              <img src={makeBlockie(gravatar.owner)} alt="" height="300" width="300" />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className={styles.mainTitle}>
            ID: <div className={styles.data}>{gravatar.id}</div>
          </div>
          <div className={styles.mainTitle}>
            Owner: <div className={styles.data}>{utils.getShortAddress(gravatar.owner)}</div>
          </div>
          <div className={styles.mainTitle}>
            Name: <div className={styles.data}>{gravatar.displayName}</div>
          </div>
        </Col>
        <Col span={4}>
          <div className={styles.button}>
            <Button block type="primary" onClick={dispatchToggleUpdateNameModal}>
              Update Gravatar Name
            </Button>
          </div>
        </Col>
      </Row>
    );
  } else {
    gravatarArea = (
      <Row justify="space-around" align="middle">
        <Col span={8}>
          <div className={styles.item}>
            <div className={styles.img} />
          </div>
        </Col>
        <Col span={8} />
        <Col span={4}>
          <div className={styles.button}>
            <Button type="primary" onClick={dispatchToggleCreateModal} block>
              Create Gravatar
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
  return (
    <Authorize authorizedAccounts={[selectedAccount]} redirect to="/">
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Customize your Gravatar</strong>
          </div>
        </div>
        <div className="card-body">{gravatarArea}</div>
      </div>
    </Authorize>
  );
}

const mapStateToProps = (state) => ({
  web3: state.login.web3,
  selectedAccount: state.login.selectedAccount,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchToggleUpdateNameModal: () => dispatch(toggleUpdateNameModal()),
  dispatchToggleCreateModal: () => dispatch(toggleCreateModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Customization);
