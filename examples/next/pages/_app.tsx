/* eslint-disable filenames/match-regex */
import '@telefonica/mistica/css/reset.css';
import '@telefonica/mistica/css/roboto.css';
import '@telefonica/mistica/css/mistica.css';
import Link from 'next/link';
import * as React from 'react';
import {ThemeContextProvider, getMovistarSkin} from '@telefonica/mistica';

import type {AppProps} from 'next/app';
import type {ThemeConfig} from '@telefonica/mistica';

const theme: ThemeConfig = {
    skin: getMovistarSkin(),
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
    Link: {type: 'Next13', Component: Link},
};

const App = ({Component, pageProps}: AppProps): JSX.Element => {
    return (
        <ThemeContextProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeContextProvider>
    );
};

export default App;
