import {openStoryPage, screen} from '../test-utils';

const getOutline = async (index = 0) => {
    const cards = await screen.findAllByTestId('DataCard');
    return cards[index].evaluate((element) => {
        const container = element.firstElementChild;
        if (!container) {
            throw new Error('Card outline container not found');
        }
        const outline = window.getComputedStyle(container, '::after');
        return {color: outline.borderColor, width: outline.borderWidth, inset: outline.inset};
    });
};

test.each(['checkbox', 'switch', 'radio'])('outline follows the %s in top actions', async (control) => {
    const page = await openStoryPage({
        id: 'components-cards-selection--selection',
        device: 'DESKTOP',
        args: {control},
    });
    const first = await screen.findByRole(control, {name: 'First This is a description'});
    const unselected = await getOutline();
    await first.focus();
    await page.keyboard.press('Space');
    const selected = await getOutline();
    expect(selected.color).not.toBe(unselected.color);
    expect(selected.width).toBe('2px');
    expect(selected.inset).toBe('-4px');
    expect(await first.evaluate((element) => element === document.activeElement)).toBe(true);
    if (control === 'radio') {
        await (await screen.findByRole(control, {name: 'Second This is a description'})).click();
    } else {
        await page.keyboard.press('Space');
    }
    expect((await getOutline()).color).toBe(unselected.color);
});

test('selected prop overrides the checkbox in top actions', async () => {
    await openStoryPage({
        id: 'components-cards-selection--selection',
        device: 'DESKTOP',
        args: {selected: false},
    });
    const checkbox = await screen.findByRole('checkbox', {name: 'First This is a description'});
    const unselected = await getOutline();
    await checkbox.click();
    expect(await checkbox.evaluate((element) => element.getAttribute('aria-checked'))).toBe('false');
    expect((await getOutline()).color).toBe(unselected.color);
});

test('custom controls only select the card through selected', async () => {
    await openStoryPage({id: 'components-cards-selection--custom-selection', device: 'DESKTOP'});
    const unlocked = await getOutline(2);
    await (await screen.findByRole('button', {name: 'Lock'})).click();
    expect((await getOutline(2)).color).toBe(unlocked.color);
    const unselected = await getOutline(1);
    await (await screen.findByRole('button', {name: 'Add favorite'})).click();
    expect((await getOutline(1)).color).not.toBe(unselected.color);
});

test.each(['data', 'media', 'cover', 'naked', 'advanced'])(
    'card body selects %s and owns keyboard focus',
    async (card) => {
        const page = await openStoryPage({
            id: 'components-cards-selection--selection',
            device: 'DESKTOP',
            args: {card},
        });
        const surface = await screen.findByRole('checkbox', {
            name: 'First This is a description',
        });
        await (await screen.findByText('First', {exact: true})).click();
        expect(await surface.evaluate((element) => element.getAttribute('aria-checked'))).toBe('true');
        expect(await surface.evaluate((element) => element === document.activeElement)).toBe(true);
        await page.keyboard.press('Space');
        expect(await surface.evaluate((element) => element.getAttribute('aria-checked'))).toBe('false');
    }
);

test.each(['data', 'media', 'cover', 'naked', 'advanced'])(
    'default selectors appear at the top right of the %s card',
    async (card) => {
        for (const control of ['checkbox', 'switch', 'radio']) {
            await openStoryPage({
                id: 'components-cards-selection--selection',
                device: 'DESKTOP',
                args: {card, control},
            });
            const surface = await screen.findByRole(control, {
                name: 'First This is a description',
            });
            const position = await surface.evaluate((element) => {
                const selector = element
                    .closest(
                        '[data-testid="DataCard"], [data-testid="MediaCard"], [data-testid="CoverCard"], [data-testid="NakedCard"], [data-testid="AdvancedDataCard"]'
                    )
                    ?.querySelector<HTMLElement>('[data-testid="topActions"]');
                if (!selector?.offsetParent) {
                    throw new Error('Selection indicator not found');
                }
                const cardBounds = selector.offsetParent.getBoundingClientRect();
                const border = window.getComputedStyle(selector.offsetParent);
                const controlBounds = selector.getBoundingClientRect();
                return {
                    top: controlBounds.top - cardBounds.top - parseFloat(border.borderTopWidth),
                    right: cardBounds.right - controlBounds.right - parseFloat(border.borderRightWidth),
                };
            });
            expect(position.top).toBeCloseTo(16);
            expect(position.right).toBeCloseTo(16);
        }
    }
);

test.each(['checkbox', 'switch', 'radio'])('custom %s render stays in the slot', async (control) => {
    await openStoryPage({
        id: 'components-cards-selection--selection',
        device: 'DESKTOP',
        args: {control, customRender: true},
    });
    const surface = await screen.findByRole(control, {name: 'First This is a description Custom control'});
    expect(
        await surface.evaluate((element) => {
            const selector = element.querySelector('[aria-hidden="true"]');
            const description = Array.from(element.querySelectorAll('p')).find(
                (paragraph) => paragraph.textContent === 'This is a description'
            );
            if (!selector || !description) {
                throw new Error('Custom selector or description not found');
            }
            return selector.getBoundingClientRect().top >= description.getBoundingClientRect().bottom;
        })
    ).toBe(true);
});
