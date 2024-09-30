import * as React from 'react';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './align.css';

import type {DataAttributes} from './utils/types';

type Props = {
    x?: 'start' | 'center' | 'end';
    y?: 'start' | 'center' | 'end';
    width?: number | string;
    height?: number | string;
    children?: React.ReactNode;
    dataAttributes?: DataAttributes;
};

const Align = ({
    x = 'start',
    y = 'start',
    width = '100%',
    height = '100%',
    children,
    dataAttributes,
}: Props): JSX.Element => {
    return (
        <div
            {...getPrefixedDataAttributes(dataAttributes, 'Align')}
            className={styles.container}
            style={{placeItems: `${y} ${x}`, width, height}}
        >
            {children}
        </div>
    );
};

export default Align;
