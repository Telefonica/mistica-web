import {test, expect, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';
import {VIVO_SKIN} from '../skins/constants';

import type {Locator} from 'playwright';

const isDisabled = (element: Locator) => element.isDisabled();

test('Carousel mobile', async () => {
    const page = await openStoryPage({id: 'components-carousels-carousel--default', device: 'MOBILE_IOS'});

    await expectScreenshot(page);

    await (await screen.findByLabelText('Carousel item 2')).evaluate((el) => el.scrollIntoView());

    await expectScreenshot(page);
});

test('Carousel mobile without bullets', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {bullets: false},
    });

    await expectScreenshot(page);

    await (await screen.findByLabelText('Carousel item 2')).evaluate((el) => el.scrollIntoView());

    await expectScreenshot(page);
});

test('Carousel mobile without controls, with bullets', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {bullets: true, withControls: false},
    });

    await expectScreenshot(page);

    await (await screen.findByLabelText('Carousel item 2')).evaluate((el) => el.scrollIntoView());

    await expectScreenshot(page);
});

test('Carousel mobile without controls, nor bullets', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {bullets: false, withControls: false},
    });

    await expectScreenshot(page);

    await (await screen.findByLabelText('Carousel item 2')).evaluate((el) => el.scrollIntoView());

    await expectScreenshot(page);
});

test('Carousel mobile with controls and autoplay', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {autoplay: true},
    });

    await expectScreenshot(page);

    await (await screen.findByLabelText('Carousel item 2')).evaluate((el) => el.scrollIntoView());

    await expectScreenshot(page);
});

test('Carousel mobile in Vivo', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        skin: VIVO_SKIN,
    });

    await expectScreenshot(page);

    await (await screen.findByLabelText('Carousel item 2')).evaluate((el) => el.scrollIntoView());

    await expectScreenshot(page);
});

test('Carousel mobile with large mobilePageOffset', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {mobilePageOffset: 'large'},
    });

    await expectScreenshot(page);

    await (await screen.findByLabelText('Carousel item 2')).evaluate((el) => el.scrollIntoView());

    await expectScreenshot(page);
});

test('Carousel mobile with initialActiveItem=1', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {initialActiveItem: 1},
    });

    await expectScreenshot(page);
});

test('Carousel mobile with a single page', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {numItems: 1, itemsPerPageMobile: 1},
    });

    await expectScreenshot(page);

    const page2 = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {numItems: 2, itemsPerPageMobile: 2},
    });

    await expectScreenshot(page2);

    const page3 = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'MOBILE_IOS',
        args: {numItems: 1, itemsPerPageMobile: 2},
    });

    await expectScreenshot(page3);
});

test('Carousel desktop', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'DESKTOP',
        args: {numItems: 9},
    });

    const prevArrow = await screen.findByRole('button', {name: /primer|anterior/i});
    const nextArrow = await screen.findByRole('button', {name: /siguiente|últim/i});

    // https://jira.tid.es/browse/WEB-680
    await expectScreenshot(page, {...{maxDiffPixelRatio: 0.00004}});
    expect(await isDisabled(prevArrow)).toBe(true);
    expect(await isDisabled(nextArrow)).toBe(false);

    await nextArrow.click();

    await expectScreenshot(page, {...{maxDiffPixelRatio: 0.00004}});
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(false);

    await nextArrow.click();

    await expectScreenshot(page, {...{maxDiffPixelRatio: 0.00004}});
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(true);
});

test('Carousel desktop  with initialActiveItem=3', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'DESKTOP',
        args: {initialActiveItem: 3},
    });

    await expectScreenshot(page);
});

test('Carousel desktop without controls, with bullets', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'DESKTOP',
        args: {numItems: 9, bullets: true, withControls: false},
    });

    await expectScreenshot(page, {...{maxDiffPixelRatio: 0.00004}});
});

test('Carousel desktop without controls, nor bullets', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'DESKTOP',
        args: {numItems: 9, bullets: false, withControls: false},
    });

    await expectScreenshot(page, {...{maxDiffPixelRatio: 0.00004}});
});

test('Carousel desktop with controls and autoplay', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--default',
        device: 'DESKTOP',
        args: {numItems: 9, autoplay: true},
    });

    const prevArrow = await screen.findByRole('button', {name: /primer|anterior/i});
    const nextArrow = await screen.findByRole('button', {name: /siguiente|últim/i});

    await expectScreenshot(page, {...{maxDiffPixelRatio: 0.00004}});
    expect(await isDisabled(prevArrow)).toBe(true);
    expect(await isDisabled(nextArrow)).toBe(false);

    await nextArrow.click();

    await expectScreenshot(page, {...{maxDiffPixelRatio: 0.00004}});
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(false);

    await nextArrow.click();

    await expectScreenshot(page, {...{maxDiffPixelRatio: 0.00004}});
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(true);
});

// no screenshot test for desktop because it's like the regular carousel
test('CenteredCarousel mobile', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-centeredcarousel--default',
        device: 'MOBILE_IOS',
    });

    await expectScreenshot(page);

    await (await screen.findByLabelText('Carousel item 1')).evaluate((el) => el.scrollIntoView());

    await expectScreenshot(page);
});

