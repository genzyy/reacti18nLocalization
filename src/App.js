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
