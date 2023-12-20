import {openSSRPage} from '../test-utils';

test('ssr VerticalMosaic and HorizontalMosaic', async () => {
    await openSSRPage({name: 'mosaic'});
});
