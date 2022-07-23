import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';



import {
    SIGNUP_REQUESTING,
    signupResult,
    SIGNUP_ERROR,
} from './store';

import axios from 'axios';
import * as config from '../../../config';

//const loginUrl = `http://localhost:7900/api/users/signin`;

async function signupApi(_name, _email, _pw, _fd, _gender, _ageGr, _events)
{

    try{
        console.log("시작"+_name+ _email+ _pw+_fd+_gender+_ageGr+_events)
        const headerParams = {
            'Content-Type': 'application/json',
        }

        const response = await axios({
            method: 'post',
            url: `${config.URL}/foodUsers/signup`,
            headers: headerParams,
            data:{
                name: _name,
                email: _email,
                pw: _pw,
                fd: _fd,
                gender: _gender,
                ageGr: _ageGr,
                events: _events,

            },
        })
         
        return response.data;

    }catch(err){
        console.log(err)
        throw err.response;
    }
}

function* signupFlow (_name, _email, _pw, _fd, _gender, _ageGr, _events) {
    let response;
    try {
        response = yield call (signupApi, _name, _email, _pw, _fd, _gender, _ageGr, _events);
        yield put(signupResult(response));
    }catch (error) {
        // error? send it to redux
        // yield put(errorIn(error));
        console.log(error)
        yield put ({type:SIGNUP_ERROR, error})
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

// Our watcher (saga). It will watch for many things.
function* signupWatcher () { 
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
        const { payload } = yield take(SIGNUP_REQUESTING);
        const name = payload.name;
        const email = payload.email;
        const pw = payload.pw;
        const fd = payload.fd;
        const gender = payload.gender;
        const ageGr =payload.ageGr;
        const events = payload.events;
   
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

        const task = yield fork(signupFlow, name, email, pw, fd, gender,ageGr,events);
        // ... and begins looking for either CLIENT_UNSET or LOGIN_ERROR!
        // it gets to here and stops and begins watching
        // for these tasks only. Why would it watch for login any more?
        // During the life cycle of this generator, the user will login once
        // and all we need to watch for is either logging out, or a login
        // error. The moment it does grab either of these though it will
        // once again move forward...
        // const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);
       
       // const action = yield take(SIGNUP_ERROR);

        // ... if, for whatever reason, we decide to logout during this
        // cancel the current action. i.e. the user is being logged
        // in, they get impatient and start hammering the logout button.
        // this would result in the above statement seeing the CLIENT_UNSET
        // action, and down here, knowing that we should cancel the
        // forked 'task' that was trying to log them in. It will do so
        // and move forward...
        //if(action.type === LOGIN_ERROR) yield cancel(task);

        // ... finally we'll just log them out. This will unset the client
        // access token... -> follow this back up to the top of the while loop
        //yield call(logout);
    }
}

export default signupWatcher;

