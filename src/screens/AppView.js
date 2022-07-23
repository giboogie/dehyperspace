import React from 'react';

import RootNavigator from '../modules/navigation/RootNavigation'

export default function AppView() {
  // return <Navigator onNavigationStateChange={() => {}} uriPrefix="/app" />;
  return <RootNavigator />;
}
