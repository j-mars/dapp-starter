import { all } from 'redux-saga/effects'
import contracts from 'core/redux/contracts/sagas'
import login from 'core/redux/login/sagas'

export default function* rootSaga() {
  yield all([
    contracts(),
    login(),
  ])
}
