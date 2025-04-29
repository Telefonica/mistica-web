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

document.addEventListener('DOMContentLoaded', function () {
    const verticalSelector = document.querySelector('#vertical-separation');
    const misticaGridTablet = document.querySelector('.mistica-grid__tablet');
    const misticaGridMobile = document.querySelector('.mistica-grid__mobile');

    function applyGap() {
        const verticalValue = verticalSelector.value;

        if (window.innerWidth < 768) {
            if (misticaGridMobile) {
                misticaGridMobile.style.gap = verticalValue + 'px';
            }
        } else if (window.innerWidth < 1024) {
            if (misticaGridTablet) {
                misticaGridTablet.style.gap = verticalValue + 'px';
            }
        }
    }

    verticalSelector.addEventListener('change', applyGap);
    window.addEventListener('resize', applyGap);
});
