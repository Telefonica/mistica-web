import * as React from 'react';
import {getPlatform} from './utils/platform';
import FadeIn from './fade-in';
import {useAriaId, useTheme} from './hooks';
import * as styles from './spinner.css';
import {vars} from './skins/skin-contract.css';

type Props = {
    color?: string;
    delay?: string;
    size?: number | string;
    rolePresentation?: boolean;
    style?: React.CSSProperties;
    children?: void;
};

const Spinner: React.FC<Props> = ({color, delay = '500ms', size = 24, style, rolePresentation}) => {
    const {texts, platformOverrides} = useTheme();
    color = color || vars.colors.controlActivated;
    const spinnerId = useAriaId();
    const withTitle = !rolePresentation;
    const title = texts.loading;
    const content =
        getPlatform(platformOverrides) === 'ios' ? (
            <svg
                aria-labelledby={spinnerId}
                className={styles.spinnerIos}
                height={size}
                style={{...style}}
                role="img"
                viewBox="0 0 28 28"
                width={size}
            >
                {withTitle && <title id={spinnerId}>{title}</title>}
                <g role="presentation">
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M18.696 10.5c-.275-.48-.113-1.09.365-1.367l4.76-2.75c.49-.274 1.1-.11 1.37.367.28.48.12 1.092-.36 1.364l-4.76 2.75c-.48.277-1.09.113-1.36-.364z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M16.133 6.938l2.75-4.765c.276-.478.89-.643 1.367-.366.48.276.64.886.365 1.366l-2.748 4.762c-.276.48-.888.645-1.367.368-.48-.276-.644-.89-.367-1.365z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M13.5 7.5c-.553 0-1-.448-1-1V1c0-.554.447-1 1-1 .553 0 1.002.447 1.002 1v5.5c-.002.553-.45 1-1.003 1z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M8.303 10.5c-.277.477-.888.64-1.365.365l-4.763-2.75c-.478-.273-.643-.886-.367-1.365.277-.48.89-.642 1.367-.368l4.762 2.75c.48.278.643.89.366 1.368z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M9.133 7.937l-2.75-4.763c-.276-.48-.11-1.09.365-1.366.48-.277 1.09-.114 1.367.366l2.75 4.765c.274.47.112 1.08-.367 1.36-.477.28-1.09.11-1.365-.37z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M6.5 14.5H1c-.554 0-1-.448-1-1 0-.554.447-1 1-1h5.5c.55 0 1 .447 1 1 0 .552-.448 1-1 1z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M8.303 16.502c.277.478.113 1.088-.365 1.366l-4.762 2.75c-.478.272-1.09.11-1.368-.367-.276-.47-.11-1.08.367-1.36l4.762-2.75c.478-.28 1.09-.11 1.366.37z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M10.866 20.062l-2.75 4.767c-.277.47-.89.63-1.367.36-.48-.28-.65-.89-.37-1.37l2.75-4.77c.27-.48.89-.64 1.36-.37.47.276.64.89.36 1.364z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M13.5 19.502c.553 0 1.002.448 1.002 1.002v5.498c0 .55-.448 1-1.003 1-.56 0-1-.448-1-1v-5.498c0-.554.44-1.002 1-1.002z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M17.867 19.062l2.748 4.764c.275.48.113 1.088-.365 1.365-.48.28-1.09.12-1.367-.36l-2.75-4.76c-.276-.47-.11-1.09.367-1.36.48-.27 1.09-.11 1.367.37z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M18.696 16.502c.276-.48.887-.646 1.365-.367l4.77 2.748c.48.28.64.89.37 1.368-.27.48-.88.64-1.37.37l-4.76-2.75c-.47-.27-.64-.89-.36-1.36z"
                    />
                    <path
                        className={styles.spinnerIosSvgPath}
                        fill={color}
                        d="M25.998 12.5h-5.5c-.553 0-1.002.447-1.002 1 0 .552.447 1 1 1H26c.554 0 1.002-.448 1.002-1 0-.554-.448-1-1.002-1z"
                    />
                </g>
            </svg>
        ) : (
            <svg
                aria-labelledby={withTitle ? spinnerId : undefined}
                className={styles.spinnerDefault}
                height={size}
                style={{...style}}
                role="img"
                viewBox="0 0 66 66"
                width={size}
            >
                {withTitle && <title id={spinnerId}>{title}</title>}
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
