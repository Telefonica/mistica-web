import * as React from 'react';
import {useTheme} from './hooks';
import {vars} from './skins/skin-contract.css';
import * as classes from './progress-bar.css';

type Props = {
    progressPercent: number;
    color?: string;
    children?: void;
    'aria-label'?: string;
    'aria-labelledby'?: string;
};

const ProgressBar: React.FC<Props> = ({
    progressPercent,
    color,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
}) => {
    const {texts} = useTheme();
    const defaultLabel = texts.loading;
    const label = ariaLabelledBy ? undefined : ariaLabel || defaultLabel;
    return (
        <div
            className={classes.barBackground}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label}
            aria-labelledby={ariaLabelledBy}
        >
            <div
                className={classes.bar}
                style={{
                    maxWidth: `${progressPercent}%`,
                    backgroundColor: color ?? vars.colors.controlActivated,
                }}
            />
        </div>
    );
};

export default ProgressBar;
