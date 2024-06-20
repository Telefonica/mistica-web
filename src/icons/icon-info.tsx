'use client';
import * as React from 'react';
import {useTheme} from '../hooks';
import {O2_SKIN, O2_NEW_SKIN} from '../skins/constants';
import {vars} from '../skins/skin-contract.css';

type Props = {
    size?: number | string;
};

const IconInfoO2 = ({size = 48}: Props): JSX.Element => {
    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 64 64">
            <g
                stroke={vars.colors.brand}
                fill={vars.colors.brand}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path
                    fill="none"
                    strokeWidth="2"
                    d="M48.24,57.99c-4.71,2.95-10.27,4.65-16.24,4.65C15.08,62.64,1.36,48.92,1.36,32S15.08,1.36,32,1.36 S62.64,15.08,62.64,32c0,6.11-1.79,11.8-4.87,16.58"
                />
                <line fill="none" strokeWidth="2" x1="32" y1="47.96" x2="32" y2="23.74" />
                <circle cx="53.64" cy="53.54" r="1.06" />
                <circle strokeWidth="0" cx="32" cy="16.58" r="1.72" />
            </g>
        </svg>
    );
};

const IconInfoO2New = ({size = 48}: Props): JSX.Element => {
    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 48 48">
            <g fill={vars.colors.brand}>
                <path d="M24 36.8544C23.0592 36.8544 22.2816 36.0864 22.2816 35.136V18.8544C22.2816 17.9136 23.0496 17.136 24 17.136C24.9408 17.136 25.7184 17.904 25.7184 18.8544V35.136C25.7184 36.0864 24.9408 36.8544 24 36.8544Z" />
                <path d="M24 14.5728C25.1823 14.5728 26.1408 13.6143 26.1408 12.432C26.1408 11.2497 25.1823 10.2912 24 10.2912C22.8177 10.2912 21.8592 11.2497 21.8592 12.432C21.8592 13.6143 22.8177 14.5728 24 14.5728Z" />
                <path d="M0 24C0 37.2 10.8 48 24 48C37.2 48 48 37.2 48 24C48 10.8 37.2 0 24 0C10.8 0 0 10.8 0 24ZM3.4272 24C3.4272 12.6816 12.6816 3.4272 24 3.4272C35.3184 3.4272 44.5728 12.6816 44.5728 24C44.5728 35.3184 35.3184 44.5728 24 44.5728C12.6816 44.5728 3.4272 35.3184 3.4272 24Z" />
            </g>
        </svg>
    );
};

const IconInfoDefault = ({size = 48}: Props): JSX.Element => {
    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 64 64">
            <g fill={vars.colors.brand}>
                <path
                    fillRule="nonzero"
                    strokeWidth="0"
                    d="M31.991 0c21.24 0 32.01 10.77 32.01 32.01C64 53.235 53.23 64 31.99 64 10.763 64 .001 53.236.001 32.01 0 10.77 10.762 0 31.99 0zm0 2c-20.18 0-29.99 9.816-29.99 30.01C2 52.19 11.81 62 31.99 62c20.192 0 30.01-9.81 30.01-29.99C62 11.815 52.182 2 31.99 2zM32 27a1 1 0 0 1 1 1v16a1 1 0 0 1-2 0V28a1 1 0 0 1 1-1zm0-7.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
                />
            </g>
        </svg>
    );
};

const IconInfo = (props: Props): JSX.Element => {
    const {skinName} = useTheme();

    switch (skinName) {
        case O2_SKIN:
            return <IconInfoO2 {...props} />;
        case O2_NEW_SKIN:
            return <IconInfoO2New {...props} />;
        default:
            return <IconInfoDefault {...props} />;
    }
};

export default IconInfo;
