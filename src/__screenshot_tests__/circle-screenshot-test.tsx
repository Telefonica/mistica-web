import {openStoryPage, screen} from '../test-utils';

import type {ElementHandle} from 'puppeteer';

test('Circle', async () => {
    await openStoryPage({
        id: 'components-primitives-circle--default',
    });

    const circle = (await (await screen.findByTestId('circle')).$('div')) as ElementHandle;
    const circleWithIcon = (await (await screen.findByTestId('circle-with-icon')).$('div')) as ElementHandle;
    const circleWithImage = (await (
        await screen.findByTestId('circle-with-image')
    ).$('div')) as ElementHandle;
    const circleWithBorderDefault = (await (
        await screen.findByTestId('circle-with-border-default')
    ).$('div')) as ElementHandle;
    const circleWithBorderCustom = (await (
        await screen.findByTestId('circle-with-border-custom')
    ).$('div')) as ElementHandle;

    expect(await circle.screenshot()).toMatchImageSnapshot();
    expect(await circleWithIcon.screenshot()).toMatchImageSnapshot();
    expect(await circleWithImage.screenshot()).toMatchImageSnapshot();
    expect(await circleWithBorderDefault.screenshot()).toMatchImageSnapshot();
    expect(await circleWithBorderCustom.screenshot()).toMatchImageSnapshot();
});
