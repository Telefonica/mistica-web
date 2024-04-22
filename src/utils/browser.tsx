export const redirect = (url: string, external = false, loadOnTop = false): void => {
    if (external) {
        window.open(url, '_blank');
    } else if (loadOnTop) {
        window.open(url, '_top');
    } else {
        window.location.assign(url);
    }
};
