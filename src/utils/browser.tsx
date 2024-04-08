export const redirect = (url: string, external = false, loadOnTop = false): void => {
    if (external) {
        window.open(url, '_blank');
    } else if (loadOnTop) {
        window.open(url, '_top');
    } else {
        document.location.href = url;
    }
};
