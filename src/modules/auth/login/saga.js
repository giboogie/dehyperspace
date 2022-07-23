import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    loginRequest,
    loginSuccess,
    loginError,
    LOGOUT,
} from './Authstore'


import axios from 'axios';
import * as config from '../../../config';


async function loginApi(email, password)
{

    try{


        const headerParams = {
            'Content-Type': 'application/json',
        }
        const response = await axios({
            method: 'post',
            url: `${config.URL}/foodUsers/login`,
            headers: headerParams,
            data:{
                email: email,
                pw: password,
            }
        })

        
        

        // const response = await axios({
        //     method: 'post',
        //     url: loginUrl,
        //     // config: { 
        //     //     headers: {'Content-Type': 'application/json' }
        //     // },
        //     data: {
        //         'email': email,
        //         'password': password
        //     }
        // });

        // const response = {
        //     "result":1,
        //     "_id":"6048cf61e567da02d4bd0777",
        //     "name":"홍길동",
        //     "email":"luto1008@gmail.com",
        //     "token":"eyJhbGciOiJIUzI1NiIsInR"
        // }
        if (response.data.result == 1){
            AsyncStorage.setItem('token',response.data.token,() =>{
                console.log('jwt save complate')
                console.log(response.data.token)
            })
            AsyncStorage.setItem('email',response.data.email,() =>{
                console.log('email save complate')
            })
            AsyncStorage.setItem('name',response.data.name,() =>{
                console.log('name save complate')
            })
            AsyncStorage.setItem('addr',response.data.addr,() =>{
                console.log('addr save complate')
            })
        }
        return response.data;
    }catch(err){
        // if(err.response.status === 401){
        //     console.log('ID, PW check')
        // }
        if(err.response === null){
            console.log("에러 에러")
        }
        throw err.response;
    }
}

// async function logoutApi(email){
//     try{

//         // const response = await axios({
//         //     method: 'post',
//         //     url: loginUrl,
//         //     // config: { 
//         //     //     headers: {'Content-Type': 'application/json' }
//         //     // },
//         //     data: {
//         //         'email': email,
//         //         'password': password
//         //     }
//         // });
//         const headerParams = {
//             'Content-Type': 'application/json',
//         }
//         const response = await axios({
//             method: 'post',
//             url: `${config.URL}/users/logout`,
//             headers: headerParams,
//             data:{
//                 id: email,
//             }
//         })


//         return response.data;
//     }catch(err){
//         // if(err.response.status === 401){
//         //     console.log('ID, PW check')
//         // }
//         throw err;
//     }
// }
// function* logout (email) {
    
//     try {
//         yield call (logoutApi, email);
//     }catch (error) {
//        console.log(error)
       
//     }finally {
//         // No matter what, if our 'forked' 'task' was cancelled
//         // we will then just redirect them to login
//         if(yield cancelled()) {
//             //history.push('/login');
//             //browserHistory.push('/login');

//         }
//     }
    
//     //return the token for health and
// }

function* loginFlow (email, password) {
    let response;
    let errorLog;
    try {
        response = yield call (loginApi, email, password);
        yield put(loginSuccess(response));
    }catch (error) {
        // error? send it to redux
        // yield put(errorIn(error));
        // console.log('error')
      console.log(error)
        yield put ({ type: LOGIN_ERROR, error});
    }finally {
        // No matter what, if our 'forked' 'task' was cancelled
        // we will then just redirect them to login
        if(yield cancelled()) {
            //history.push('/login');
            //browserHistory.push('/login');

        }
    }
    
    //return the token for health and wealth
    return response;
}

function verifySec ( salt, password ) {
  
    //var hash = crypto.createHmac('sha512', salt);
    //hash.update(password);
    
    // return hash.digest('base64');
    return password;
}


// Our watcher (saga). It will watch for many things.
function* loginWatcher () { 
    // Generators halt execution until their next step is ready/occurring
    // So it's not like this loop is firing in the background 1000/sec
    // Instead, it says, "okay, true === true", and hits the first step...

    while( true ){

        // ... and in this first it sees a yield statement with 'take' which
        // pauses the loop. It will sit here and WAIT for this action.
        //
        // yield take(ACTION) just says, when our generator sees the ACTION
        // it will pull from that ACTION's payload that we send up, its
        // email and password. ONLY when this happens will the loop move
        // forward...
        const { payload } = yield take(LOGIN_REQUESTING);

        const email = payload.email;
        const password = payload.password;
        // ... and pass the email and password to our loginFlow() function.
        // The fork() method spins up another "process" that will deal with
        // handling the loginFlow's execution in the background!
        // 
        // It also passes back to us, a reference to this forked task
        // which is stored in our const task here. We can use this to manage
        // the task.
        //
        // However, fork() does not block our loop. It's in the background
        // therefore as soon as loop executes this it mores forward...

        const task = yield fork(loginFlow, email, password);
        // ... and begins looking for either CLIENT_UNSET or LOGIN_ERROR!
        // it gets to here and stops and begins watching
        // for these tasks only. Why would it watch for login any more?
        // During the life cycle of this generator, the user will login once
        // and all we need to watch for is either logging out, or a login
        // error. The moment it does grab either of these though it will
        // once again move forward...
        // const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);
        const action = yield take([LOGIN_ERROR, LOGOUT]);

        // ... if, for whatever reason, we decide to logout during this
        // cancel the current action. i.e. the user is being logged
        // in, they get impatient and start hammering the logout button.
        // this would result in the above statement seeing the CLIENT_UNSET
        // action, and down here, knowing that we should cancel the
        // forked 'task' that was trying to log them in. It will do so
        // and move forward...
       
        if(action.type === LOGOUT) yield cancel(task);
        

        // ... finally we'll just log them out. This will unset the client
        // access token... -> follow this back up to the top of the while loop
       // yield call(logout,email);
    }
}

export default loginWatcher;

