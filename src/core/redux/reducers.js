import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { createHashHistory } from 'history'
import contracts from 'core/redux/contracts/reducers'
import login from 'core/redux/login/reducers'

export const history = createHashHistory()

const appReducer = combineReducers({
  contracts,
  router: connectRouter(history),
  login
})

export default appReducer