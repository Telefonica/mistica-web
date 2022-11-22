import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import {Portal} from './portal';
import * as styles from './loading-bar.css';

type Props = {visible: boolean; children?: void};

const LoadingBar: React.FC<Props> = ({visible}) => {
    return (
        <CSSTransition
            in={visible}
            timeout={styles.TRANSITION_DURATION_MS}
            classNames={{
                enter: styles.enter,
                enterActive: styles.enterActive,
                exit: styles.exit,
                exitActive: styles.exitActive,
            }}
            unmountOnExit
        >
            <Portal className={styles.portal}>
                <div className={styles.progressContainer}>
                    <div className={styles.progress}>
                        <div className={styles.innerProgress} />
                    </div>
                </div>
            </Portal>
        </CSSTransition>
    );
};

export default LoadingBar;
