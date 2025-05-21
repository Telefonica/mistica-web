document.querySelectorAll('.mistica-counter').forEach((counterEl) => {
    const buttons = Array.from(counterEl.querySelectorAll('.mistica-counter__button'));
    const decreaseButton = buttons[0];
    const increaseButton = buttons[buttons.length - 1];

    const input = counterEl.querySelector('input[type="number"]');
    const min = Number(input.min);
    const max = Number(input.max);
    const step = Number(input.step);
    const counterLabel = input.dataset.misticaCounterLabel;

    const normalizeValue = () => {
        const normalizedValue = Math.max(min, Math.min(max, input.value));
        input.value = normalizedValue;
        input.setAttribute('aria-label', `${normalizedValue}, ${counterLabel}. Mínimo ${min}, máximo ${max}`);
        decreaseButton.disabled = normalizedValue === min;
        increaseButton.disabled = normalizedValue === max;
    };

    decreaseButton.addEventListener('click', () => {
        input.value = Number(input.value) - step;
        normalizeValue();
    });

    increaseButton.addEventListener('click', () => {
        input.value = Number(input.value) + step;
        normalizeValue();
    });

    input.addEventListener('change', normalizeValue);
    normalizeValue();
    // small timeout to avoid screen readers reading the initial value when page loads
    setTimeout(() => {
        input.setAttribute('aria-live', 'polite');
    }, 100);
});
