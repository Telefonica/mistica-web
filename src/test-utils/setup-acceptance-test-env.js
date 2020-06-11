// @flow
import {configureToMatchImageSnapshot} from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: '0.0005',
    failureThresholdType: 'percent',
});

expect.extend({toMatchImageSnapshot});