test('CenteredCarousel mobile, with bullets, no controls', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-centeredcarousel--default',
        device: 'MOBILE_IOS',
        args: {bullets: true, withControls: false},
    });

    await expectScreenshot(page);

    await (await screen.findByLabelText('Carousel item 1')).evaluate((el) => el.scrollIntoView());

    await expectScreenshot(page);
});

test('CenteredCarousel mobile, with controls and autoplay', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-centeredcarousel--default',
        device: 'MOBILE_IOS',
        args: {autoplay: true},
    });

    await expectScreenshot(page);

    await (await screen.findByLabelText('Carousel item 1')).evaluate((el) => el.scrollIntoView());

    await expectScreenshot(page);
});

test('CenteredCarousel with only one item', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-centeredcarousel--default',
        device: 'MOBILE_IOS',
        args: {numItems: 1},
    });

    await expectScreenshot(page);
});

test('CenteredCarousel mobile with initialActiveItem=1', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-centeredcarousel--default',
        device: 'MOBILE_IOS',
        args: {initialActiveItem: 1},
    });

    await expectScreenshot(page);
});

test('Slideshow mobile', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-slideshow--default',
        device: 'MOBILE_IOS',
    });

    await expectScreenshot(page);
});

test('Slideshow mobile, without controls', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-slideshow--default',
        device: 'MOBILE_IOS',
        args: {withControls: false},
    });

    await expectScreenshot(page);
});

test('Slideshow mobile, with controls and autoplay', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-slideshow--default',
        device: 'MOBILE_IOS',
        args: {numItems: 3, autoplay: true},
    });

    const prevArrow = await screen.findByRole('button', {name: /primer|anterior/i});
    const nextArrow = await screen.findByRole('button', {name: /siguiente|últim/i});

    await expectScreenshot(page);
    expect(await isDisabled(prevArrow)).toBe(true);
    expect(await isDisabled(nextArrow)).toBe(false);

    await nextArrow.click();

    await expectScreenshot(page);
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(false);

    await nextArrow.click();

    await expectScreenshot(page);
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(true);
});

test('Slideshow desktop', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-slideshow--default',
        device: 'DESKTOP',
        args: {numItems: 3},
    });

    const prevArrow = await screen.findByRole('button', {name: /primer|anterior/i});
    const nextArrow = await screen.findByRole('button', {name: /siguiente|últim/i});

    await expectScreenshot(page);
    expect(await isDisabled(prevArrow)).toBe(true);
    expect(await isDisabled(nextArrow)).toBe(false);

    await nextArrow.click();

    await expectScreenshot(page);
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(false);

    await nextArrow.click();

    await expectScreenshot(page);
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(true);
});

test('Slideshow desktop, without controls: borrar', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-slideshow--default',
        device: 'DESKTOP',
        args: {numItems: 3, withControls: false},
    });

    await expectScreenshot(page);
});

test('Slideshow desktop, with controls and autoplay', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-slideshow--default',
        device: 'DESKTOP',
        args: {numItems: 3, autoplay: true},
    });

    const prevArrow = await screen.findByRole('button', {name: /primer|anterior/i});
    const nextArrow = await screen.findByRole('button', {name: /siguiente|últim/i});

    await expectScreenshot(page);
    expect(await isDisabled(prevArrow)).toBe(true);
    expect(await isDisabled(nextArrow)).toBe(false);

    await nextArrow.click();

    await expectScreenshot(page);
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(false);

    await nextArrow.click();

    await expectScreenshot(page);
    expect(await isDisabled(prevArrow)).toBe(false);
    expect(await isDisabled(nextArrow)).toBe(true);
});

test('Carousel on different container types', async () => {
    const page = await openStoryPage({
        id: 'private-carousel-on-different-container-types--default',
        device: 'DESKTOP',
    });

    await expectScreenshot(page, {...{fullPage: true}});
});

test('Carousel with external controls', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-carousel--with-carousel-context',
        device: 'MOBILE_IOS',
    });

    const prevLink = await screen.findByRole('button', {name: /Prev/i});
    const nextLink = await screen.findByRole('button', {name: /Next/i});

    // https://jira.tid.es/browse/WEB-680
    await expectScreenshot(page, {...{maxDiffPixelRatio: 0.00004}});

    await nextLink.click();

    await expectScreenshot(page, {...{maxDiffPixelRatio: 0.00004}});

    await prevLink.click();

    await expectScreenshot(page, {...{maxDiffPixelRatio: 0.00004}});
});

test('Slideshow with external controls', async () => {
    const page = await openStoryPage({
        id: 'components-carousels-slideshow--with-carousel-context',
        device: 'MOBILE_IOS',
    });

    const prevLink = await screen.findByRole('button', {name: /Prev/i});
    const nextLink = await screen.findByRole('button', {name: /Next/i});

    await expectScreenshot(page);

    await nextLink.click();

    await expectScreenshot(page);

    await prevLink.click();

    await expectScreenshot(page);
});
