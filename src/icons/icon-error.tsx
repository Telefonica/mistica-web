'use client';
import * as React from 'react';
import {getAnimateDrawLineProps, getAnimateFadeInProps} from '../utils/animation';
import {useTheme} from '../hooks';
import {O2_SKIN, VIVO_SKIN, VIVO_EVOLUTION_SKIN} from '../skins/constants';
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

const IconErrorVivoEvolution = ({size = 48}: Props): JSX.Element => {
    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 48 48" fill="none">
            <path
                d="M0 18C0 8.05888 8.05888 0 18 0H30C39.9411 0 48 8.05888 48 18V30C48 39.9411 39.9411 48 30 48H18C8.05888 48 0 39.9411 0 30V18Z"
                fill={vars.colors.errorLow}
            />
            <path
                d="M23.9948 12.5801C24.1593 12.5795 24.335 12.5865 24.5026 12.6016C25.9418 12.7313 27.318 13.5064 28.1149 14.8243L28.1247 14.8399L35.8552 28.877C36.7357 30.3471 36.7031 32.1087 35.822 33.4893C35.0153 34.753 33.4865 35.418 31.9851 35.418H16.0144C14.513 35.418 12.9841 34.753 12.1774 33.4893C11.2963 32.1087 11.2637 30.3471 12.1442 28.877L19.8747 14.8399L19.8845 14.8243C20.6814 13.5064 22.0576 12.7313 23.4968 12.6016C23.6628 12.5866 23.829 12.5795 23.9948 12.5801ZM23.9909 14.4551C23.8827 14.4546 23.7736 14.459 23.6647 14.4688C22.7771 14.5489 21.9631 15.0211 21.4978 15.7793L13.7683 29.8135L13.7585 29.8301C13.231 30.7026 13.2628 31.7054 13.7575 32.4805C14.1466 33.0901 15.0042 33.543 16.0144 33.543H31.9851C32.9952 33.543 33.8528 33.0901 34.2419 32.4805C34.7366 31.7054 34.7685 30.7026 34.2409 29.8301L34.2311 29.8135L26.5017 15.7793C26.0363 15.0211 25.2224 14.5488 24.3347 14.4688C24.2274 14.4591 24.1094 14.4546 23.9997 14.4551H23.9909ZM23.9997 28.9756C24.5175 28.9756 24.9372 29.3954 24.9372 29.9131C24.9369 30.4307 24.5173 30.8506 23.9997 30.8506C23.4821 30.8506 23.0625 30.4307 23.0622 29.9131C23.0622 29.3954 23.4819 28.9756 23.9997 28.9756ZM23.9997 19.5948C24.5175 19.5948 24.9372 20.0145 24.9372 20.5323V26.7823C24.9371 27.3 24.5174 27.7198 23.9997 27.7198C23.482 27.7198 23.0623 27.3 23.0622 26.7823V20.5323C23.0622 20.0145 23.4819 19.5948 23.9997 19.5948Z"
                fill={vars.colors.errorHigh}
            />
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
        case VIVO_SKIN:
            return <IconErrorVivo {...props} />;
        case VIVO_EVOLUTION_SKIN:
            return <IconErrorVivoEvolution {...props} />;
        default:
            return <IconErrorDefault {...props} />;
    }
};

export default IconError;
