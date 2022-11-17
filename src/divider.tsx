import * as React from 'react';
import {useIsInverseVariant} from './theme-variant-context';
import * as styles from './divider.css';

const Divider: React.FC<{children?: void}> = () => {
    const isInverse = useIsInverseVariant();
    return <div className={styles.variants[isInverse ? 'inverse' : 'default']} />;
};

export default Divider;
