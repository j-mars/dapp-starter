import React from 'react'
import { EthAddress } from "rimble-ui"
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { connect } from 'react-redux'
import Login from './Login'
import styles from './style.module.scss'

function TopBar(props) {
  const { selectedAccount, isLoggedIn, signingOut } = props

  let userArea

  if (isLoggedIn && !signingOut) {
    userArea = (<Button type="primary" className="text-center login-form-button">
    Logout
  </Button>)
  } else if (isLoggedIn && signingOut) {
    userArea = (
      <Button type="primary" className="text-center login-form-button" disabled>
        Disconnecting
      </Button>
    )
  } else {
    userArea = <Login />
  }
  return (
    <div className={styles.topbar}>
      <div className="mr-auto">
        <EthAddress address={selectedAccount} textLabels />
      </div>
      <div className="mr-4">
        {userArea}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedAccount: state.login.selectedAccount,
  isLoggedIn: state.login.isLoggedIn,
  signingOut: state.login.signingOut,
})

export default connect(mapStateToProps, null)(TopBar)
