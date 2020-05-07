import { all } from 'redux-saga/effects'
import contracts from 'core/redux/contracts/sagas'

export default function* rootSaga() {
  yield all([
    contracts(),
  ])
}
