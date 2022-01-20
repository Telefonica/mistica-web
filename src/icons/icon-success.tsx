import * as React from 'react';
import classnames from 'classnames';
import {O2_SKIN, O2_CLASSIC_SKIN} from '../skins/constants';
import {getAnimateDrawLineProps, getAnimateHopInProps, mergeProperties} from '../utils/animation';
import {createUseStyles} from '../jss';
import {useTheme} from '../hooks';
import {useIsInverseVariant} from '../theme-variant-context';

const useStyles = createUseStyles((theme) => ({
    iconContainer: {
        stroke: (isInverse) => (isInverse ? theme.colors.inverse : theme.colors.brand),
        fill: (isInverse) => (isInverse ? theme.colors.inverse : theme.colors.brand),
    },
}));

type Props = {
    size?: number | string;
    color?: string;
    skipAnimation?: boolean;
};

const IconSuccessO2: React.FC<Props> = ({size = 64, color, skipAnimation = false}) => {
    const isInverse = useIsInverseVariant();
    const classes = useStyles(isInverse);
    const {platformOverrides} = useTheme();

    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 64 64">
            <g
                className={classnames({[classes.iconContainer]: !color})}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path
                    fill="none"
                    strokeWidth="2"
                    stroke={color ? color : undefined}
                    d="M45.64 53.84A25.599 25.599 0 0 1 32 57.75C17.78 57.75 6.25 46.22 6.25 32S17.78 6.25 32 6.25 57.75 17.78 57.75 32c0 5.13-1.5 9.92-4.09 13.93"
                    {...(!skipAnimation &&
                        mergeProperties(
                            getAnimateDrawLineProps('155', '0.9s', platformOverrides),
                            getAnimateHopInProps('0.9s', platformOverrides)
                        ))}
                />
                <path
                    fill="none"
                    strokeWidth="2"
                    stroke={color ? color : undefined}
                    d="m19.33 30.39 9.88 10.95 18.13-19.23"
                    {...(!skipAnimation && getAnimateDrawLineProps('180', '0.5s', platformOverrides))}
                />
                <circle
                    fill="none"
                    strokeWidth="2"
                    stroke={color ? color : undefined}
                    cx="50.18"
                    cy="50.1"
                    r=".89"
                    {...(!skipAnimation && getAnimateDrawLineProps('180', '0.8s', platformOverrides))}
                />
            </g>
        </svg>
    );
};

const IconSuccessDefault: React.FC<Props> = ({size = 64, color, skipAnimation = false}) => {
    const isInverse = useIsInverseVariant();
    const classes = useStyles(isInverse);
    const {platformOverrides} = useTheme();

    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 64 64">
            <g className={classnames({[classes.iconContainer]: !color})}>
                <path
                    vectorEffect="non-scaling-stroke"
                    fill="none"
                    stroke={color ? color : undefined}
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    d="M61.4,32c0,19.5-10,29.4-29.4,29.4C12.5,61.4,2.6,51.5,2.6,32S12.5,2.6,32,2.6S61.4,12.5,61.4,32z"
                    transform="rotate(90 32 32)"
                    {...(!skipAnimation && getAnimateDrawLineProps('202', '0.2s', platformOverrides))}
                />
                <polyline
                    vectorEffect="non-scaling-stroke"
                    fill="none"
                    stroke={color ? color : undefined}
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="20,34.9 27.4,44.3 45.6,21"
                    {...(!skipAnimation &&
                        mergeProperties(
                            getAnimateDrawLineProps('44', '0.6s', platformOverrides),
                            getAnimateHopInProps('0.6s', platformOverrides)
                        ))}
                />
            </g>
        </svg>
    );
};

const IconSuccess: React.FC<Props> = ({size, color, skipAnimation}) => {
    const {skinName} = useTheme();

    switch (skinName) {
        case O2_CLASSIC_SKIN:
        case O2_SKIN:
            return <IconSuccessO2 size={size} color={color} skipAnimation={skipAnimation} />;
        default:
            return <IconSuccessDefault size={size} color={color} skipAnimation={skipAnimation} />;
    }
};

export default IconSuccess;
