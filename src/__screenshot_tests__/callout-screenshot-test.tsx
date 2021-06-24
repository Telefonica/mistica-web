import {openStoryPage, screen} from '../test-utils';

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
    const page = await openStoryPage({
        section: 'Components/Dialogs/Callout',
        name: 'Callout',
    });

    await page.click(await screen.findByLabelText('Over inverse'));

    const callout = await screen.findByRole('alert');

    const image = await callout.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Callout not closable', async () => {
    const page = await openStoryPage({
        section: 'Components/Dialogs/Callout',
        name: 'Callout',
    });

    await page.click(await screen.findByLabelText('Is closable'));

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
    await page.clear(await screen.findByLabelText('title'));
    await page.select(await screen.findByLabelText('actions'), 'none');
    await page.click(await screen.findByLabelText('With icon'));
    await page.click(await screen.findByLabelText('Is closable'));

    const callout = await screen.findByRole('alert');

    const image = await callout.screenshot();
    expect(image).toMatchImageSnapshot();
});
