'use client';
import * as React from 'react';
import {useThemeVariant} from './theme-variant-context';
import * as styles from './divider.css';

const Divider = (): JSX.Element => {
    const variant = useThemeVariant();
    return <div className={styles.variants[variant]} />;
};

export default Divider;
