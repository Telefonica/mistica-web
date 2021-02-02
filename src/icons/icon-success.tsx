import * as React from 'react';
import classnames from 'classnames';
import {O2_SKIN, O2_CLASSIC_SKIN} from '../skins/constants';
import {getAnimateDrawLineProps, getAnimateHopInProps, mergeProperties} from '../utils/animation';
import {createUseStyles} from '../jss';
import {useTheme} from '../hooks';
import {useIsInverseVariant} from '../theme-variant-context';

const useStyles = createUseStyles((theme) => ({
    iconContainer: {
        stroke: (isInverse) => (isInverse ? theme.colors.background : theme.colors.buttonPrimaryBackground),
        fill: (isInverse) => (isInverse ? theme.colors.background : theme.colors.buttonPrimaryBackground),
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path
                    fill="none"
                    stroke={color ? color : undefined}
                    strokeMiterlimit="10"
                    d="M21.7,35.6l2.8,2.8c1.1,1.1,2.9,1.1,4.1,0l17.3-17.3"
                    {...(!skipAnimation &&
                        mergeProperties(
                            getAnimateDrawLineProps('33', '0.9s', platformOverrides),
                            getAnimateHopInProps('0.9s', platformOverrides)
                        ))}
                />
                <path
                    fill="none"
                    stroke={color ? color : undefined}
                    d="M49.1,57.9C44.2,61.1,38.3,63,32,63C14.9,63,1,49.1,1,32C1,14.9,14.9,1,32,1c17.1,0,31,13.9,31,31c0,7.5-2.6,14.3-7.1,19.7"
                    {...(!skipAnimation && getAnimateDrawLineProps('186', '0.5s', platformOverrides))}
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
