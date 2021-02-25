import * as React from 'react';
import {getAnimateDrawLineProps, getAnimateFadeInProps, animateShakeStyles} from '../utils/animation';
import {createUseStyles} from '../jss';
import {useTheme} from '../hooks';
import {O2_SKIN, O2_CLASSIC_SKIN} from '../skins/constants';

const useStyles = createUseStyles((theme) => ({
    iconContainerFill: {
        stroke: theme.colors.error,
        fill: theme.colors.error,
    },
    iconContainer: {
        stroke: theme.colors.error,
        fill: 'none',
    },
    ...animateShakeStyles(theme.platformOverrides),
}));

const IconErrorO2: React.FC = () => {
    const classes = useStyles({delay: 0.8});
    const {platformOverrides} = useTheme();

    return (
        <svg width="72" height="64" viewBox="0 0 72 64">
            <g
                className={classes.iconContainerFill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <g className={classes.outerAnimation}>
                    <path
                        fill="none"
                        d="M49.1,57.9C44.2,61.1,38.3,63,32,63C14.9,63,1,49.1,1,32C1,14.9,14.9,1,32,1c17.1,0,31,13.9,31,31c0,7.5-2.6,14.3-7.1,19.7"
                        {...getAnimateDrawLineProps('186', '0.3s', platformOverrides)}
                    />
                </g>
                <g className={classes.innerAnimation}>
                    <line
                        fill="none"
                        x1="32"
                        y1="13.5"
                        x2="32"
                        y2="36.5"
                        {...getAnimateDrawLineProps('23', '0.7s', platformOverrides)}
                    />
                    <path
                        strokeWidth="1"
                        d="M32.1,50.1c1.4,0,2.5-1.1,2.5-2.5S33.5,45,32.1,45s-2.5,1.1-2.5,2.5S30.7,50.1,32.1,50.1z"
                        {...getAnimateFadeInProps('1', platformOverrides)}
                    />
                </g>
            </g>
        </svg>
    );
};

const IconErrorDefault: React.FC = () => {
    const classes = useStyles({delay: 0.8});
    const {platformOverrides} = useTheme();

    return (
        <svg width="72" height="64" viewBox="0 0 72 64">
            <g
                className={classes.iconContainer}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
            >
                <g className={classes.outerAnimation}>
                    <path
                        fill="none"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        d="M 31.9 0.9 C 52.5 0.9 62.9 11.4 62.9 31.9 C 62.9 52.5 52.5 62.9 31.9 62.9 C 11.3 62.9 0.9 52.5 0.9 31.9 C 0.9 11.3 11.3 0.9 31.9 0.9 Z"
                        transform="rotate(90 32 32)"
                        {...getAnimateDrawLineProps('202', '0.3s', platformOverrides)}
                    />
                </g>
                <g className={classes.innerAnimation}>
                    <line
                        x1="31.9"
                        y1="20.9"
                        x2="31.9"
                        y2="36.9"
                        {...getAnimateDrawLineProps('17', '0.7s', platformOverrides)}
                    />
                    <circle
                        className={classes.iconContainerFill}
                        strokeWidth="1"
                        cx="31.9"
                        cy="43.9"
                        r="1.5"
                        {...getAnimateFadeInProps('1', platformOverrides)}
                    />
                </g>
            </g>
        </svg>
    );
};

const IconError: React.FC = () => {
    const {skinName} = useTheme();
    return skinName === O2_SKIN || skinName === O2_CLASSIC_SKIN ? <IconErrorO2 /> : <IconErrorDefault />;
};

export default IconError;
