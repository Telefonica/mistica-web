import {test, expect} from '../test-utils/component';

test('renders static text', async ({mount}) => {
    const component = await mount('ai-card/Content', {text: 'Hello world'});
    await expect(component.getByTestId('AiCard')).toContainText('Hello world');
});
test('is non-interactive when no onPress is provided', async ({mount}) => {
    const component = await mount('ai-card/Content', {text: 'Hello'});
    await expect(component.getByRole('button')).toHaveCount(0);
});
test('renders as an accessible button when onPress is provided', async ({mount}) => {
    const component = await mount('ai-card/Content', {text: 'Hello', interactive: true});
    await expect(component.getByRole('button', {name: 'Hello', exact: true})).toHaveCount(1);
});
test('renders as an accessible link when href is provided', async ({mount}) => {
    const component = await mount('ai-card/Content', {
        text: 'Hello ',
        words: ['world'],
        href: 'https://example.com',
    });
    await expect(component.getByRole('link', {name: 'Hello world', exact: true})).toHaveCount(1);
});
test('calls onPress when clicked', async ({mount}) => {
    const component = await mount('ai-card/Content', {text: 'Hello', interactive: true});
    await component.getByRole('button').click();
    await expect(component.getByTestId('calls')).toHaveValue('1');
});
for (const {title, text, words, expected} of [
    {
        title: 'shows the last word immediately when user prefers reduced motion',
        text: 'Check the ',
        words: ['weather', 'news'],
        expected: 'Check the news',
    },
    {title: 'animates at most 4 words', text: 'Find ', words: ['a', 'b', 'c', 'd', 'e'], expected: 'Find d'},
    {
        title: 'ignores empty and whitespace-only entries in words',
        text: '',
        words: ['', '  ', 'valid'],
        expected: 'valid',
    },
]) {
    test(title, async ({mount, page}) => {
        await page.emulateMedia({reducedMotion: 'reduce'});
        const component = await mount('ai-card/Content', {text, words, interactive: true});
        await expect(component.getByRole('button', {name: expected, exact: true})).toHaveCount(1);
    });
}
test('animates words: typed word appears in the card', async ({mount}) => {
    const component = await mount('ai-card/Content', {text: '', words: ['hi'], interactive: true});
    await expect(component.getByTestId('AiCard')).toContainText('hi');
});
test('passes dataAttributes to the container element', async ({mount}) => {
    const component = await mount('ai-card/Content', {text: 'Hello', dataAttributes: {testid: 'my-ai-card'}});
    await expect(component.getByTestId('my-ai-card')).toHaveCount(1);
});
test('aria-label prop overrides the auto-generated label', async ({mount}) => {
    const component = await mount('ai-card/Content', {
        text: 'Hello',
        words: ['world'],
        'aria-label': 'Custom label',
        interactive: true,
    });
    await expect(component.getByRole('button', {name: 'Custom label', exact: true})).toHaveCount(1);
});
