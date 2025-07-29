import {openStoryPage, screen} from '../test-utils';
import {VIVO_NEW_SKIN} from '../skins/constants';

import type {ElementHandle} from 'puppeteer';

const isDisabled = async (element: ElementHandle) => {
    const disabledProp = await element.getProperty('disabled');
    return await disabledProp?.jsonValue();
};

test('Carousel mobile', async () => {
    const page = await openStoryPage({id: 'components-carousels-carousel--default', device: 'MOBILE_IOS'});

    expect(await page.screenshot()).toMatchImageSnapshot();

    await (await screen.findByLabelText('Carousel item 2')).evaluate((el) => el.scrollIntoView());

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Carousel mobile without bullets', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {bullets: false},
    });

    expect(await page.screenshot()).toMatchImageSnapshot();

    await (await screen.findByLabelText('Carousel item 2')).evaluate((el) => el.scrollIntoView());

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Carousel mobile without controls, with bullets', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {bullets: true, withControls: false},
    });

    expect(await page.screenshot()).toMatchImageSnapshot();

    await (await screen.findByLabelText('Carousel item 2')).evaluate((el) => el.scrollIntoView());

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Carousel mobile without controls, nor bullets', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {bullets: false, withControls: false},
    });

    expect(await page.screenshot()).toMatchImageSnapshot();

    await (await screen.findByLabelText('Carousel item 2')).evaluate((el) => el.scrollIntoView());

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Carousel mobile with controls and autoplay', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {autoplay: true},
    });

    expect(await page.screenshot()).toMatchImageSnapshot();

    await (await screen.findByLabelText('Carousel item 2')).evaluate((el) => el.scrollIntoView());

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Carousel mobile in Vivo new', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        skin: VIVO_NEW_SKIN,
    });

    expect(await page.screenshot()).toMatchImageSnapshot();

    await (await screen.findByLabelText('Carousel item 2')).evaluate((el) => el.scrollIntoView());

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Carousel mobile with large mobilePageOffset', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {mobilePageOffset: 'large'},
    });

    expect(await page.screenshot()).toMatchImageSnapshot();

    await (await screen.findByLabelText('Carousel item 2')).evaluate((el) => el.scrollIntoView());

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Carousel mobile with initialActiveItem=1', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {initialActiveItem: 1},
    });

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Carousel mobile with a single page', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {numItems: 1, itemsPerPageMobile: 1},
    });

    expect(await page.screenshot()).toMatchImageSnapshot();

    const page2 = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {numItems: 2, itemsPerPageMobile: 2},
    });

    expect(await page2.screenshot()).toMatchImageSnapshot();

    const page3 = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {numItems: 1, itemsPerPageMobile: 2},
    });

    expect(await page3.screenshot()).toMatchImageSnapshot();
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
    expect(await page.screenshot()).toMatchImageSnapshot({failureThreshold: 0.00004});
    expect(await isDisabled(prevArrow)).toBe(true);
    expect(await isDisabled(nextArrow)).toBe(false);

    await page.click(nextArrow);

    expect(await page.screenshot()).toMatchImageSnapshot({failureThreshold: 0.00004});
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(false);

    await page.click(nextArrow);

    expect(await page.screenshot()).toMatchImageSnapshot({failureThreshold: 0.00004});
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(true);
});

test('Carousel desktop  with initialActiveItem=3', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'DESKTOP',
        args: {initialActiveItem: 3},
    });

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Carousel desktop without controls, with bullets', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'DESKTOP',
        args: {numItems: 9, bullets: true, withControls: false},
    });

    expect(await page.screenshot()).toMatchImageSnapshot({failureThreshold: 0.00004});
});

test('Carousel desktop without controls, nor bullets', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'DESKTOP',
        args: {numItems: 9, bullets: false, withControls: false},
    });

    expect(await page.screenshot()).toMatchImageSnapshot({failureThreshold: 0.00004});
});

