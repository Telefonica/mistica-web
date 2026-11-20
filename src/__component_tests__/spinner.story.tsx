import * as React from 'react';
import Spinner from '../spinner';

export const Loading = ({hidden = false}: {hidden?: boolean}): JSX.Element => (
    <Spinner aria-hidden={hidden} />
);
