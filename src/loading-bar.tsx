'use client';
import * as React from 'react';
import {Portal} from './portal';
import * as styles from './loading-bar.css';
import {getPrefixedDataAttributes} from './utils/dom';
import classnames from 'classnames';

import type {DataAttributes} from './utils/types';

type Props = {visible: boolean; children?: void; dataAttributes?: DataAttributes};

const LoadingBar: React.FC<Props> = ({visible, dataAttributes}) => {
    return (
        <Portal className={classnames(styles.portal, {[styles.hidden]: !visible})}>
            <div
                className={styles.progressContainer}
                {...getPrefixedDataAttributes(dataAttributes, 'LoadingBar')}
            >
                <div className={styles.progress}>
                    <div className={styles.innerProgress} />
                </div>
            </div>
        </Portal>
    );
};

export default LoadingBar;
