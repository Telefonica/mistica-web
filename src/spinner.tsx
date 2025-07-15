'use client';
import * as React from 'react';
import {getPlatform} from './utils/platform';
import FadeIn from './fade-in';
import {useTheme} from './hooks';
import * as styles from './spinner.css';
import {vars} from './skins/skin-contract.css';
import {useIsInverseOrMediaVariant} from './theme-variant-context';
import * as tokens from './text-tokens';
import ScreenReaderOnly from './screen-reader-only';

type Props = {
    color?: string;
    delay?: string;
    size?: number | string;
    /** @deprecated Use aria-hidden instead */
    rolePresentation?: boolean;
    'aria-hidden'?: 'true' | 'false' | boolean;
    'aria-label'?: string;
    style?: React.CSSProperties;
    children?: void;
};

const Spinner = ({
    color,
    delay = '500ms',
    size = 24,
    style,
    rolePresentation,
    'aria-hidden': ariaHidden,
    'aria-label': ariaLabel,
}: Props): JSX.Element => {
    const {texts, platformOverrides, t} = useTheme();
    const isInverse = useIsInverseOrMediaVariant();
    color = color || (isInverse ? vars.colors.controlActivatedInverse : vars.colors.controlActivated);
    const label = ariaLabel || texts.loading || t(tokens.loading);
    const content =
        getPlatform(platformOverrides) === 'ios' ? (
            <svg
                className={styles.spinnerIos}
                height={size}
                style={{...style}}
                role="progressbar"
                aria-live="polite"
                aria-label={label}
                aria-hidden={ariaHidden || rolePresentation}
                viewBox="0 0 30 30"
                width={size}
            >
                <g role="presentation">
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M14 1.5C14 0.671573 14.6716 0 15.5 0C16.3284 0 17 0.671573 17 1.5V8.5C17 9.32843 16.3284 10 15.5 10C14.6716 10 14 9.32843 14 8.5V1.5Z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M21.182 11.1317C20.5962 11.7175 19.6464 11.7175 19.0607 11.1317C18.4749 10.5459 18.4749 9.59619 19.0607 9.01041L24.0104 4.06066C24.5962 3.47487 25.5459 3.47487 26.1317 4.06066C26.7175 4.64645 26.7175 5.59619 26.1317 6.18198L21.182 11.1317Z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M28.5 13C29.3284 13 30 13.6716 30 14.5C30 15.3284 29.3284 16 28.5 16H21.5C20.6716 16 20 15.3284 20 14.5C20 13.6716 20.6716 13 21.5 13H28.5Z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M19.0607 20.182C18.4749 19.5962 18.4749 18.6464 19.0607 18.0607C19.6464 17.4749 20.5962 17.4749 21.182 18.0607L26.1317 23.0104C26.7175 23.5962 26.7175 24.5459 26.1317 25.1317C25.5459 25.7175 24.5962 25.7175 24.0104 25.1317L19.0607 20.182Z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M14 21.5C14 20.6716 14.6716 20 15.5 20C16.3284 20 17 20.6716 17 21.5V28.5C17 29.3284 16.3284 30 15.5 30C14.6716 30 14 29.3284 14 28.5V21.5Z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M7.18198 25.1317C6.59619 25.7175 5.64645 25.7175 5.06066 25.1317C4.47487 24.5459 4.47487 23.5962 5.06066 23.0104L10.0104 18.0607C10.5962 17.4749 11.5459 17.4749 12.1317 18.0607C12.7175 18.6464 12.7175 19.5962 12.1317 20.182L7.18198 25.1317Z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M8.5 13C9.32843 13 10 13.6716 10 14.5C10 15.3284 9.32843 16 8.5 16H1.5C0.671573 16 0 15.3284 0 14.5C0 13.6716 0.671573 13 1.5 13H8.5Z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M5.06066 6.18198C4.47487 5.59619 4.47487 4.64645 5.06066 4.06066C5.64645 3.47487 6.59619 3.47487 7.18198 4.06066L12.1317 9.01041C12.7175 9.59619 12.7175 10.5459 12.1317 11.1317C11.5459 11.7175 10.5962 11.7175 10.0104 11.1317L5.06066 6.18198Z"
                    />
                </g>
            </svg>
        ) : (
            <div aria-hidden={ariaHidden || rolePresentation} aria-live="polite">
                {/* Android TalkBack doesn't read label of role="progress" elements, so we need a ScreenReaderOnly with the label */}
                <ScreenReaderOnly>
                    <span>{label}</span>
                </ScreenReaderOnly>
                <svg
                    role="progressbar"
                    // this doesn't work in TalkBack, but it's needed for testing-library tests
                    aria-label={label}
                    className={styles.spinnerDefault}
                    height={size}
                    style={{...style}}
                    viewBox="0 0 66 66"
                    width={size}
                >
                    <circle
                        className={styles.spinnerDefaultPath}
                        cx="33"
                        cy="33"
                        fill="none"
                        r="30"
                        role="presentation"
                        stroke={color}
                        strokeWidth="6"
                    />
                </svg>
            </div>
        );
    if (delay === '0' || delay === '0s' || delay === '0ms') {
        return content;
    }
    return (
        <FadeIn delay={delay} dataAttributes={{'component-name': 'Spinner'}}>
            {content}
        </FadeIn>
    );
};

export default Spinner;
