'use client';
import * as React from 'react';
import {ButtonLink} from './button';
import * as styles from './skip-link.css';
import {useTheme} from './hooks';
import * as tokens from './text-tokens';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

type Props = {
    targetId: string;
    'aria-label'?: string;
    children?: React.ReactNode;
    dataAttributes?: DataAttributes;
};

const SkipLink = ({targetId, children, 'aria-label': ariaLabel, dataAttributes}: Props): JSX.Element => {
    return (
        <div className={styles.skipLinkContainer} {...getPrefixedDataAttributes(dataAttributes, 'SkipLink')}>
            <ButtonLink aria-label={ariaLabel} href={`#${targetId}`} withChevron={false}>
                {children}
            </ButtonLink>
        </div>
    );
};

type SkipLinkNavProps = {
    children: React.ReactNode;
    'aria-label'?: string;
    dataAttributes?: DataAttributes;
};

export const SkipLinkNav = ({
    children,
    'aria-label': ariaLabel,
    dataAttributes,
}: SkipLinkNavProps): JSX.Element => {
    const {texts, t} = useTheme();
    const navLabel = ariaLabel || texts.skipLinkNavLabel || t(tokens.skipLinkNavLabel);
    return (
        <nav aria-label={navLabel} {...getPrefixedDataAttributes(dataAttributes, 'SkipLinkNav')}>
            <ul className={styles.skipLinkList}>
                {React.Children.map(children, (child) => (
                    <li>{child}</li>
                ))}
            </ul>
        </nav>
    );
};

export default SkipLink;
