import {openStoryPage, screen, PageApi} from '../test-utils';

import type {ElementHandle} from 'puppeteer';

const clearAndType = async (page: PageApi, element: ElementHandle, text: string) => {
    await page.click(element, {clickCount: 3});
    await page.type(element, text);
};

const getValue = async (element: Promise<ElementHandle> | ElementHandle) =>
    (await element).getProperty('value').then((t) => t.jsonValue());

const STORY = {
    section: 'Components|Forms/TextField',
    name: 'Types (controlled)',
};

test('TextField of type text with suggestions', async () => {
    const page = await openStoryPage(STORY);

    // component is lazy mounted, when getting by label, reference is lost after autocomplete load
    const textField = await screen.findByRole('combobox');

    await clearAndType(page, textField, 'a'); // start typing to trigger suggestions list

    const items = await screen.findAllByRole('option');
    expect(items).toHaveLength(5);

    await page.click(items[3]);
    await expect(getValue(screen.findByLabelText('Text with autocomplete (opcional)'))).resolves.toBe(
        'Algeria'
    );
});

test('TextField of type integer', async () => {
    const page = await openStoryPage(STORY);

    const textField = await screen.findByLabelText('Integer (opcional)');

    await clearAndType(page, textField, '+-1,2.3e4$5i%');
    await expect(getValue(textField)).resolves.toBe('12345');
});

test('TextField of type decimal', async () => {
    const page = await openStoryPage(STORY);

    const textField = await screen.findByLabelText('Decimal (opcional)');

    await clearAndType(page, textField, '123,456');
    await expect(getValue(textField)).resolves.toBe('123,456');

    await clearAndType(page, textField, '123.456');
    await expect(getValue(textField)).resolves.toBe('123,456');

    await clearAndType(page, textField, '+-123e.4,5.6i');
    await expect(getValue(textField)).resolves.toBe('123,456');
});

test('TextField of type credit card', async () => {
    const page = await openStoryPage(STORY);

    const textField = await screen.findByLabelText('Credit card (opcional)');

    await clearAndType(page, textField, '1234567890123456');
    await expect(getValue(textField)).resolves.toBe('1234 5678 9012 3456');

    await clearAndType(page, textField, '1234-567.8 9012/34abc567 890');
    await expect(getValue(textField)).resolves.toBe('1234 5678 9012 3456');
});

test('TextField of type expiration date', async () => {
    const page = await openStoryPage(STORY);

    const textField = await screen.findByLabelText('Expiration (opcional)');

    await clearAndType(page, textField, '1234');
    await expect(getValue(textField)).resolves.toBe('12/34');

    await clearAndType(page, textField, ' ');
    await expect(getValue(textField)).resolves.toBe('');

    await clearAndType(page, textField, '934');
    await expect(getValue(textField)).resolves.toBe('09/34');

    await clearAndType(page, textField, '12///34/56');
    await expect(getValue(textField)).resolves.toBe('12/34');
});

test('TextField of type password', async () => {
    const page = await openStoryPage(STORY);

    const textField = await screen.findByLabelText('Password (opcional)');

    await clearAndType(page, textField, 'patata123');
    await expect(getValue(textField)).resolves.toBe('patata123');
});

test('TextField of type date', async () => {
    const page = await openStoryPage(STORY);

    const textField = await screen.findByLabelText('Date (opcional)');

    await clearAndType(page, textField, '06101980');
    await expect(getValue(textField)).resolves.toBe('1980-10-06');
});

test('TextField of type phone', async () => {
    const page = await openStoryPage(STORY);

    const textField = await screen.findByLabelText('Phone (opcional)');

    await clearAndType(page, textField, '654834455');
    await expect(getValue(textField)).resolves.toBe('654 83 44 55');

    await clearAndType(page, textField, '+34 (654) 83-44 / 55');
    await expect(getValue(textField)).resolves.toBe('+34 654 83 44 55');

    await clearAndType(page, textField, '#1 *2');
    await expect(getValue(textField)).resolves.toBe('#1*2');
});
