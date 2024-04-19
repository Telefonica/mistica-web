import {redirect} from '../browser';

// mock location.assign
const assignSpy = jest.fn();
Object.defineProperty(window, 'location', {value: {...window.location, assign: assignSpy}});

// mock window.open
const openSpy = jest.fn();
window.open = openSpy;

afterEach(() => {
    jest.resetAllMocks(); // reset spy calls
});

test('redirect', () => {
    redirect('https://example.org');
    expect(assignSpy).toHaveBeenCalledWith('https://example.org');
    expect(openSpy).not.toHaveBeenCalled();
});

test('open external', () => {
    redirect('https://example.org', true, false);
    expect(assignSpy).not.toHaveBeenCalled();
    expect(openSpy).toHaveBeenCalledWith('https://example.org', '_blank');
});

test('open loadOnTop', () => {
    redirect('https://example.org', false, true);
    expect(assignSpy).not.toHaveBeenCalled();
    expect(openSpy).toHaveBeenCalledWith('https://example.org', '_top');
});
