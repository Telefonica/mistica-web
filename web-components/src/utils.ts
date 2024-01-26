/** Copied from React source: https://github.com/facebook/react/blob/6c64428d904f8339cddaa0f4850cba89acabe0bb/packages/react-dom-bindings/src/server/escapeTextForBrowser.js# */
const matchHtmlRegExp = /["'&<>]/;

/** Copied from React source: https://github.com/facebook/react/blob/6c64428d904f8339cddaa0f4850cba89acabe0bb/packages/react-dom-bindings/src/server/escapeTextForBrowser.js# */
const escapeHtml = (string: string): string => {
    const str = '' + string;
    const match = matchHtmlRegExp.exec(str);

    if (!match) {
        return str;
    }

    let escape;
    let html = '';
    let index;
    let lastIndex = 0;

    for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
            case 34: // "
                escape = '&quot;';
                break;
            case 38: // &
                escape = '&amp;';
                break;
            case 39: // '
                escape = '&#x27;'; // modified from escape-html; used to be '&#39'
                break;
            case 60: // <
                escape = '&lt;';
                break;
            case 62: // >
                escape = '&gt;';
                break;
            default:
                continue;
        }

        if (lastIndex !== index) {
            html += str.slice(lastIndex, index);
        }

        lastIndex = index + 1;
        html += escape;
    }

    return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
};

/** Copied from React source: https://github.com/facebook/react/blob/6c64428d904f8339cddaa0f4850cba89acabe0bb/packages/react-dom-bindings/src/server/escapeTextForBrowser.js# */
const escapeTextForBrowser = (text: string | number | boolean): string => {
    if (typeof text === 'boolean' || typeof text === 'number') {
        // this shortcircuit helps perf for types that we know will never have
        // special characters, especially given that this function is used often
        // for numeric dom ids.
        return '' + (text as any);
    }
    return escapeHtml(text);
};

export const html = (strings: TemplateStringsArray, ...values: Array<any>): string => {
    let str = '';
    strings.forEach((string, i) => {
        str += string;
        if (i < values.length) {
            str += escapeTextForBrowser(values[i]);
        }
    });

    return str;
};
