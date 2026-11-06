import * as React from 'react';
import Meter from '../meter';

export const Progress = ({label}: {label?: string}): JSX.Element => (
    <Meter aria-label={label} values={[10, 20, 30]} />
);
