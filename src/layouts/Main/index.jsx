import React, { useEffect } from 'react';
import { BackTop, Layout } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopBar from 'components/TopBar';
import { initWeb3 } from 'core/redux/login/actions';
import { initializeContracts } from 'core/redux/contracts/actions';
import { Contracts } from 'core/redux/contracts/reducers';
import { fetchMenu } from 'core/redux/menu/actions';
import MenuTop from 'components/LayoutComponents/Menu/MenuTop';
import classNames from 'classnames';

function MainLayout(props) {
  const {
    fetchMenuProps,
    isBorderless,
    isSquaredBorders,
    isFixedWidth,
    isMenuShadow,
    isMenuTop,
    children,
    web3,
    initWeb3Props,
    initializeContractsProps,
    authorized,
  } = props;

  // Fetch menu
  useEffect(
    function setMenu() {
      fetchMenuProps();
    },
    [fetchMenuProps],
  );

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
    <Layout
      className={classNames({
        settings__borderLess: isBorderless,
        settings__squaredBorders: isSquaredBorders,
        settings__fixedWidth: isFixedWidth,
        settings__menuShadow: isMenuShadow,
        settings__menuTop: isMenuTop,
      })}
    >
      <MenuTop />
      <BackTop />
      <Layout>
        <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <TopBar />
        </Layout.Header>
        <Layout.Content style={{ height: '100%', position: 'relative' }}>
          <div className="utils__content">{children}</div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  web3: state.login.web3,
  authorized: state.login.authorized,
  isBorderless: state.settings.isBorderless,
  isSquaredBorders: state.settings.isSquaredBorders,
  isFixedWidth: state.settings.isFixedWidth,
  isMenuShadow: state.settings.isMenuShadow,
  isMenuTop: state.settings.isMenuTop,
});

const mapDispatchToProps = (dispatch) => ({
  initWeb3Props: () => dispatch(initWeb3()),
  initializeContractsProps: (contracts, web3) => dispatch(initializeContracts(contracts, web3)),
  fetchMenuProps: () => dispatch(fetchMenu()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainLayout));