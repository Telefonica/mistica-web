'use client';
import * as React from 'react';
import {useIsInverseOrMediaVariant} from './theme-variant-context';
import * as styles from './divider.css';

const Divider = (): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    return <div className={styles.variants[isInverse ? 'inverse' : 'default']} />;
};

export default Divider;
