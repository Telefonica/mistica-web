import {openStoryPage, screen} from '../test-utils';

test.each`
    showButtonPrimary | showButtonLink | footerText      | showFooterImage
    ${false}          | ${false}       | ${''}           | ${false}
    ${true}           | ${false}       | ${''}           | ${false}
    ${false}          | ${true}        | ${''}           | ${false}
    ${true}           | ${true}        | ${''}           | ${false}
    ${true}           | ${true}        | ${'footerText'} | ${true}
    ${true}           | ${false}       | ${'footerText'} | ${true}
    ${false}          | ${true}        | ${'footerText'} | ${true}
    ${false}          | ${false}       | ${'footerText'} | ${true}
`('Data Card Advanced', async ({showButtonPrimary, showButtonLink, footerText, showFooterImage}) => {
    await openStoryPage({
        id: 'community-datacardadvanced--default',
        device: 'MOBILE_IOS',
        args: {showButtonPrimary, showButtonLink, footerText, showFooterImage},
    });

    const element = await screen.findByTestId('data-card-advanced');
    const image = await element.screenshot();

    expect(image).toMatchImageSnapshot();
});
