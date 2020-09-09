import {openSSRPage} from '../test-utils';

test('ssr success feedback screen', async () => {
    await openSSRPage({name: 'feedback-screen-success'});
});

test('ssr error feedback screen', async () => {
    await openSSRPage({name: 'feedback-screen-error'});
});

test('ssr info feedback screen', async () => {
    await openSSRPage({name: 'feedback-screen-info'});
});
