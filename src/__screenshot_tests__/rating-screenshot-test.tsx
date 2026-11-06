import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

for (const testCase of [0, 1, 2, 3, 4, 5, 4.5, 4.51]) {
    const value = testCase;
    test(`InfoRating - value = ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-rating--info-rating-story',
            device: 'MOBILE_IOS',
            args: {value},
        });

        const rating = await screen.findByTestId('info-rating');

        await expectScreenshot(rating);
    });
}

for (const testCase of [4.5, 0.74, 0.75, 1.24, 4.25]) {
    const value = testCase;
    test(`InfoRating - with half value and value = ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-rating--info-rating-story',
            device: 'MOBILE_IOS',
            args: {value, withHalfValue: true},
        });

        const rating = await screen.findByTestId('info-rating');

        await expectScreenshot(rating);
    });
}

for (const testCase of [16, 24, 48]) {
    const size = testCase;
    test(`InfoRating - size = ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-rating--info-rating-story',
            device: 'MOBILE_IOS',
            args: {size},
        });

        const rating = await screen.findByTestId('info-rating');

        await expectScreenshot(rating);
    });
}

test('InfoRating - inverse', async () => {
    await openStoryPage({
        id: 'components-rating--info-rating-story',
        device: 'MOBILE_IOS',
        args: {variantOutside: 'brand', value: 3},
    });

    const rating = await screen.findByTestId('info-rating');

    await expectScreenshot(rating);
});

test('InfoRating - custom icons', async () => {
    await openStoryPage({
        id: 'components-rating--info-rating-story',
        device: 'MOBILE_IOS',
        args: {value: 3.5, customIcons: true, withHalfValue: true},
    });

    const rating = await screen.findByTestId('info-rating');

    await expectScreenshot(rating);
});

test('Rating - quantitative', async () => {
    await openStoryPage({
        id: 'components-rating--rating-story',
        device: 'MOBILE_IOS',
        args: {type: 'quantitative'},
    });

    const ratingWrapper = await screen.findByTestId('rating-wrapper');

    await expectScreenshot(ratingWrapper);

    const thirdIcon = await screen.findByRole('radio', {name: '3 de 5'});
    await thirdIcon.click();

    await expectScreenshot(ratingWrapper);
});

test('Rating - quantitative with custom icons', async () => {
    await openStoryPage({
        id: 'components-rating--rating-story',
        device: 'MOBILE_IOS',
        args: {type: 'quantitative', customIcons: true},
    });

    const ratingWrapper = await screen.findByTestId('rating-wrapper');

    await expectScreenshot(ratingWrapper);

    const thirdIcon = await screen.findByRole('radio', {name: '3 de 5'});
    await thirdIcon.click();

    await expectScreenshot(ratingWrapper);
});

test('Rating - qualitative', async () => {
    await openStoryPage({
        id: 'components-rating--rating-story',
        device: 'MOBILE_IOS',
        args: {type: 'qualitative'},
    });

    const ratingWrapper = await screen.findByTestId('rating-wrapper');

    await expectScreenshot(ratingWrapper);

    const labels = ['muy malo', 'malo', 'regular', 'bueno', 'muy bueno'];

    for (const label of labels) {
        const currentIcon = await screen.findByRole('radio', {name: label});
        await currentIcon.click();
        await expectScreenshot(ratingWrapper);
    }
});

test('Rating - qualitative with custom icons', async () => {
    await openStoryPage({
        id: 'components-rating--rating-story',
        device: 'MOBILE_IOS',
        args: {type: 'qualitative', customIcons: true},
    });

    const ratingWrapper = await screen.findByTestId('rating-wrapper');

    await expectScreenshot(ratingWrapper);

    const labels = ['no battery', 'low battery', 'mid battery', 'full battery'];

    for (const label of labels) {
        const currentIcon = await screen.findByRole('radio', {name: label});
        await currentIcon.click();
        await expectScreenshot(ratingWrapper);
    }
});

test('Rating - qualitative inverse', async () => {
    await openStoryPage({
        id: 'components-rating--rating-story',
        device: 'MOBILE_IOS',
        args: {type: 'qualitative', variantOutside: 'brand'},
    });

    const ratingWrapper = await screen.findByTestId('rating-wrapper');

    await expectScreenshot(ratingWrapper);

    const thirdIcon = await screen.findByRole('radio', {name: 'regular'});
    await thirdIcon.click();

    await expectScreenshot(ratingWrapper);
});

for (const testCase of [8, 24, 48]) {
    const size = testCase;
    test(`Rating - size = ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-rating--rating-story',
            device: 'MOBILE_IOS',
            args: {size},
        });

        const ratingWrapper = await screen.findByTestId('rating-wrapper');

        await expectScreenshot(ratingWrapper);
    });
}

test('Rating - inverse', async () => {
    await openStoryPage({
        id: 'components-rating--rating-story',
        device: 'MOBILE_IOS',
        args: {variantOutside: 'brand'},
    });

    const ratingWrapper = await screen.findByTestId('rating-wrapper');

    const thirdIcon = await screen.findByRole('radio', {name: '3 de 5'});
    await thirdIcon.click();

    await expectScreenshot(ratingWrapper);
});
