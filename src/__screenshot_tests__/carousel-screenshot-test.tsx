import {openStoryPage, screen, ssimScreenshotConfig} from '../test-utils';

import type {ElementHandle} from 'puppeteer';

const isDisabled = async (element: ElementHandle) => {
    const disabledProp = await element.getProperty('disabled');
    return await disabledProp?.jsonValue();
};

test('Carousel mobile', async () => {
    const page = await openStoryPage({id: 'components-carousels-carousel--default', device: 'MOBILE_IOS'});

    expect(await page.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);

    await (await screen.findByLabelText('Carousel item 2')).evaluate((el) => el.scrollIntoView());

    expect(await page.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});

test('Carousel mobile with initialActiveItem=1', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {initialActiveItem: 1},
    });

    expect(await page.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});

test('Carousel mobile with a single page', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {numItems: 1, itemsPerPageMobile: 1},
    });

    expect(await page.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);

    const page2 = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {numItems: 2, itemsPerPageMobile: 2},
    });

    expect(await page2.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);

    const page3 = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {numItems: 1, itemsPerPageMobile: 2},
    });

    expect(await page3.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});

test('Carousel desktop', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'DESKTOP',
        args: {numItems: 9},
    });

    const prevArrow = await screen.findByRole('button', {name: /anterior/i});
    const nextArrow = await screen.findByRole('button', {name: /siguiente/i});

    // https://jira.tid.es/browse/WEB-680
    expect(await page.screenshot()).toMatchImageSnapshot({failureThreshold: 0.001});
    expect(await isDisabled(prevArrow)).toBe(true);
    expect(await isDisabled(nextArrow)).toBe(false);

    await page.click(nextArrow);

    expect(await page.screenshot()).toMatchImageSnapshot({failureThreshold: 0.001});
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(false);

    await page.click(nextArrow);

    expect(await page.screenshot()).toMatchImageSnapshot({failureThreshold: 0.001});
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(true);
});

test('Carousel desktop  with initialActiveItem=3', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'DESKTOP',
        args: {initialActiveItem: 3},
    });

    expect(await page.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});

// no screenshot test for desktop because it's like the regular carousel
test('CenteredCarousel mobile', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-centered-carousel--default',
        device: 'MOBILE_IOS',
    });

    expect(await page.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);

    await (await screen.findByLabelText('Carousel item 1')).evaluate((el) => el.scrollIntoView());

    expect(await page.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});

test('CenteredCarousel mobile with initialActiveItem=1', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-centered-carousel--default',
        device: 'MOBILE_IOS',
        args: {initialActiveItem: 1},
    });

    expect(await page.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});

test('Slideshow mobile', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-slideshow--default',
        device: 'MOBILE_IOS',
    });

    expect(await page.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});

test('Slideshow desktop', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-slideshow--default',
        device: 'DESKTOP',
        args: {numItems: 3},
    });

    const prevArrow = await screen.findByRole('button', {name: /anterior/i});
    const nextArrow = await screen.findByRole('button', {name: /siguiente/i});

    expect(await page.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
    expect(await isDisabled(prevArrow)).toBe(true);
    expect(await isDisabled(nextArrow)).toBe(false);

    await page.click(nextArrow);

    expect(await page.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(false);

    await page.click(nextArrow);

    expect(await page.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(true);
});

test('Highlighted Card Carousel mobile', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-highlighted-card-carousel--default',
        device: 'MOBILE_IOS',
    });

    expect(await page.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});
