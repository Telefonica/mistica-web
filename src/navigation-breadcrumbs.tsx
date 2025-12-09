/**
 * Figma: https://www.figma.com/file/BctaFHf0PVPX2uwRSl8taf/Breadcrumbs?node-id=2%3A61
 * Accessibility: https://www.w3.org/WAI/ARIA/apg/example-index/breadcrumb/index.html
 */

'use client';
import * as React from 'react';
import {Text1} from './text';
import {getPrefixedDataAttributes} from './utils/dom';
import TextLink from './text-link';
import * as styles from './navigation-breadcrumbs.css';
import {vars} from './skins/skin-contract.css';

import type {DataAttributes} from './utils/types';

const BREADCRUMB_SEPARATOR = ' / ';

export type NavigationBreadcrumbsProps = {
    title: string;
    breadcrumbs: ReadonlyArray<{
        readonly title: string;
        readonly url: string;
        onNavigate?: () => void;
    }>;
    children?: void;
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
};

const NavigationBreadcrumbs = ({
    title,
    breadcrumbs,
    dataAttributes,
    'aria-label': ariaLabel = 'Breadcrumb',
}: NavigationBreadcrumbsProps): JSX.Element => {
    return (
        <nav aria-label={ariaLabel} {...getPrefixedDataAttributes(dataAttributes, 'NavigationBreadcrumbs')}>
            <ol className={styles.list}>
                {breadcrumbs.map(({title, url, onNavigate}, index) => (
                    <li key={index} className={styles.listItem}>
                        <TextLink to={url} className={styles.link} onNavigate={onNavigate}>
                            <Text1 regular>{title}</Text1>
                        </TextLink>
                        <span role="presentation">
                            <Text1 regular>{BREADCRUMB_SEPARATOR}</Text1>
                        </span>
                    </li>
                ))}
                <li className={styles.listItem}>
                    {/* this anchor is added for accessibility, it is disabled */}
                    <a
                        aria-current="page"
                        href="#"
                        className={styles.current}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <Text1 regular color={vars.colors.textSecondary}>
                            {title}
                        </Text1>
                    </a>
                </li>
            </ol>
        </nav>
    );
};

export default NavigationBreadcrumbs;
