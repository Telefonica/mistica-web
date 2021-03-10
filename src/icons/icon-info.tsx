import * as React from 'react';
import {createUseStyles} from '../jss';
import {useTheme} from '../hooks';
import {O2_SKIN, O2_CLASSIC_SKIN} from '../skins/constants';

const useStyles = createUseStyles((theme) => ({
    iconContainer: {
        fill: theme.colors.brand,
    },
}));

const IconInfoO2: React.FC = () => {
    const classes = useStyles();

    return (
        <svg width="64" height="64" viewBox="0 0 64 64">
            <g className={classes.iconContainer}>
                <path
                    fillRule="nonzero"
                    d="M32.009 0c17.672.005 31.995 14.336 31.99 32.007a31.87 31.87 0 0 1-7.28 20.311 1 1 0 0 1-1.545-1.27A29.87 29.87 0 0 0 62 32.007C62.003 15.44 48.576 2.005 32.009 2 15.438 1.994 2.004 15.422 2 31.991c-.005 16.567 13.423 30.002 29.99 30.006a29.848 29.848 0 0 0 16.524-4.951 1 1 0 1 1 1.103 1.668 31.848 31.848 0 0 1-17.628 5.283C14.32 63.993-.005 49.662 0 31.991.007 14.317 14.337-.006 32.01 0zm.99 26.025a1 1 0 0 1 1 1v23a1 1 0 0 1-2 0v-22h-6.602a1 1 0 0 1 0-2zm-.311-12.82a2.507 2.507 0 0 1 2.504 2.504 2.507 2.507 0 0 1-2.504 2.505 2.508 2.508 0 0 1-2.505-2.505 2.508 2.508 0 0 1 2.505-2.504z"
                />
            </g>
        </svg>
    );
};

const IconInfoDefault: React.FC = () => {
    const classes = useStyles();

    return (
        <svg width="64" height="64" viewBox="0 0 64 64">
            <g className={classes.iconContainer}>
                <path
                    fillRule="nonzero"
                    d="M31.991 0c21.24 0 32.01 10.77 32.01 32.01C64 53.235 53.23 64 31.99 64 10.763 64 .001 53.236.001 32.01 0 10.77 10.762 0 31.99 0zm0 2c-20.18 0-29.99 9.816-29.99 30.01C2 52.19 11.81 62 31.99 62c20.192 0 30.01-9.81 30.01-29.99C62 11.815 52.182 2 31.99 2zM32 27a1 1 0 0 1 1 1v16a1 1 0 0 1-2 0V28a1 1 0 0 1 1-1zm0-7.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
                />
            </g>
        </svg>
    );
};

const IconInfo: React.FC = () => {
    const {skinName} = useTheme();
    return skinName === O2_CLASSIC_SKIN || skinName === O2_SKIN ? <IconInfoO2 /> : <IconInfoDefault />;
};

export default IconInfo;
