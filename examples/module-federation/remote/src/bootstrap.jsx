import {createRoot} from 'react-dom/client';
import {Box, ResponsiveLayout, ThemeContextProvider, getTelefonicaSkin} from '@telefonica/mistica';
import '@telefonica/mistica/css/mistica.css';
import '@fonts/telefonica-font.css';
import PromoCard from './promo-card';
import GlobalStyles from '../../global-styles';

/** This entry renders the remote on its own, so you can open http://localhost:3002 to check it. */
const theme = {
    skin: getTelefonicaSkin(),
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

createRoot(document.getElementById('root')).render(
    <ThemeContextProvider theme={theme}>
        <GlobalStyles />
        <ResponsiveLayout>
            <Box paddingY={24}>
                <PromoCard />
            </Box>
        </ResponsiveLayout>
    </ThemeContextProvider>
);
