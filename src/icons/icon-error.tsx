'use client';
import * as React from 'react';
import {getAnimateDrawLineProps, getAnimateFadeInProps} from '../utils/animation';
import {useTheme} from '../hooks';
import {O2_SKIN, O2_NEW_SKIN} from '../skins/constants';
import {vars} from '../skins/skin-contract.css';
import * as styles from './icon-error.css';

type Props = {
    size?: number | string;
};

const IconErrorO2 = ({size = 48}: Props): JSX.Element => {
    const {platformOverrides} = useTheme();

    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 64 64" overflow="visible">
            <g
                stroke={vars.colors.error}
                fill={vars.colors.error}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <g className={styles.outerAnimation}>
                    <circle
                        strokeWidth="4"
                        fill="none"
                        cx="32"
                        cy="32"
                        r="30"
                        {...getAnimateDrawLineProps('202', '0.3s', platformOverrides)}
                    />
                </g>
                <g className={styles.innerAnimation}>
                    <line
                        strokeWidth="4"
                        fill="none"
                        x1="32"
                        y1="16.5"
                        x2="32"
                        y2="39.08"
                        {...getAnimateDrawLineProps('110', '0.6s', platformOverrides)}
                    />
                    <circle
                        strokeWidth="0"
                        cx="32"
                        cy="47.5"
                        r="3"
                        {...getAnimateFadeInProps('0.8s', platformOverrides)}
                    />
                </g>
            </g>
        </svg>
    );
};

const IconErrorDefault = ({size = 48}: Props): JSX.Element => {
    const {platformOverrides} = useTheme();

    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 64 64" overflow="visible">
            <g
                stroke={vars.colors.error}
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
            >
                <g className={styles.outerAnimation}>
                    <path
                        fill="none"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        d="M 31.9 0.9 C 52.5 0.9 62.9 11.4 62.9 31.9 C 62.9 52.5 52.5 62.9 31.9 62.9 C 11.3 62.9 0.9 52.5 0.9 31.9 C 0.9 11.3 11.3 0.9 31.9 0.9 Z"
                        transform="rotate(90 32 32)"
                        {...getAnimateDrawLineProps('202', '0.3s', platformOverrides)}
                    />
                </g>
                <g className={styles.innerAnimation}>
                    <line
                        x1="31.9"
                        y1="20.9"
                        x2="31.9"
                        y2="36.9"
                        {...getAnimateDrawLineProps('17', '0.7s', platformOverrides)}
                    />
                    <circle
                        stroke={vars.colors.error}
                        fill={vars.colors.error}
                        strokeWidth="1"
                        cx="31.9"
                        cy="43.9"
                        r="1.5"
                        {...getAnimateFadeInProps('1s', platformOverrides)}
                    />
                </g>
            </g>
        </svg>
    );
};

const IconError = (props: Props): JSX.Element => {
    const {skinName} = useTheme();

    return skinName === O2_SKIN || skinName === O2_NEW_SKIN ? (
        <IconErrorO2 {...props} />
    ) : (
        <IconErrorDefault {...props} />
    );
};

export default IconError;
