import {openStoryPage, screen} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'DESKTOP'] as const;

test.each(DEVICES)('Select - appears properly on %s', async (device) => {
    await openStoryPage({
        id: 'components-select--controlled',
        device,
    });

    const fieldWrapper = await screen.findByTestId('select-field-wrapper');
    const image = await fieldWrapper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Select - appears properly with selected option on DESKTOP', async () => {
    await openStoryPage({
        id: 'components-select--controlled',
        device: 'DESKTOP',
    });

    const field = await screen.findByRole('button', {name: 'Select a fruit'});
    await field.click();
    const selectOptions = await screen.findAllByRole('option', {name: 'Apple'});
    // take the last one because the options are displayed in a portal, at the end of the body
    await selectOptions?.at(-1)?.click();

    const fieldWrapper = await screen.findByTestId('select-field-wrapper');
    const image = await fieldWrapper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Select - appears properly with selected option on MOBILE_IOS', async () => {
    await openStoryPage({
        id: 'components-select--controlled',
        device: 'MOBILE_IOS',
    });

    const field = await screen.findByRole('combobox');
    await field.select('apple');

    const fieldWrapper = await screen.findByTestId('select-field-wrapper');
    const image = await fieldWrapper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Select - appears properly with long selected option on DESKTOP', async () => {
    await openStoryPage({
        id: 'components-select--controlled',
        device: 'DESKTOP',
    });

    const field = await screen.findByRole('button', {name: 'Select a fruit'});
    await field.click();
    const selectOptions = await screen.findAllByRole('option', {
        name: 'A very very long text value for this option',
    });
    // take the last one because the options are displayed in a portal, at the end of the body
    await selectOptions?.at(-1)?.click();

    const fieldWrapper = await screen.findByTestId('select-field-wrapper');
    const image = await fieldWrapper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Select - appears properly with long selected option on MOBILE_IOS', async () => {
    await openStoryPage({
        id: 'components-select--controlled',
        device: 'MOBILE_IOS',
    });

    const field = await screen.findByRole('combobox');
    await field.select('longValue');

    const fieldWrapper = await screen.findByTestId('select-field-wrapper');
    const image = await fieldWrapper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Select - optional', async () => {
    await openStoryPage({
        id: 'components-select--controlled',
        device: 'MOBILE_IOS',
        args: {optional: true},
    });

    const fieldWrapper = await screen.findByTestId('select-field-wrapper');
    const image = await fieldWrapper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Select - disabled', async () => {
    await openStoryPage({
        id: 'components-select--controlled',
        device: 'MOBILE_IOS',
        args: {disabled: true},
    });

    const fieldWrapper = await screen.findByTestId('select-field-wrapper');
    const image = await fieldWrapper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Select - helper text', async () => {
    await openStoryPage({
        id: 'components-select--controlled',
        device: 'MOBILE_IOS',
        args: {helperText: 'Helper text'},
    });

    const fieldWrapper = await screen.findByTestId('select-field-wrapper');
    const image = await fieldWrapper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Select - error', async () => {
    await openStoryPage({
        id: 'components-select--controlled',
        device: 'MOBILE_IOS',
        args: {helperText: 'Helper text', error: true},
    });

    const field = await screen.findByRole('combobox');
    await field.select('apple');

    const fieldWrapper = await screen.findByTestId('select-field-wrapper');
    const image = await fieldWrapper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Select - display all options', async () => {
    const page = await openStoryPage({
        id: 'components-select--controlled',
        device: 'DESKTOP',
    });

    const field = await screen.findByRole('button', {name: 'Select a fruit'});
    await field.click();

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Select - display all options in dark mode', async () => {
    const page = await openStoryPage({
        id: 'components-select--controlled',
        isDarkMode: true,
        device: 'DESKTOP',
    });

    const field = await screen.findByRole('button', {name: 'Select a fruit'});
    await field.click();

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Select - display all options over inverse', async () => {
    const page = await openStoryPage({
        id: 'components-select--controlled',
        device: 'DESKTOP',
        args: {inverse: true},
    });

    const field = await screen.findByRole('button', {name: 'Select a fruit'});
    await field.click();

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Select - display all options with native select', async () => {
    const page = await openStoryPage({
        id: 'components-select--controlled',
        device: 'DESKTOP',
        args: {native: true},
    });

    const field = await screen.findByLabelText('Select a fruit');
    await field.click();

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Select - display all options with native select in dark mode', async () => {
    const page = await openStoryPage({
        id: 'components-select--controlled',
        device: 'DESKTOP',
        isDarkMode: true,
        args: {native: true},
    });

    const field = await screen.findByLabelText('Select a fruit');
    await field.click();

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Select - display all options with native select over inverse', async () => {
    const page = await openStoryPage({
        id: 'components-select--controlled',
        device: 'DESKTOP',
        args: {native: true, inverse: true},
    });

    const field = await screen.findByLabelText('Select a fruit');
    await field.click();

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});
