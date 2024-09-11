'use client';
import * as React from 'react';
import {Portal} from './portal';
import * as styles from './loading-bar.css';
import {getPrefixedDataAttributes} from './utils/dom';
import classnames from 'classnames';

import type {DataAttributes} from './utils/types';

type Props = {visible: boolean; children?: void; dataAttributes?: DataAttributes};

const LoadingBar = ({visible, dataAttributes}: Props): JSX.Element => {
    return (
        <Portal className={classnames(styles.portal, {[styles.hidden]: !visible})}>
            <div
                className={styles.progressContainer}
                {...getPrefixedDataAttributes(dataAttributes, 'LoadingBar')}
            >
                <div className={styles.progress} />
            </div>
        </Portal>
    );
};

export default LoadingBar;
