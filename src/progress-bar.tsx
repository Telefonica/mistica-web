import * as React from 'react';
import {useTheme} from './hooks';
import {vars} from './skins/skin-contract.css';
import * as styles from './progress-bar.css';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

type Props = {
    progressPercent: number;
    color?: string;
    children?: void;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    dataAttributes?: DataAttributes;
};

const ProgressBar: React.FC<Props> = ({
    progressPercent,
    color,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    dataAttributes,
}) => {
    const {texts} = useTheme();
    const defaultLabel = texts.loading;
    const label = ariaLabelledBy ? undefined : ariaLabel || defaultLabel;
    return (
        <div
            {...getPrefixedDataAttributes(dataAttributes, 'ProgressBar')}
            className={styles.barBackground}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label}
            aria-labelledby={ariaLabelledBy}
        >
            <div
                className={styles.bar}
                style={{
                    maxWidth: `${progressPercent}%`,
                    backgroundColor: color ?? vars.colors.controlActivated,
                }}
            />
        </div>
    );
};

export default ProgressBar;
