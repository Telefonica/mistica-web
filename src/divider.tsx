'use client';
import * as React from 'react';
import {useIsInverseOrOverMediaVariant} from './theme-variant-context';
import * as styles from './divider.css';

const Divider: React.FC<{children?: void}> = () => {
    const isInverse = useIsInverseOrOverMediaVariant();
    return <div className={styles.variants[isInverse ? 'inverse' : 'default']} />;
};

export default Divider;
