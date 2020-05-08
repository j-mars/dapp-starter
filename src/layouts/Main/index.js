import React, { useEffect } from 'react';
import { BackTop, Layout } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopBar from 'components/TopBar';
import { initWeb3 } from 'core/redux/login/actions';
import { initializeContracts } from 'core/redux/contracts/actions';
import { Contracts } from 'core/redux/contracts/reducers';

function MainLayout(props) {
  const { children, web3, initWeb3Props, initializeContractsProps, authorized } = props;

  // Connect to provider and init web3
  useEffect(
    function initWeb3Effect() {
      if (authorized) {
        initWeb3Props();
      }
    },
    [authorized, initWeb3Props],
  );

  // Initialize Contracts after web3 is connected
  useEffect(
    function intializeContractsEffect() {
      if (web3) {
        initializeContractsProps(Contracts, web3);
      }
    },
    [web3, initializeContractsProps],
  );

  return (
    <Layout>
      <BackTop />
      <Layout>
        <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <TopBar />
        </Layout.Header>
        <Layout.Content style={{ height: '100%', position: 'relative' }}>
          <>{children}</>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  web3: state.login.web3,
  authorized: state.login.authorized,
});

const mapDispatchToProps = (dispatch) => ({
  initWeb3Props: () => dispatch(initWeb3()),
  initializeContractsProps: (contracts, web3) => dispatch(initializeContracts(contracts, web3)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainLayout));
