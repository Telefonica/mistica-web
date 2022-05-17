/* eslint-disable filenames/match-regex */
import '@telefonica/mistica/css/reset.css';
import '@telefonica/mistica/css/roboto.css';
import NextLink from 'next/link';
import * as React from 'react';
import {ThemeContextProvider, ServerSideStyles, getMovistarSkin} from '@telefonica/mistica';

const Link = ({innerRef, children, to, ...props}) => (
    <NextLink href={to}>
        <a ref={innerRef} {...props}>
            {children}
        </a>
    </NextLink>
);

const App = ({Component, pageProps}) => {
    React.useEffect(() => {
        ServerSideStyles.removeServerSideStyles();
    }, []);

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
