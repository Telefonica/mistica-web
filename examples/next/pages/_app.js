/* eslint-disable filenames/match-regex */
import '@telefonica/mistica/css/reset.css';
import '@telefonica/mistica/css/roboto.css';
import NextLink from 'next/link';
import * as React from 'react';
import {ThemeContextProvider, ServerSideStyles, getMovistarSkin} from '@telefonica/mistica';

/**
 * The to prop is used in mistica touchable components (Touchable, TextLink, Buttons, etc) to signal client side
 * navigation (unlike href which is used to force full page load navigation).
 * In Next, client side navigation is done with <Link href="/route"> for static routes (routes without params),
 * and <Link href="/user/[name]" as="/user/[name]"> for dynamic routes (routes with params).
 * To adapt the to prop to Next links, we need to generate the href and as props from the provided to prop.
 * For static routes it's quite easy, to maps to href, that's all.
 * But for dynamic routes we'll need some logic, here is an example of use with /user/[name] route:
 */
const calcLinkProps = (to) => {
    if (to.match(/user\/.+/)) {
        return {href: '/user/[name]', as: to};
    }
    return {href: to};
};

const Link = ({to, innerRef, children, ...props}) => (
    <NextLink {...calcLinkProps(to)}>
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
