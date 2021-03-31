import * as React from 'react';
import {createUseStyles} from './jss';

const transition = '1s cubic-bezier(0.75, 0, 0.27, 1)';

const useStyles = createUseStyles(({colors}) => ({
    barBackground: {
        height: 4,
        backgroundColor: colors.border,
        borderRadius: 2,
    },
    bar: {
        height: '100%',
        backgroundColor: colors.brand,
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
};

const ProgressBar: React.FC<Props> = ({progressPercent}) => {
    const classes = useStyles({progressPercent});

    return (
        <div
            className={classes.barBackground}
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div className={classes.bar} />
        </div>
    );
};

export default ProgressBar;
