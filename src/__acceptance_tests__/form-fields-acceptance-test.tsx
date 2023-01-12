import {openStoryPage, screen, PageApi, waitFor} from '../test-utils';

import type {ElementHandle} from '../test-utils';

const clearAndType = async (page: PageApi, element: ElementHandle, text: string) => {
    await page.click(element, {clickCount: 3});
    await page.type(element, text);
};

const getValue = async (element: Promise<ElementHandle> | ElementHandle) =>
    (await element).getProperty('value').then((t) => t?.jsonValue());

const CONTROLLED_STORY = {id: 'components-input-fields--types-controlled'};

const UNCONTROLLED_STORY = {id: 'components-input-fields--types-uncontrolled'};

const STORIES_MAP = {
    controlled: CONTROLLED_STORY,
    uncontrolled: UNCONTROLLED_STORY,
};

type StoryType = keyof typeof STORIES_MAP;

const STORY_TYPES = Object.keys(STORIES_MAP) as Array<StoryType>;

const getStoryOfType = (storyType: StoryType) => STORIES_MAP[storyType];

test('TextField with suggestions', async () => {
    const page = await openStoryPage(CONTROLLED_STORY);

    const field = await screen.findByLabelText('Text with suggestions');

    await clearAndType(page, field, 'a'); // start typing to trigger suggestions list
    const items = await screen.findAllByRole('option');
    expect(items).toHaveLength(5);

    const item = await screen.findByText('Algeria');

    await page.click(item);
    await expect(getValue(screen.findByLabelText('Text with suggestions'))).resolves.toBe('Algeria');
});

test.each(STORY_TYPES)('IntegerField (%s)', async (storyType) => {
    const page = await openStoryPage(getStoryOfType(storyType));

    const field = await screen.findByLabelText('Integer');

    await clearAndType(page, field, '+-1,2.3e4$5i%');
    expect(await getValue(field)).toBe('12345');
});

test.each(STORY_TYPES)('DecimalField (%s)', async (storyType) => {
    const page = await openStoryPage(getStoryOfType(storyType));

    const field = await screen.findByLabelText('Decimal');

    await clearAndType(page, field, '123,456');
    expect(await getValue(field)).toBe('123,456');

    await clearAndType(page, field, '123.456');
    expect(await getValue(field)).toBe('123,456');

    await clearAndType(page, field, '+-123e.4,5.6i');
    expect(await getValue(field)).toBe('123,456');

    // test editing the number to set the decimal char in a previous pos
    await clearAndType(page, field, '124,5');
    expect(await getValue(field)).toBe('124,5');
    await field.evaluate((el) => {
        // set the caret position on a digit before the ,
        (el as HTMLInputElement).setSelectionRange(2, 2);
    });
    await field.type('.3');
    expect(await getValue(field)).toBe('12,345');

    // test editing the number to set the decimal char in a later pos
    await clearAndType(page, field, '1,24');
    expect(await getValue(field)).toBe('1,24');
    await field.evaluate((el) => {
        // set the caret position on a digit after the ,
        (el as HTMLInputElement).setSelectionRange(3, 3);
    });
    await field.type('.3');
    expect(await getValue(field)).toBe('1,234'); // only the first , should be considered.
});

test.each(STORY_TYPES)('CreditCardNumberField (%s)', async (storyType) => {
    const page = await openStoryPage(getStoryOfType(storyType));

    const field = await screen.findByLabelText('Credit card');

    await clearAndType(page, field, '1234567890123456');
    expect(await getValue(field)).toBe('1234 5678 9012 3456');

    await clearAndType(page, field, '1234-567.8 9012/34abc567 890');
    expect(await getValue(field)).toBe('1234 5678 9012 3456');

    await clearAndType(page, field, '123456789012');
    expect(await getValue(field)).toBe('1234 5678 9012');
    await field.evaluate((el) => {
        // set the caret position after the first block
        (el as HTMLInputElement).setSelectionRange(4, 4);
    });
    await field.type('1234');
    expect(await getValue(field)).toBe('1234 1234 5678 9012');
});

test.each(STORY_TYPES)('CreditCardExpirationField (%s)', async (storyType) => {
    const page = await openStoryPage(getStoryOfType(storyType));

    const field = await screen.findByLabelText('Expiration');

    await clearAndType(page, field, '1234');
    expect(await getValue(field)).toBe('12/34');

    await clearAndType(page, field, ' ');
    expect(await getValue(field)).toBe('');

    await clearAndType(page, field, '934');
    expect(await getValue(field)).toBe('09/34');

    await clearAndType(page, field, '12///34/56');
    expect(await getValue(field)).toBe('12/34');
});

test.each(STORY_TYPES)('PasswordField (%s)', async (storyType) => {
    const page = await openStoryPage(getStoryOfType(storyType));

    const field = await screen.findByLabelText('Password');

    await clearAndType(page, field, 'patata123');
    expect(await getValue(field)).toBe('patata123');

    await field.evaluate((el) => {
        // move the caret
        (el as HTMLInputElement).setSelectionRange(6, 6);
    });
    await page.click(await screen.findByLabelText('Mostrar u ocultar contraseña'));

    await waitFor(async () => {
        expect(await field.getProperty('selectionStart').then((t) => t?.jsonValue())).toBe(6);
    });

    await field.evaluate((el) => {
        // move the caret
        (el as HTMLInputElement).setSelectionRange(0, 0);
    });

    await page.click(await screen.findByLabelText('Mostrar u ocultar contraseña'));

    expect(await field.getProperty('selectionStart').then((t) => t?.jsonValue())).toBe(0);
});

test('DateField (controlled)', async () => {
    await openStoryPage(getStoryOfType('controlled'));
    const field = await screen.findByLabelText('Date');
    await field.focus();
    await field.type('06101980');
    expect(await getValue(field)).toBe('1980-10-06');
});

test('DateField (uncontrolled)', async () => {
    await openStoryPage(getStoryOfType('uncontrolled'));
    const field = await screen.findByLabelText('Date (opcional)');
    await field.focus();
    await field.type('06101980');
    expect(await getValue(field)).toBe('1980-10-06');
});

test.each(STORY_TYPES)('PhoneNumberField (%s)', async (storyType) => {
    const page = await openStoryPage(getStoryOfType(storyType));

    const field = await screen.findByLabelText('Phone');

    await clearAndType(page, field, '654834455');
    expect(await getValue(field)).toBe('654 83 44 55');

    await clearAndType(page, field, '+34 (654) 83-44 / 55');
    expect(await getValue(field)).toBe('+34 654 83 44 55');

    await clearAndType(page, field, '#1 *2');
    expect(await getValue(field)).toBe('#1*2');

    await clearAndType(page, field, '6542211');
    expect(await getValue(field)).toBe('654 22 11');
    await field.evaluate((el) => {
        // set the caret position after the 654 prefix
        (el as HTMLInputElement).setSelectionRange(3, 3);
    });
    await field.type('39');
    expect(await getValue(field)).toBe('654 39 22 11');
});

test.each(STORY_TYPES)('SearchField (%s)', async (storyType) => {
    const page = await openStoryPage(getStoryOfType(storyType));

    const field = await screen.findByLabelText('Search');

    await clearAndType(page, field, 'something');
    expect(await getValue(field)).toBe('something');
    await page.click(await screen.findByLabelText('Borrar búsqueda'));
    expect(await getValue(field)).toBe('');
});
