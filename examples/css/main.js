document.querySelector('#skin-select').addEventListener('change', (e) => {
    const newSkin = e.target.value;
    document.body.dataset.misticaSkin = newSkin;
});

document.querySelector('#color-scheme-select').addEventListener('change', (e) => {
    const newColorScheme = e.target.value;
    document.body.dataset.misticaColorScheme = newColorScheme;
});

document.querySelector('#variant-select').addEventListener('change', (e) => {
    const newVariant = e.target.value;
    document.getElementById('app').dataset.misticaVariant = newVariant;
});

// hack to make css :active pseudo-class work on mobile
document.addEventListener('touchstart', function () {}, false);
