document.querySelectorAll('.mistica-counter').forEach((counterEl) => {
    const buttons = Array.from(counterEl.querySelectorAll('.mistica-counter__button'));
    const decreaseButton = buttons[0];
    const increaseButton = buttons[buttons.length - 1];

    const input = counterEl.querySelector('input[type="number"]');
    const min = Number(input.min);
    const max = Number(input.max);
    const step = Number(input.step);

    const normalizeValue = () => {
        const normalizedValue = Math.max(min, Math.min(max, input.value));
        input.value = normalizedValue;
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
});
