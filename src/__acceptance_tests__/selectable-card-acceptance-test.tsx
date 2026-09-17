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

test.each(['checkbox', 'switch', 'radio'])('outline follows the %s in the card slot', async (control) => {
    const page = await openStoryPage({
        id: 'components-cards-selection--selection',
        device: 'DESKTOP',
        args: {control},
    });
    const first = await screen.findByRole(control, {name: 'Select First'});
    const unselected = await getOutline();
    await first.focus();
    await page.keyboard.press('Space');
    const selected = await getOutline();
    expect(selected.color).not.toBe(unselected.color);
    expect(selected.width).toBe('2px');
    expect(selected.inset).toBe('-4px');
    expect(await first.evaluate((element) => element === document.activeElement)).toBe(true);
    if (control === 'radio') {
        await (await screen.findByRole(control, {name: 'Select Second'})).click();
    } else {
        await page.keyboard.press('Space');
    }
    expect((await getOutline()).color).toBe(unselected.color);
});

test('selected prop overrides the checkbox in the slot', async () => {
    await openStoryPage({
        id: 'components-cards-selection--selection',
        device: 'DESKTOP',
        args: {selected: false},
    });
    const checkbox = await screen.findByRole('checkbox', {name: 'Select First'});
    const unselected = await getOutline();
    await checkbox.click();
    expect(await checkbox.evaluate((element) => element.getAttribute('aria-checked'))).toBe('true');
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
