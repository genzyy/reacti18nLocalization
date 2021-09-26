<div align="center">
    <h1>Get started with react-i18n localization</h1>
</div>

## Packages required

- i18next
- react-i18next
- i18next-http-backend
- i18next-browser-languagedetector

## Installation & About the package

```bash
    npm install i18next react-i18next i18next-http-backend i18next-browser-languagedetector --save
```

- `i18next` is the base package for localization, for converting the content of the page to whatever language that we want.
- `react-i18next` is the i18next package ported for react so that it can be used in react apps.
- `i18next-http-backend` is the backend for localization which fetches the translation resource from the JSON files stored at /public/locales/lng/translation.js (note: this default path can be changed).
- `i18next-browser-languagedetector` is the package to detect the language from the browser.

## Imports

Import all the packages in the respective files as below:

### `index.js`

```javascript
import React, { Suspense } from 'react'; // new.
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Suspense fallback={<div>Loading</div>}>
    <App />
  </Suspense>,
  document.getElementById('root')
);
```

- We need suspense from react for the fallback incase if something goes wrong and the app doesn't load because of the localization.

### `i18n.js`

location: same as index.js (inside src folder).

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: 'te',
    fallbackLng: 'en',
    debug: true,
    react: {
      useSuspense: 'false' // fix the react suspense error.
    },
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie']
    },

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    }
  });

export default i18n;
```

- In the official documentation section `step-by-step` guide has a translation object in the `i18n.init()` function. This can be removed if we are storing the translation resources in the locales folder.
- The `backend` object has loadPath which contains the relative address of the translation.json files. If you want you can change to something else but here the address means that it is inside public folder and then locales folder so the actual address is `public/locales/{lng}/translation.json`.
- The detection object contains and array as order which contains name of the address to look for the language code and it will be followed in the order as they are in the array.
- The caches attribute caches the language code in the options given inside the array.

### `App.js`

```javascript
import { useTranslation } from 'react-i18next';
import './i18n';
import './App.css';

function App() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('common.Hello') + ' ' + t('common.Guys')}</h1>
      <h2>{t('Welcome to React')}</h2>
    </div>
  );
}

export default App;
```

- The `t` function here takes the text given to it and then checks the translation.js file for that language code which we set in the cookie or somewhere else.
- We also see here that in the `h1` the text passed to t function has 'common.Hello' which means that in the translation.json file, look for common group and then look for Hello entry.
- In this way we don't need to check the entire JSON file, we just check the passed group and done.

## I ll write more about this later.
