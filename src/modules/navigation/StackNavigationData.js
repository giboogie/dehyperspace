import AuthLoadingScreen from '../../screens/auth/AuthLoadingView';
import LoginScreen from '../../screens/auth/login/LoginView';
import SignUpScreen from '../../screens/auth/signup/SignupView';
import UserFindScreen from '../../screens/auth/userfind';
// import AuthMainScreen from '../../screens/auth/AuthMain'
import TabNavigator from './mainTabNavigation';
import PasswordScreen from '../../screens/auth/userfind/PasswordView'
const StackNavigationData = [
  {
    name: 'Loading',
    component: AuthLoadingScreen,
    options: {
      gestureEnabled: true,
    },
  },
  {
    name: 'Login',
    component: LoginScreen,
    options: {
      gestureEnabled: true,
    },
  },
  {
    name: 'SignUp',
    component: SignUpScreen,
    options: {
      gestureEnabled: true,
    },
  },
  {
    name: 'UserFind',
    component: UserFindScreen,
    options: {
      gestureEnabled: true,
    },
  },
  {
    name: 'Home',
    component:TabNavigator,
    options:{
      gestureEnabled:true
    }
  }

]

export default StackNavigationData;