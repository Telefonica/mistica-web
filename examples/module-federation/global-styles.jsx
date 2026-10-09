import {skinVars} from '@telefonica/mistica';

/**
 * Mistica injects no font family and no background color. Both come from the application, and they
 * belong under ThemeContextProvider, so the background follows the theme in dark mode.
 *
 * The host owns the page, so the copy of the host styles the components of the remote too. The
 * remote renders this component only on its stand-alone page.
 */
const GlobalStyles = () => (
    <style>{`
        body {
            margin: 0;
            font-family: 'Telefonica Sans', 'Helvetica', 'Arial', sans-serif;
            background-color: ${skinVars.colors.background};
        }
        input, textarea, pre, code {
            font: inherit;
        }
    `}</style>
);

export default GlobalStyles;
