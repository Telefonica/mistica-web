'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as styles from './sidenav-bar.css';
import {useThemeVariant} from './theme-variant-context';
import {getPrefixedDataAttributes} from './utils/dom';
import Divider from './divider';
import {Text3} from './text';
import {useSidenavBarContext} from './sidenav-bar-context';

import type {DataAttributes} from './utils/types';

type SidenavSectionProps = {
    /** Section heading. Hidden (space reserved) when the sidenav is collapsed. */
    title?: string;
    /** Renders a divider above the section. @default false */
    dividerTop?: boolean;
    /** Renders a divider below the section. @default false */
    dividerBottom?: boolean;
    /** Navigation items (`SidenavItem` elements).
     * @see SidenavItem
     */
    children: React.ReactNode;
    dataAttributes?: DataAttributes;
};

const SidenavSection = ({
    title,
    dividerTop,
    dividerBottom,
    children,
    dataAttributes,
}: SidenavSectionProps): JSX.Element => {
    const {collapsed, collapsedSettled} = useSidenavBarContext();
    const variant = useThemeVariant();

    return (
        <div
            className={styles.section}
            role="group"
            aria-label={title}
            {...getPrefixedDataAttributes({testid: 'SidenavSection', ...dataAttributes})}
        >
            {dividerTop && (
                <div className={styles.sectionDivider}>
                    <Divider />
                </div>
            )}
            {title && (
                <div
                    className={classnames(styles.sectionTitle, styles.sectionTitleVariant[variant], {
                        [styles.sectionTitleCollapsed]: collapsed,
                        // The title holds the width of its text while the sidenav moves, in both
                        // directions. See `sectionTitleKeepsWidth`.
                        [styles.sectionTitleKeepsWidth]: collapsed || collapsedSettled,
                    })}
                >
                    <Text3 medium truncate={collapsed ? 1 : undefined} color="inherit">
                        {title}
                    </Text3>
                </div>
            )}
            <div className={styles.sectionContent}>{children}</div>
            {dividerBottom && (
                <div className={styles.sectionDivider}>
                    <Divider />
                </div>
            )}
        </div>
    );
};

export {SidenavSection};
export type {SidenavSectionProps};
