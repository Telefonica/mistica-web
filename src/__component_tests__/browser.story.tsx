import * as React from 'react';
import {redirect} from '../utils/browser';

export const Redirect = ({
    external = false,
    loadOnTop = false,
}: {
    external?: boolean;
    loadOnTop?: boolean;
}): JSX.Element => <button onClick={() => redirect('https://example.org', external, loadOnTop)}>Go</button>;
