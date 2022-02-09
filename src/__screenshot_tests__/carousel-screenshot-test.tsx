import {openStoryPage, screen} from '../test-utils';

import type {ElementHandle} from 'puppeteer';

const isDisabled = async (element: ElementHandle) => {
    const disabledProp = await element.getProperty('disabled');
    return await disabledProp?.jsonValue();
};

test('Carousel mobile', async () => {
    const page = await openStoryPage({id: 'components-carousel-carousel--default', device: 'MOBILE_IOS'});

    expect(await page.screenshot()).toMatchImageSnapshot();

    await (await screen.findByLabelText('Carousel item 2')).evaluate((el) => el.scrollIntoView());

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Carousel desktop', async () => {
    const page = await openStoryPage({
        id: 'components-carousel-carousel--default',
        device: 'DESKTOP',
        args: {numItems: 9},
    });

    const prevArrow = await screen.findByRole('button', {name: /anterior/i});
    const nextArrow = await screen.findByRole('button', {name: /siguiente/i});

    expect(await page.screenshot()).toMatchImageSnapshot();
    expect(await isDisabled(prevArrow)).toBe(true);
    expect(await isDisabled(nextArrow)).toBe(false);

    await page.click(nextArrow);

    expect(await page.screenshot()).toMatchImageSnapshot();
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(false);

    await page.click(nextArrow);

    expect(await page.screenshot()).toMatchImageSnapshot();
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(true);
});

// no screenshot test for desktop because it's like the regular carousel
test('CenteredCarousel mobile', async () => {
    const page = await openStoryPage({
        id: 'components-carousel-centeredcarousel--default',
        device: 'MOBILE_IOS',
    });

    expect(await page.screenshot()).toMatchImageSnapshot();

    await (await screen.findByLabelText('Carousel item 1')).evaluate((el) => el.scrollIntoView());

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Slideshow mobile', async () => {
    const page = await openStoryPage({
        id: 'components-carousel-slideshow--default',
        device: 'MOBILE_IOS',
    });

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Slideshow desktop', async () => {
    const page = await openStoryPage({
        id: 'components-carousel-slideshow--default',
        device: 'DESKTOP',
        args: {numItems: 3},
    });

    const prevArrow = await screen.findByRole('button', {name: /anterior/i});
    const nextArrow = await screen.findByRole('button', {name: /siguiente/i});

    expect(await page.screenshot()).toMatchImageSnapshot();
    expect(await isDisabled(prevArrow)).toBe(true);
    expect(await isDisabled(nextArrow)).toBe(false);

    await page.click(nextArrow);

    expect(await page.screenshot()).toMatchImageSnapshot();
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(false);

    await page.click(nextArrow);

    expect(await page.screenshot()).toMatchImageSnapshot();
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(true);
});
