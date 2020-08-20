import {openStoryPage, screen, PageApi} from '../test-utils';

import type {ElementHandle} from 'puppeteer';

const clearAndType = async (page: PageApi, element: ElementHandle, text: string) => {
    await page.click(element, {clickCount: 3});
    await page.type(element, text);
};

const getValue = async (element: Promise<ElementHandle> | ElementHandle) =>
    (await element).getProperty('value').then((t) => t.jsonValue());

const CONTROLLED_STORY = {
    section: 'Components|Forms/FormFields',
    name: 'Types (controlled)',
};

const UNCONTROLLED_STORY = {
    section: 'Components|Forms/FormFields',
    name: 'Types (uncontrolled)',
};

const STORIES_MAP = {
    controlled: CONTROLLED_STORY,
    uncontrolled: UNCONTROLLED_STORY,
};

type StoryType = keyof typeof STORIES_MAP;

const STORY_TYPES = Object.keys(STORIES_MAP) as Array<StoryType>;

const getStoryOfType = (storyType: StoryType) => STORIES_MAP[storyType];

test('FormTextField with suggestions', async () => {
    const page = await openStoryPage(CONTROLLED_STORY);

    const field = await screen.findByLabelText('Text with suggestions');

    await clearAndType(page, field, 'a'); // start typing to trigger suggestions list
    const items = await screen.findAllByRole('option');
    expect(items).toHaveLength(5);

    const item = await screen.findByText('Algeria');

    await page.click(item);
    return;
    await expect(getValue(screen.findByLabelText('Text with suggestions'))).resolves.toBe('Algeria');
});

test.each(STORY_TYPES)('FormIntegerField (%s)', async (storyType) => {
    const page = await openStoryPage(getStoryOfType(storyType));

    const field = await screen.findByLabelText('Integer');

    await clearAndType(page, field, '+-1,2.3e4$5i%');
    await expect(getValue(field)).resolves.toBe('12345');
});

test.each(STORY_TYPES)('FormDecimalField (%s)', async (storyType) => {
    const page = await openStoryPage(getStoryOfType(storyType));

    const field = await screen.findByLabelText('Decimal');

    await clearAndType(page, field, '123,456');
    await expect(getValue(field)).resolves.toBe('123,456');

    await clearAndType(page, field, '123.456');
    await expect(getValue(field)).resolves.toBe('123,456');

    await clearAndType(page, field, '+-123e.4,5.6i');
    await expect(getValue(field)).resolves.toBe('123,456');
});

test.each(STORY_TYPES)('FormCreditCardNumberField (%s)', async (storyType) => {
    const page = await openStoryPage(getStoryOfType(storyType));

    const field = await screen.findByLabelText('Credit card');

    await clearAndType(page, field, '1234567890123456');
    await expect(getValue(field)).resolves.toBe('1234 5678 9012 3456');

    await clearAndType(page, field, '1234-567.8 9012/34abc567 890');
    await expect(getValue(field)).resolves.toBe('1234 5678 9012 3456');
});

test.each(STORY_TYPES)('FormCreditCardExpirationField (%s)', async (storyType) => {
    const page = await openStoryPage(getStoryOfType(storyType));

    const field = await screen.findByLabelText('Expiration');

    await clearAndType(page, field, '1234');
    await expect(getValue(field)).resolves.toBe('12/34');

    await clearAndType(page, field, ' ');
    await expect(getValue(field)).resolves.toBe('');

    await clearAndType(page, field, '934');
    await expect(getValue(field)).resolves.toBe('09/34');

    await clearAndType(page, field, '12///34/56');
    await expect(getValue(field)).resolves.toBe('12/34');
});

test.each(STORY_TYPES)('FormPasswordField (%s)', async (storyType) => {
    const page = await openStoryPage(getStoryOfType(storyType));

    const field = await screen.findByLabelText('Password');

    await clearAndType(page, field, 'patata123');
    await expect(getValue(field)).resolves.toBe('patata123');
});

test.each(STORY_TYPES)('FormDateField (%s)', async (storyType) => {
    const page = await openStoryPage(getStoryOfType(storyType));

    const field = await screen.findByLabelText('Date');

    await clearAndType(page, field, '06101980');
    await expect(getValue(field)).resolves.toBe('1980-10-06');
});

test.each(STORY_TYPES)('FormPhoneNumberField (%s)', async (storyType) => {
    const page = await openStoryPage(getStoryOfType(storyType));

    const field = await screen.findByLabelText('Phone');

    await clearAndType(page, field, '654834455');
    await expect(getValue(field)).resolves.toBe('654 83 44 55');

    await clearAndType(page, field, '+34 (654) 83-44 / 55');
    await expect(getValue(field)).resolves.toBe('+34 654 83 44 55');

    await clearAndType(page, field, '#1 *2');
    await expect(getValue(field)).resolves.toBe('#1*2');
});

test.each(STORY_TYPES)('FormSearchField (%s)', async (storyType) => {
    const page = await openStoryPage(getStoryOfType(storyType));

    const field = await screen.findByLabelText('Search');

    await clearAndType(page, field, 'something');
    await expect(getValue(field)).resolves.toBe('something');
    await page.click(await screen.findByLabelText('Borrar búsqueda'));
    await expect(getValue(field)).resolves.toBe('');
});
