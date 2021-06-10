import {ElementHandle} from 'puppeteer';
import {openStoryPage, screen} from '../test-utils';

test('Circle', async () => {
    await openStoryPage({
        section: 'Components/Others/Circle',
        name: 'Circle',
    });

    const circle = (await (await screen.findByTestId('circle')).$('div')) as ElementHandle;
    const circleWithIcon = (await (await screen.findByTestId('circle-with-icon')).$('div')) as ElementHandle;
    const circleWithImage = (await (
        await screen.findByTestId('circle-with-image')
    ).$('div')) as ElementHandle;

    expect(await circle.screenshot()).toMatchImageSnapshot();
    expect(await circleWithIcon.screenshot()).toMatchImageSnapshot();
    expect(await circleWithImage.screenshot()).toMatchImageSnapshot();
});