test('Carousel desktop with controls and autoplay', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'DESKTOP',
        args: {numItems: 9, autoplay: true},
    });

    const prevArrow = await screen.findByRole('button', {name: /anterior/i});
    const nextArrow = await screen.findByRole('button', {name: /siguiente/i});

    expect(await page.screenshot()).toMatchImageSnapshot({failureThreshold: 0.00004});
    expect(await isDisabled(prevArrow)).toBe(true);
    expect(await isDisabled(nextArrow)).toBe(false);

    await page.click(nextArrow);

    expect(await page.screenshot()).toMatchImageSnapshot({failureThreshold: 0.00004});
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(false);

    await page.click(nextArrow);

    expect(await page.screenshot()).toMatchImageSnapshot({failureThreshold: 0.00004});
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(true);
});

// no screenshot test for desktop because it's like the regular carousel
test('CenteredCarousel mobile', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-centeredcarousel--default',
        device: 'MOBILE_IOS',
    });

    expect(await page.screenshot()).toMatchImageSnapshot();

    await (await screen.findByLabelText('Carousel item 1')).evaluate((el) => el.scrollIntoView());

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('CenteredCarousel mobile, with bullets, no controls', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-centeredcarousel--default',
        device: 'MOBILE_IOS',
        args: {bullets: true, withControls: false},
    });

    expect(await page.screenshot()).toMatchImageSnapshot();

    await (await screen.findByLabelText('Carousel item 1')).evaluate((el) => el.scrollIntoView());

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('CenteredCarousel mobile, with controls and autoplay', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-centeredcarousel--default',
        device: 'MOBILE_IOS',
        args: {autoplay: true},
    });

    expect(await page.screenshot()).toMatchImageSnapshot();

    await (await screen.findByLabelText('Carousel item 1')).evaluate((el) => el.scrollIntoView());

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('CenteredCarousel with only one item', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-centeredcarousel--default',
        device: 'MOBILE_IOS',
        args: {numItems: 1},
    });

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('CenteredCarousel mobile with initialActiveItem=1', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-centeredcarousel--default',
        device: 'MOBILE_IOS',
        args: {initialActiveItem: 1},
    });

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Slideshow mobile', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-slideshow--default',
        device: 'MOBILE_IOS',
    });

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Slideshow mobile, without controls', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-slideshow--default',
        device: 'MOBILE_IOS',
        args: {withControls: false},
    });

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Slideshow mobile, with controls and autoplay', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-slideshow--default',
        device: 'MOBILE_IOS',
        args: {numItems: 3, autoplay: true},
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

test('Slideshow desktop', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-slideshow--default',
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

test('Slideshow desktop, without controls: borrar', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-slideshow--default',
        device: 'DESKTOP',
        args: {numItems: 3, withControls: false},
    });

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Slideshow desktop, with controls and autoplay', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-slideshow--default',
        device: 'DESKTOP',
        args: {numItems: 3, autoplay: true},
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

test('Carousel on different container types', async () => {
    const page = await openStoryPage({
        id: 'private-carousel-on-different-container-types--default',
        device: 'DESKTOP',
    });

    expect(await page.screenshot({fullPage: true})).toMatchImageSnapshot();
});

test('Carousel with external controls', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--with-carousel-context',
        device: 'MOBILE_IOS',
    });

    const prevLink = await screen.findByRole('button', {name: /Prev/i});
    const nextLink = await screen.findByRole('button', {name: /Next/i});

    // https://jira.tid.es/browse/WEB-680
    expect(await page.screenshot()).toMatchImageSnapshot({failureThreshold: 0.00004});

    await page.click(nextLink);

    expect(await page.screenshot()).toMatchImageSnapshot({failureThreshold: 0.00004});

    await page.click(prevLink);

    expect(await page.screenshot()).toMatchImageSnapshot({failureThreshold: 0.00004});
});

test('Slideshow with external controls', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-slideshow--with-carousel-context',
        device: 'MOBILE_IOS',
    });

    const prevLink = await screen.findByRole('button', {name: /Prev/i});
    const nextLink = await screen.findByRole('button', {name: /Next/i});

    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.click(nextLink);

    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.click(prevLink);

    expect(await page.screenshot()).toMatchImageSnapshot();
});
