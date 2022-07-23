import I18n from 'react-native-i18n';

import en from './en';
import ko from './ko';

I18n.fallbacks = true;

I18n.translations = {
  ko,
  en,

};

I18n.locale = 'ko';


export default I18n;