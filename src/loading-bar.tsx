'use client';
import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import {Portal} from './portal';
import * as styles from './loading-bar.css';
import {getPrefixedDataAttributes} from './utils/dom';
import {isRunningAcceptanceTest} from './utils/platform';

import type {DataAttributes} from './utils/types';

type Props = {visible: boolean; children?: void; dataAttributes?: DataAttributes};

const LoadingBar: React.FC<Props> = ({visible, dataAttributes}) => {
    return (
        <CSSTransition
            in={visible}
            timeout={isRunningAcceptanceTest() ? 0 : styles.TRANSITION_DURATION_MS}
            classNames={{
                enter: styles.enter,
                enterActive: styles.enterActive,
                exit: styles.exit,
                exitActive: styles.exitActive,
            }}
            unmountOnExit
        >
            <Portal className={styles.portal}>
                <div
                    className={styles.progressContainer}
                    {...getPrefixedDataAttributes(dataAttributes, 'LoadingBar')}
                >
                    <div className={styles.progress}>
                        <div className={styles.innerProgress} />
                    </div>
                </div>
            </Portal>
        </CSSTransition>
    );
};

export default LoadingBar;
