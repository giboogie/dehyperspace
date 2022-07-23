import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';



import {
    WALLETDATA_REQUESTING,
    walletDataSuccess,
} from './walletStore';

import axios from 'axios';
// import * as config from '../../../config';

//const loginUrl = `http://localhost:7900/api/users/signin`;

async function getWalletDataApi(jwt) {

    try {
        const response = {
            "status": 200,
            "timestamp": 8,
            "data": {
                "addr" : "0x01asdf651asdfff1a3a2aa5sd1f98qw1asdg",
                "quantity": "3000"
            }
        }

        return response;

    } catch (err) {
        console.log(err)
        throw err;
    }
}

function* walletDataFlow() {
    let response;
    try {
        
        response = yield call(getWalletDataApi);
        yield put(walletDataSuccess(response));
    } catch (error) {
    } finally {
        if (yield cancelled()) {
        }
    }
    return response;
}

function* walletDataWatcher() {
    while (true) {
        const { payload } = yield take(WALLETDATA_REQUESTING);
        const task = yield fork(walletDataFlow);
    }
}

export default walletDataWatcher;

