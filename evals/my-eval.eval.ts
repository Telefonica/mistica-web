import {evalite} from 'evalite';
import {exactMatch} from 'evalite/scorers/deterministic';

evalite('My Eval', {
    // An array of test data
    // - TODO: Replace with your test data
    data: [{input: 'Hello', expected: 'Hello World!'}],
    // The task to perform
    // - TODO: Replace with your LLM call
    task: async (input) => {
        return input + ' World!';
    },
    // The scoring methods for the eval
    scorers: [
        {
            scorer: ({output, expected}) => exactMatch({actual: output, expected}),
        },
    ],
});
