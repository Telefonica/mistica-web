import * as React from 'react';
import {getAnimateDrawLineProps, getAnimateFadeInProps, animateShakeStyles} from '../utils/animation';
import {createUseStyles} from '../jss';
import {useTheme} from '../hooks';
import {O2_SKIN, O2_CLASSIC_SKIN} from '../colors';

const useStyles = createUseStyles((theme) => ({
    iconContainerFill: {
        stroke: theme.colors.iconHighlight,
        fill: theme.colors.iconHighlight,
    },
    iconContainer: {
        stroke: theme.colors.iconHighlight,
        fill: 'none',
    },
    ...animateShakeStyles(),
}));

const IconErrorO2: React.FC = () => {
    const classes = useStyles({delay: 0.8});

    return (
        <svg width="72" height="64" viewBox="0 0 72 64">
            <g
                className={classes.iconContainerFill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path
                    fill="none"
                    d="M49.1,57.9C44.2,61.1,38.3,63,32,63C14.9,63,1,49.1,1,32C1,14.9,14.9,1,32,1c17.1,0,31,13.9,31,31c0,7.5-2.6,14.3-7.1,19.7"
                    {...getAnimateDrawLineProps('186', '0.3s')}
                    className={classes.outerAnimation}
                />
                <g className={classes.innerAnimation}>
                    <line
                        fill="none"
                        x1="32"
                        y1="13.5"
                        x2="32"
                        y2="36.5"
                        {...getAnimateDrawLineProps('23', '0.7s')}
                    />
                    <path
                        strokeWidth="1"
                        d="M32.1,50.1c1.4,0,2.5-1.1,2.5-2.5S33.5,45,32.1,45s-2.5,1.1-2.5,2.5S30.7,50.1,32.1,50.1z"
                        {...getAnimateFadeInProps('1')}
                    />
                </g>
            </g>
        </svg>
    );
};

const IconErrorDefault: React.FC = () => {
    const classes = useStyles({delay: 0.8});

    return (
        <svg width="72" height="64" viewBox="0 0 72 64">
            <g
                className={classes.iconContainer}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
            >
                <path
                    d="M 61.6 41.7 C 62 43.1 62.5 45.2 62.6 46.6 C 62.8 48.3 62.6 49.9 62.1 51.4 C 62 51.8 61.8 52.3 61.6 52.7 C 61.5 52.8 61.5 53 61.4 53.1 C 61.3 53.3 61.2 53.5 61.1 53.6 C 60.8 54.1 60.5 54.5 60.2 54.8 C 59.2 55.9 57.8 56.9 56.3 57.6 C 54.6 58.4 52.1 59 51.4 59.2 C 51.3 59.2 51.3 59.2 51.2 59.2 C 44.1 60.9 36.8 61.3 31.9 61.3 C 24.8 61.3 18.2 60.6 12.6 59.2 C 12.6 59.2 12.5 59.2 12.5 59.2 C 11.8 59 9.3 58.4 7.6 57.6 C 6.1 56.9 4.7 56 3.7 54.8 C 3.4 54.5 3.1 54.1 2.8 53.7 C 2.7 53.5 2.6 53.4 2.5 53.2 C 2.4 53 2.4 52.9 2.3 52.8 C 2 52.3 1.8 51.8 1.7 51.4 C 1.2 50 1 48.3 1.2 46.7 C 1.4 45.2 1.9 43.2 2.3 41.7 C 4.3 34.6 7.7 28.1 10.1 23.9 C 12.5 19.7 16.5 13.6 21.6 8.4 C 21.6 8.4 21.7 8.3 21.7 8.3 C 22.8 7.2 24.4 5.8 25.6 4.9 C 26.9 3.9 28.5 3.2 30 2.9 C 30.4 2.8 30.9 2.7 31.4 2.7 C 31.8 2.7 32.2 2.7 32.4 2.7 C 33 2.7 33.5 2.8 33.9 2.9 C 35.4 3.3 37 3.9 38.3 4.9 C 39.6 5.7 41.1 7.2 42.2 8.3 C 46.3 12.5 50.2 17.7 53.8 23.9 C 56.2 28.2 59.6 34.7 61.6 41.7 Z"
                    className={classes.outerAnimation}
                    {...getAnimateDrawLineProps('189', '0.3s')}
                />
                <g className={classes.innerAnimation}>
                    <line
                        x1="31.9"
                        y1="20.9"
                        x2="31.9"
                        y2="36.9"
                        {...getAnimateDrawLineProps('17', '0.7s')}
                    />
                    <circle
                        className={classes.iconContainerFill}
                        strokeWidth="1"
                        cx="31.9"
                        cy="43.9"
                        r="1.5"
                        {...getAnimateFadeInProps('1')}
                    />
                </g>
            </g>
        </svg>
    );
};

const IconError: React.FC = () => {
    const skin = useTheme().skin;
    return skin === O2_SKIN || skin === O2_CLASSIC_SKIN ? <IconErrorO2 /> : <IconErrorDefault />;
};

export default IconError;
