import {openSSRPage} from '../test-utils';

test('ssr CoverHero', async () => {
    await openSSRPage({name: 'cover-hero'});
});
