import * as React from 'react';
import {useTheme} from './hooks';
import {createUseStyles} from './jss';

const transition = '1s cubic-bezier(0.75, 0, 0.27, 1)';

const useStyles = createUseStyles(({colors}) => ({
    barBackground: {
        height: 4,
        backgroundColor: colors.control,
        borderRadius: 2,
    },
    bar: {
        height: '100%',
        backgroundColor: ({color}) => color ?? colors.controlActivated,
        transition: `max-width ${transition}`,
        animation: `$bar ${transition}`,
        borderRadius: 2,
        maxWidth: ({progressPercent}) => `${progressPercent}%`,
    },

    '@keyframes bar': {
        '0%': {
            maxWidth: '0',
        },
    },
}));

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
    const classes = useStyles({progressPercent, color});
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
            <div className={classes.bar} />
        </div>
    );
};

export default ProgressBar;
