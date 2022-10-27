const COOKIE_ACCEPT_GDPR_NAME = 'GDPR';

function setCookie(cookieName: string, value: string, expirationInDays = 365) {
    const d = new Date();
    d.setTime(d.getTime() + expirationInDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;

    document.cookie = `${cookieName}=${value};${expires};path=/`;
}

function getCookie(cookieName: string): string | null {
    const name = cookieName + '=';
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookies = decodedCookies.split(';');

    for (const cookie of cookies) {
        if (cookie.trim().startsWith(name.trim())) {
            return cookie.trim().substring(name.length, cookie.length);
        }
    }

    return null;
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
        setCookie(COOKIE_ACCEPT_GDPR_NAME, 'accepted');
        window.location.reload();
    });
    window.document.getElementById('accept-GDPR');
}

export default function checkAcceptedCookies(): boolean {
    const gdpr = getCookie(COOKIE_ACCEPT_GDPR_NAME);

    if (gdpr !== null) {
        return true;
    }

    showGDPRPrompt();
    return false;
}
