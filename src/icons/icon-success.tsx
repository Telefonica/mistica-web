import * as React from 'react';
import classnames from 'classnames';
import {O2_SKIN, O2_CLASSIC_SKIN} from '../skins/constants';
import {
    getAnimateDrawLineProps,
    getAnimateFadeInProps,
    getAnimateHopInProps,
    mergeProperties,
} from '../utils/animation';
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
                    d="M48.24,57.99c-4.71,2.95-10.27,4.65-16.24,4.65C15.08,62.64,1.36,48.92,1.36,32S15.08,1.36,32,1.36 S62.64,15.08,62.64,32c0,6.11-1.79,11.8-4.87,16.58"
                    {...(!skipAnimation && getAnimateDrawLineProps('202', '0.3s', platformOverrides))}
                />
                <polyline
                    fill="none"
                    strokeWidth="2"
                    stroke={color ? color : undefined}
                    points="16.92,30.08 28.68,43.12 50.26,20.22"
                    {...(!skipAnimation &&
                        mergeProperties(
                            getAnimateDrawLineProps('50', '0.6s', platformOverrides),
                            getAnimateHopInProps('0.6', platformOverrides)
                        ))}
                />
                <circle
                    strokeWidth="2"
                    stroke={color ? color : undefined}
                    cx="53.64"
                    cy="53.54"
                    r="1.06"
                    {...(!skipAnimation && getAnimateFadeInProps('0.2s', platformOverrides))}
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
