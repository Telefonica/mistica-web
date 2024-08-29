import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Timer} from '../../..';

const TimerTest = (): JSX.Element => <Timer minTimeUnit="seconds" maxTimeUnit="hours" endTimestamp={0} />;

export default TimerTest;
