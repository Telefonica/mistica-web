import * as React from 'react';
import {Timer} from '../../..';

const TimerTest = (): JSX.Element => <Timer minTimeUnit="seconds" maxTimeUnit="hours" endTimestamp={0} />;

export default TimerTest;
