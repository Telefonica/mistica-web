/* eslint-disable filenames/match-regex */
import '@telefonica/mistica/css/reset.css';
import '@telefonica/mistica/css/roboto.css';
import '@telefonica/mistica/css/mistica.css';
import NextLink from 'next/link';
import * as React from 'react';
import {ThemeContextProvider, getMovistarSkin, type ThemeConfig} from '@telefonica/mistica';

const Link: ThemeConfig['Link'] = ({innerRef, children, to, ...props}) => (
    <NextLink href={to} ref={innerRef} {...props}>
        {children}
    </NextLink>
);

const App = ({Component, pageProps}) => {
    return (
        <ThemeContextProvider
            theme={{
                skin: getMovistarSkin(),
                i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
                Link, // Configure Mistica to use Next Links
            }}
        >
            <Component {...pageProps} />
        </ThemeContextProvider>
    );
};

export default App;
