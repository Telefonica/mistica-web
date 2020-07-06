/* eslint-disable filenames/match-regex */
import '@telefonica/mistica/css/reset.css';
import '@telefonica/mistica/css/roboto.css';
import * as React from 'react';
import {ThemeContextProvider, ServerSideStyles} from '@telefonica/mistica';

const App = ({Component, pageProps}) => {
    React.useEffect(() => {
        ServerSideStyles.removeServerSideStyles();
    }, []);

    return (
        <ThemeContextProvider
            theme={{skin: 'Movistar', i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'}}}
        >
            <Component {...pageProps} />
        </ThemeContextProvider>
    );
};

export default App;
