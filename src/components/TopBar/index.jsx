import React from 'react';
import { Button, Menu } from 'antd';
import { connect } from 'react-redux';
import { logout } from 'core/redux/login/actions';
import Login from './Login';

function TopBar(props) {
  const { selectedAccount, isLoggedIn, signingOut, dispatchLogout } = props;

  let userArea;

  if (isLoggedIn && !signingOut) {
    userArea = (
      <Button type="primary" className="text-center login-form-button" onClick={dispatchLogout}>
        Logout
      </Button>
    );
  } else if (isLoggedIn && signingOut) {
    userArea = (
      <Button type="primary" className="text-center login-form-button" disabled>
        Disconnecting
      </Button>
    );
  } else {
    userArea = <Login />;
  }
  return (
    <>
      <Menu style={{ float: 'right' }} theme="dark" mode="horizontal">
        <Menu.Item key="1">{selectedAccount || 'Not connected'}</Menu.Item>
        <Menu.Item key="2">{userArea}</Menu.Item>
      </Menu>
    </>
  );
}

const mapStateToProps = (state) => ({
  selectedAccount: state.login.selectedAccount,
  isLoggedIn: state.login.isLoggedIn,
  signingOut: state.login.signingOut,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
