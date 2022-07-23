import MainSaga from './main/mainSaga';
import FrigeSaga from './main/frige/frigeSaga';
import WalletSaga from './main/wallet/walletSaga';
import LoginSaga from './auth/login/saga';
import SafetySaga from './main/safety/safetySaga';
import SignupSage from './auth/siginup/signup_saga';
import findPWSaga from './auth/userfind/findPw_saga';
import { all, fork } from 'redux-saga/effects';
export default function* rootSaga() {
    yield all([
        fork(LoginSaga),
        fork(MainSaga),
        fork(FrigeSaga),
        fork(WalletSaga),
        fork(SafetySaga),
        fork(SignupSage),
        fork(findPWSaga),


    ]);
}