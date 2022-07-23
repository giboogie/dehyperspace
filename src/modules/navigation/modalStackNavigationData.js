

import AuthLoadingScreen from '../../screens/auth/AuthLoadingView';

import Main from '../../screens/main/index';

//모달 형식의 navigationData입니다. 
//어느 페이지에서도 언제든지 접근 가능하게 하기위해 따로 모았습니다.

const ModalStackNavigationData = [
    {
        name: 'Main',
        component: Main,
        options: {
          gestureEnabled: false,
        },
      },
 
]

export default ModalStackNavigationData;

