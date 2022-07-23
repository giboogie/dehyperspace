import { combineReducers } from 'redux';
import AuthStore from './auth/login/Authstore'
import SignupStore from './auth/siginup/store';
import mainStore from './main/mainStore';
import frigeStore from './main/frige/frigeStore';
import walletStore from './main/wallet/walletStore';
import safetyStore from './main/safety/safetyStore';
// import LoginStore from'./auth/login/store';
import UserFindStore from './auth/userfind/store';
const storeIndex = combineReducers({
  AuthStore,
  mainStore,
  frigeStore,
  walletStore,
  safetyStore,
  SignupStore,
  UserFindStore,
});

export default storeIndex;