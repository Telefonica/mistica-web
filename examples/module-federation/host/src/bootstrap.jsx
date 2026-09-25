import {createRoot} from 'react-dom/client';
import {ThemeContextProvider, getTelefonicaSkin} from '@telefonica/mistica';
import '@telefonica/mistica/css/mistica.css';
import '@fonts/telefonica-font.css';
import App from './app';
import GlobalStyles from '../../global-styles';

/**
 * The host owns the only ThemeContextProvider of the page. The remote reads it through the shared
 * copy of @telefonica/mistica, so the theme must never be shared two times.
 */
const theme = {
    skin: getTelefonicaSkin(),
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

createRoot(document.getElementById('root')).render(
    <ThemeContextProvider theme={theme}>
        <GlobalStyles />
        <App />
    </ThemeContextProvider>
);
