'use client';
import * as React from 'react';
import {Portal} from './portal';
import * as styles from './loading-bar.css';
import {getPrefixedDataAttributes} from './utils/dom';
import classnames from 'classnames';
import {isRunningAcceptanceTest} from './utils/platform';

import type {DataAttributes} from './utils/types';

type Props = {visible: boolean; children?: void; dataAttributes?: DataAttributes};

const LoadingBar: React.FC<Props> = ({visible, dataAttributes}) => {
    return (
        <Portal
            className={classnames(styles.portal, {
                [styles.hidden]: !visible,
                [styles.portalAnimation]: !isRunningAcceptanceTest(),
            })}
        >
            <div
                className={styles.progressContainer}
                {...getPrefixedDataAttributes(dataAttributes, 'LoadingBar')}
            >
                <div
                    className={classnames(styles.progress, {
                        [styles.progressAnimation]: !isRunningAcceptanceTest(),
                    })}
                />
            </div>
        </Portal>
    );
};

export default LoadingBar;
