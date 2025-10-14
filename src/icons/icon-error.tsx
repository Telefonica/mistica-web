'use client';
import * as React from 'react';
import {getAnimateDrawLineProps, getAnimateFadeInProps} from '../utils/animation';
import {useTheme} from '../hooks';
import {O2_SKIN, O2_NEW_SKIN, VIVO_NEW_SKIN} from '../skins/constants';
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
                    <path
                        strokeWidth="2"
                        fill="none"
                        d="M48.24,57.99c-4.71,2.95-10.27,4.65-16.24,4.65C15.08,62.64,1.36,48.92,1.36,32S15.08,1.36,32,1.36 S62.64,15.08,62.64,32c0,6.11-1.79,11.8-4.87,16.58"
                        {...getAnimateDrawLineProps('202', '0.3s', platformOverrides)}
                    />
                    <circle
                        cx="53.64"
                        cy="53.54"
                        r="1.06"
                        {...getAnimateFadeInProps('0.2s', platformOverrides)}
                    />
                </g>
                <g className={styles.innerAnimation}>
                    <line
                        strokeWidth="2"
                        fill="none"
                        x1="32"
                        y1="14.86"
                        x2="32"
                        y2="39.08"
                        {...getAnimateDrawLineProps('110', '0.6s', platformOverrides)}
                    />
                    <circle
                        strokeWidth="0"
                        cx="32"
                        cy="46.25"
                        r="1.72"
                        {...getAnimateFadeInProps('0.8s', platformOverrides)}
                    />
                </g>
            </g>
        </svg>
    );
};

const IconErrorO2New = ({size = 48}: Props): JSX.Element => {
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

const IconErrorVivo = ({size = 48}: Props): JSX.Element => {
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

const IconErrorDefault = ({size = 48}: Props): JSX.Element => {
    const {platformOverrides} = useTheme();

    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 64 64" overflow="visible">
            <g
                stroke={vars.colors.error}
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
            >
                <g className={styles.outerAnimation}>
                    <circle
                        fill="none"
                        cx="32"
                        cy="32"
                        r="30"
                        {...getAnimateDrawLineProps('202', '0.3s', platformOverrides)}
                    />
                </g>
                <g className={styles.innerAnimation}>
                    <path
                        d="M32 17.9375V32.9375"
                        {...getAnimateDrawLineProps('17', '0.7s', platformOverrides)}
                    />
                    <circle
                        stroke={vars.colors.error}
                        fill={vars.colors.error}
                        cx="32"
                        cy="45.1289"
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

    switch (skinName) {
        case O2_SKIN:
            return <IconErrorO2 {...props} />;
        case O2_NEW_SKIN:
            return <IconErrorO2New {...props} />;
        case VIVO_NEW_SKIN:
            return <IconErrorVivo {...props} />;
        default:
            return <IconErrorDefault {...props} />;
    }
};

export default IconError;
