import {fallbackStyles} from '../css';

test.each`
    description               | param1        | param2        | param3        | output
    ${'all vars'}             | ${'var(--a)'} | ${'var(--b)'} | ${'var(--c)'} | ${'var(--a, var(--b, var(--c)))'}
    ${'first value not var'}  | ${'pink'}     | ${'var(--b)'} | ${'var(--c)'} | ${'pink'}
    ${'second value not var'} | ${'var(--a)'} | ${'pink'}     | ${'var(--c)'} | ${'var(--a, pink)'}
    ${'third value not var'}  | ${'var(--a)'} | ${'var(--b)'} | ${'pink'}     | ${'var(--a, var(--b, pink))'}
    ${'removes empty'}        | ${'var(--a)'} | ${undefined}  | ${'var(--c)'} | ${'var(--a, var(--c))'}
    ${'all empty'}            | ${''}         | ${undefined}  | ${null}       | ${''}
    ${'single value'}         | ${'pink'}     | ${undefined}  | ${null}       | ${'pink'}
    ${'single var'}           | ${'var(--a)'} | ${undefined}  | ${null}       | ${'var(--a)'}
`('fallbackStyles - $description', ({param1, param2, param3, output}) => {
    expect(fallbackStyles(param1, param2, param3)).toBe(output);
});
