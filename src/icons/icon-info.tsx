import * as React from 'react';
import {createUseStyles} from '../jss';
import {useTheme} from '../hooks';
import {O2_SKIN, O2_CLASSIC_SKIN} from '../skins/constants';

const useStyles = createUseStyles((theme) => ({
    iconContainer: {
        stroke: (isInverse) => (isInverse ? theme.colors.inverse : theme.colors.brand),
        fill: (isInverse) => (isInverse ? theme.colors.inverse : theme.colors.brand),
    },
}));

type Props = {
    size?: number | string;
    color?: string;
};

const IconInfoO2: React.FC<Props> = ({size = 64, color}) => {
    const classes = useStyles();

    return (
        <svg width={size} height={size} viewBox="0 0 64 64">
            <g className={classes.iconContainer}>
                <path
                    fill="none"
                    strokeWidth="2"
                    stroke={color ? color : undefined}
                    d="M48.24,57.99c-4.71,2.95-10.27,4.65-16.24,4.65C15.08,62.64,1.36,48.92,1.36,32S15.08,1.36,32,1.36 S62.64,15.08,62.64,32c0,6.11-1.79,11.8-4.87,16.58"
                />
                <line
                    fill="none"
                    strokeWidth="2"
                    stroke={color ? color : undefined}
                    x1="32"
                    y1="47.96"
                    x2="32"
                    y2="23.74"
                />
                <circle strokeWidth="2" stroke={color ? color : undefined} cx="53.64" cy="53.54" r="1.06" />
                <circle stroke={color ? color : undefined} cx="32" cy="16.58" r="1.72" />
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
                    strokeWidth="0"
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
