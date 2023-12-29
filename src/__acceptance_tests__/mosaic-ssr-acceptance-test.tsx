import {openSSRPage} from '../test-utils';

// TODO WEB-1672: fix hydration visual mismatches and enable the check. These mismatches are caused by carousel when the itemsPerPage === items.length
test('ssr VerticalMosaic and HorizontalMosaic', async () => {
    await openSSRPage({name: 'mosaic', checkHidrationVisualMismatch: false});
});
