import {openSSRPage} from '../test-utils';

test('ssr MediaCard and DataCard', async () => {
    await openSSRPage({name: 'card'});
});
