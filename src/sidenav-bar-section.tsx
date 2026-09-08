'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as styles from './sidenav-bar.css';
import {useThemeVariant} from './theme-variant-context';
import {getPrefixedDataAttributes} from './utils/dom';
import Divider from './divider';
import {Text2} from './text';
import {useSidenavBarContext} from './sidenav-bar-context';
import {useRestWidth} from './sidenav-bar-motion';

import type {DataAttributes} from './utils/types';

type SidenavSectionProps = {
    /** Section heading. When the sidenav is collapsed it closes and the items move up, but it still names the list. */
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
    // The visible title names the list of the section, so the name a screen reader speaks is always the
    // text the user sees. The section itself carries no role and no name: the named list is the whole
    // structure, as in the second level (see `sidenav-bar-panel.tsx`).
    const titleId = React.useId();
    // The title holds the width that it had at rest while the sidenav moves, in both directions, so its
    // lines stay where they are while its box folds. See `sectionTitleKeepsWidth` for the fallback.
    const isTitleWidthKept = collapsed || collapsedSettled;
    const {ref: titleRef, frozenWidth: titleWidth} = useRestWidth(isTitleWidthKept);

    return (
        <div
            className={styles.section}
            {...getPrefixedDataAttributes({testid: 'SidenavSection', ...dataAttributes})}
        >
            {dividerTop && (
                <div className={styles.sectionDividerTop}>
                    <Divider />
                </div>
            )}
            {title && (
                <div
                    ref={titleRef}
                    id={titleId}
                    // The list already speaks this text as its name, so the title steps out of the
                    // reading order. The name survives: `aria-labelledby` reads a hidden element that
                    // it references directly.
                    aria-hidden="true"
                    className={classnames(styles.sectionTitle, styles.sectionTitleVariant[variant], {
                        [styles.sectionTitleCollapsed]: collapsed,
                        [styles.sectionTitleKeepsWidth]: isTitleWidthKept && titleWidth === undefined,
                    })}
                    style={titleWidth !== undefined ? {width: titleWidth} : undefined}
                >
                    <div className={styles.sectionTitleContent}>
                        <Text2 medium color="inherit">
                            {title}
                        </Text2>
                    </div>
                </div>
            )}
            {/* The title names the list, and the list gives the count of its items. */}
            <div className={styles.sectionContent} role="list" aria-labelledby={title ? titleId : undefined}>
                {children}
            </div>
            {dividerBottom && (
                <div className={styles.sectionDividerBottom}>
                    <Divider />
                </div>
            )}
        </div>
    );
};

export {SidenavSection};
export type {SidenavSectionProps};
