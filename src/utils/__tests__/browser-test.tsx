import {redirect} from '../browser';

// mock location.assign
const redirectSpy = jest.fn();
Object.defineProperty(window, 'location', {value: {...window.location, assign: redirectSpy}});

// mock window.open
const openSpy = jest.fn();
window.open = openSpy;

afterEach(() => {
    jest.resetAllMocks(); // reset spy calls
});

test('redirect', () => {
    redirect('https://example.org');
    expect(redirectSpy.mock.calls).toEqual([['https://example.org']]);
});

test('open external', () => {
    redirect('https://example.org', true, false);
    expect(openSpy.mock.calls).toEqual([['https://example.org', '_blank']]);
});

test('open loadOnTop', () => {
    redirect('https://example.org', false, true);
    expect(openSpy.mock.calls).toEqual([['https://example.org', '_top']]);
});
