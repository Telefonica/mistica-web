import {openStoryPage, screen, PageApi} from '../test-utils';

import type {ElementHandle} from 'puppeteer';

const clearAndType = async (page: PageApi, element: ElementHandle, text: string) => {
    await page.click(element, {clickCount: 3});
    await page.type(element, text);
};

const getValue = async (element: Promise<ElementHandle> | ElementHandle) =>
    (await element).getProperty('value').then((t) => t.jsonValue());

const STORY = {
    section: 'Components|Forms/FormFields',
    name: 'Types (controlled)',
};

test('FormField of type text with suggestions', async () => {
    const page = await openStoryPage(STORY);

    const FormField = await screen.findByLabelText('Text with suggestions');

    await clearAndType(page, FormField, 'a'); // start typing to trigger suggestions list
    const items = await screen.findAllByRole('option');
    expect(items).toHaveLength(5);

    const item = await screen.findByText('Algeria');

    await page.click(item);
    return;
    await expect(getValue(screen.findByLabelText('Text with suggestions'))).resolves.toBe('Algeria');
});

test('FormField of type integer', async () => {
    const page = await openStoryPage(STORY);

    const FormField = await screen.findByLabelText('Integer');

    await clearAndType(page, FormField, '+-1,2.3e4$5i%');
    await expect(getValue(FormField)).resolves.toBe('12345');
});

test('FormField of type decimal', async () => {
    const page = await openStoryPage(STORY);

    const FormField = await screen.findByLabelText('Decimal');

    await clearAndType(page, FormField, '123,456');
    await expect(getValue(FormField)).resolves.toBe('123,456');

    await clearAndType(page, FormField, '123.456');
    await expect(getValue(FormField)).resolves.toBe('123,456');

    await clearAndType(page, FormField, '+-123e.4,5.6i');
    await expect(getValue(FormField)).resolves.toBe('123,456');
});

test('FormField of type credit card', async () => {
    const page = await openStoryPage(STORY);

    const FormField = await screen.findByLabelText('Credit card');

    await clearAndType(page, FormField, '1234567890123456');
    await expect(getValue(FormField)).resolves.toBe('1234 5678 9012 3456');

    await clearAndType(page, FormField, '1234-567.8 9012/34abc567 890');
    await expect(getValue(FormField)).resolves.toBe('1234 5678 9012 3456');
});

test('FormField of type expiration date', async () => {
    const page = await openStoryPage(STORY);

    const FormField = await screen.findByLabelText('Expiration');

    await clearAndType(page, FormField, '1234');
    await expect(getValue(FormField)).resolves.toBe('12/34');

    await clearAndType(page, FormField, ' ');
    await expect(getValue(FormField)).resolves.toBe('');

    await clearAndType(page, FormField, '934');
    await expect(getValue(FormField)).resolves.toBe('09/34');

    await clearAndType(page, FormField, '12///34/56');
    await expect(getValue(FormField)).resolves.toBe('12/34');
});

test('FormField of type password', async () => {
    const page = await openStoryPage(STORY);

    const FormField = await screen.findByLabelText('Password');

    await clearAndType(page, FormField, 'patata123');
    await expect(getValue(FormField)).resolves.toBe('patata123');
});

test('FormField of type date', async () => {
    const page = await openStoryPage(STORY);

    const FormField = await screen.findByLabelText('Date');

    await clearAndType(page, FormField, '06101980');
    await expect(getValue(FormField)).resolves.toBe('1980-10-06');
});

test('FormField of type phone', async () => {
    const page = await openStoryPage(STORY);

    const FormField = await screen.findByLabelText('Phone');

    await clearAndType(page, FormField, '654834455');
    await expect(getValue(FormField)).resolves.toBe('654 83 44 55');

    await clearAndType(page, FormField, '+34 (654) 83-44 / 55');
    await expect(getValue(FormField)).resolves.toBe('+34 654 83 44 55');

    await clearAndType(page, FormField, '#1 *2');
    await expect(getValue(FormField)).resolves.toBe('#1*2');
});
