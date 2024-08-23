import {openStoryPage, screen} from '../test-utils';

test.each([0, 1, 2, 3, 4, 5, 4.5, 4.51])('InfoRating - value = %s', async (value) => {
    await openStoryPage({
        id: 'components-rating--info-rating-story',
        device: 'MOBILE_IOS',
        args: {value},
    });

    const rating = await screen.findByTestId('info-rating');

    expect(await rating.screenshot()).toMatchImageSnapshot();
});

test.each([4.5, 0.74, 0.75, 1.24, 4.25])('InfoRating - with half value and value = %s', async (value) => {
    await openStoryPage({
        id: 'components-rating--info-rating-story',
        device: 'MOBILE_IOS',
        args: {value, withHalfValue: true},
    });

    const rating = await screen.findByTestId('info-rating');

    expect(await rating.screenshot()).toMatchImageSnapshot();
});

test.each([16, 24, 48])('InfoRating - size = %s', async (size) => {
    await openStoryPage({
        id: 'components-rating--info-rating-story',
        device: 'MOBILE_IOS',
        args: {size},
    });

    const rating = await screen.findByTestId('info-rating');

    expect(await rating.screenshot()).toMatchImageSnapshot();
});

test('InfoRating - inverse', async () => {
    await openStoryPage({
        id: 'components-rating--info-rating-story',
        device: 'MOBILE_IOS',
        args: {inverse: true, value: 3},
    });

    const rating = await screen.findByTestId('info-rating');

    expect(await rating.screenshot()).toMatchImageSnapshot();
});

test('InfoRating - custom icons', async () => {
    await openStoryPage({
        id: 'components-rating--info-rating-story',
        device: 'MOBILE_IOS',
        args: {value: 3.5, customIcons: true, withHalfValue: true},
    });

    const rating = await screen.findByTestId('info-rating');

    expect(await rating.screenshot()).toMatchImageSnapshot();
});

test('Rating - quantitative', async () => {
    const page = await openStoryPage({
        id: 'components-rating--rating-story',
        device: 'MOBILE_IOS',
        args: {type: 'quantitative'},
    });

    const ratingWrapper = await screen.findByTestId('rating-wrapper');

    expect(await ratingWrapper.screenshot()).toMatchImageSnapshot();

    const thirdIcon = await screen.findByRole('radio', {name: '3 de 5'});
    await page.click(thirdIcon);

    expect(await ratingWrapper.screenshot()).toMatchImageSnapshot();
});

test('Rating - quantitative with custom icons', async () => {
    const page = await openStoryPage({
        id: 'components-rating--rating-story',
        device: 'MOBILE_IOS',
        args: {type: 'quantitative', customIcons: true},
    });

    const ratingWrapper = await screen.findByTestId('rating-wrapper');

    expect(await ratingWrapper.screenshot()).toMatchImageSnapshot();

    const thirdIcon = await screen.findByRole('radio', {name: '3 de 5'});
    await page.click(thirdIcon);

    expect(await ratingWrapper.screenshot()).toMatchImageSnapshot();
});

test('Rating - qualitative', async () => {
    const page = await openStoryPage({
        id: 'components-rating--rating-story',
        device: 'MOBILE_IOS',
        args: {type: 'qualitative'},
    });

    const ratingWrapper = await screen.findByTestId('rating-wrapper');

    expect(await ratingWrapper.screenshot()).toMatchImageSnapshot();

    const labels = ['muy malo', 'malo', 'regular', 'bueno', 'muy bueno'];

    for (const label of labels) {
        const currentIcon = await screen.findByRole('radio', {name: label});
        await page.click(currentIcon);
        expect(await ratingWrapper.screenshot()).toMatchImageSnapshot();
    }
});

test('Rating - qualitative with custom icons', async () => {
    const page = await openStoryPage({
        id: 'components-rating--rating-story',
        device: 'MOBILE_IOS',
        args: {type: 'qualitative', customIcons: true},
    });

    const ratingWrapper = await screen.findByTestId('rating-wrapper');

    expect(await ratingWrapper.screenshot()).toMatchImageSnapshot();

    const labels = ['no battery', 'low battery', 'mid battery', 'full battery'];

    for (const label of labels) {
        const currentIcon = await screen.findByRole('radio', {name: label});
        await page.click(currentIcon);
        expect(await ratingWrapper.screenshot()).toMatchImageSnapshot();
    }
});

test('Rating - qualitative inverse', async () => {
    const page = await openStoryPage({
        id: 'components-rating--rating-story',
        device: 'MOBILE_IOS',
        args: {type: 'qualitative', inverse: true},
    });

    const ratingWrapper = await screen.findByTestId('rating-wrapper');

    expect(await ratingWrapper.screenshot()).toMatchImageSnapshot();

    const thirdIcon = await screen.findByRole('radio', {name: 'regular'});
    await page.click(thirdIcon);

    expect(await ratingWrapper.screenshot()).toMatchImageSnapshot();
});

test.each([8, 24, 48])('Rating - size = %s', async (size) => {
    await openStoryPage({
        id: 'components-rating--rating-story',
        device: 'MOBILE_IOS',
        args: {size},
    });

    const ratingWrapper = await screen.findByTestId('rating-wrapper');

    expect(await ratingWrapper.screenshot()).toMatchImageSnapshot();
});

test('Rating - inverse', async () => {
    const page = await openStoryPage({
        id: 'components-rating--rating-story',
        device: 'MOBILE_IOS',
        args: {inverse: true},
    });

    const ratingWrapper = await screen.findByTestId('rating-wrapper');

    const thirdIcon = await screen.findByRole('radio', {name: '3 de 5'});
    await page.click(thirdIcon);

    expect(await ratingWrapper.screenshot()).toMatchImageSnapshot();
});
