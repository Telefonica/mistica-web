const COOKIE_ACCEPT_GDPR_NAME = 'GDPR';
const COOKIE_ACCEPT_VALUE = 'accepted';

function setGDPRCookie(expirationInDays = 365) {
    const d = new Date();
    d.setTime(d.getTime() + expirationInDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;

    document.cookie = `${COOKIE_ACCEPT_GDPR_NAME}=${COOKIE_ACCEPT_VALUE};${expires};path=/`;
}

function hasGdprCookie() {
    return document.cookie.includes(`${COOKIE_ACCEPT_GDPR_NAME}=${COOKIE_ACCEPT_VALUE}`);
}

function showGDPRPrompt() {
    const root = window.document.createElement('div');
    const rootStyle = window.document.createAttribute('style');
    rootStyle.value =
        'position:fixed; background: #333333;width: 100%; bottom: 0; color: antiquewhite;padding: 15px;';

    root.setAttributeNode(rootStyle);

    window.document.body.append(root);
    root.innerHTML = 'This site uses cookies to understand how you use the site.&nbsp;';

    const acceptButton = window.document.createElement('button');
    acceptButton.innerHTML = 'Accept Cookies';
    acceptButton.type = 'button';
    root.appendChild(acceptButton);

    window.document.addEventListener('click', (evt) => {
        evt.preventDefault();
        setGDPRCookie();
        window.location.reload();
    });
    window.document.getElementById('accept-GDPR');
}

export default function checkAcceptedCookies(): boolean {
    const gdpr = hasGdprCookie();

    if (gdpr) {
        setGDPRCookie();
        return true;
    }

    showGDPRPrompt();
    return false;
}
