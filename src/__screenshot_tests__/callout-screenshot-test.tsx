import {ElementHandle} from 'puppeteer';
import {openStoryPage, screen} from '../test-utils';

const isCheckboxEnabled = (element: ElementHandle) =>
    element.evaluate((el) => el.getAttribute('aria-checked') === 'true');

const enableCheckbox = async (element: ElementHandle) => {
    if (!(await isCheckboxEnabled(element))) {
        await element.click();
    }
};

const disableCheckbox = async (element: ElementHandle) => {
    if (await isCheckboxEnabled(element)) {
        await element.click();
    }
};

test('Callout', async () => {
    await openStoryPage({
        section: 'Components/Dialogs/Callout',
        name: 'Callout',
    });

    const callout = await screen.findByRole('alert');

    const image = await callout.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Callout over inverse', async () => {
    await openStoryPage({
        section: 'Components/Dialogs/Callout',
        name: 'Callout',
    });

    await enableCheckbox(await screen.findByLabelText('Over inverse'));

    const callout = await screen.findByRole('alert');

    const image = await callout.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Callout not closable', async () => {
    await openStoryPage({
        section: 'Components/Dialogs/Callout',
        name: 'Callout',
    });

    await disableCheckbox(await screen.findByLabelText('Is closable'));

    const callout = await screen.findByRole('alert');

    const image = await callout.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Callout with ButtonLink', async () => {
    const page = await openStoryPage({
        section: 'Components/Dialogs/Callout',
        name: 'Callout',
    });

    await page.select(await screen.findByLabelText('actions'), 'link');

    const callout = await screen.findByRole('alert');

    const image = await callout.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Callout without actions', async () => {
    const page = await openStoryPage({
        section: 'Components/Dialogs/Callout',
        name: 'Callout',
    });

    await page.select(await screen.findByLabelText('actions'), 'none');

    const callout = await screen.findByRole('alert');

    const image = await callout.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Callout only description', async () => {
    const page = await openStoryPage({
        section: 'Components/Dialogs/Callout',
        name: 'Callout',
    });
    await page.clear(await screen.findByLabelText('title (opcional)'));
    await page.select(await screen.findByLabelText('actions'), 'none');
    await disableCheckbox(await screen.findByLabelText('With icon'));
    await disableCheckbox(await screen.findByLabelText('Is closable'));

    const callout = await screen.findByRole('alert');

    const image = await callout.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Callout only description and closable', async () => {
    const page = await openStoryPage({
        section: 'Components/Dialogs/Callout',
        name: 'Callout',
    });
    await page.clear(await screen.findByLabelText('title (opcional)'));
    await page.select(await screen.findByLabelText('actions'), 'none');
    await disableCheckbox(await screen.findByLabelText('With icon'));
    await enableCheckbox(await screen.findByLabelText('Is closable'));

    const callout = await screen.findByRole('alert');

    const image = await callout.screenshot();
    expect(image).toMatchImageSnapshot();
});
