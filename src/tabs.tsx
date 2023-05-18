import * as React from 'react';
import classnames from 'classnames';
import {BaseTouchable} from './touchable';
import ResponsiveLayout from './responsive-layout';
import {useAriaId, useElementDimensions} from './hooks';
import {Text3} from './text';
import {isRunningAcceptanceTest} from './utils/platform';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './tabs.css';

import type {DataAttributes, TrackingEvent} from './utils/types';

const LINE_ANIMATION_DURATION_MS = isRunningAcceptanceTest() ? 0 : 300;

const getTabVariant = (numberOfTabs: number): keyof typeof styles.tabVariants => {
    switch (numberOfTabs) {
        case 2:
            return 'tabs2';
        case 3:
            return 'tabs3';
        default:
            return 'default';
    }
};

export type TabsProps = {
    selectedIndex: number;
    onChange: (selectedIndex: number) => void;
    tabs: ReadonlyArray<{
        readonly text: string;
        readonly trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
        readonly icon?: React.ReactNode;
        readonly 'aria-controls'?: string;
    }>;
    children?: void;
    dataAttributes?: DataAttributes;
};

const Tabs: React.FC<TabsProps> = ({selectedIndex, onChange, tabs, dataAttributes}: TabsProps) => {
    const id = useAriaId();
    const {ref} = useElementDimensions();
    const animatedLineRef = React.useRef<HTMLDivElement>(null);
    const scrollableContainerRef = React.useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const animateLine = (fromIndex: number, toIndex: number) => {
        const tabFrom = document.querySelector<HTMLElement>(`[id='${id}'] [data-tabindex="${fromIndex}"]`);
        const tabTo = document.querySelector<HTMLElement>(`[id='${id}'] [data-tabindex="${toIndex}"]`);
        const line = animatedLineRef.current;
        const scrollable = scrollableContainerRef.current;
        if (tabFrom && tabTo && line && scrollable) {
            setIsAnimating(true);
            // set initial line styles
            line.style.display = 'block';
            line.style.width = `${tabFrom.offsetWidth}px`;
            line.style.transform = `translate(${tabFrom.offsetLeft - scrollable.scrollLeft}px, 0)`;
            Promise.resolve().then(() => {
                // set final line styles
                line.style.width = `${tabTo.offsetWidth}px`;
                line.style.transform = `translate(${tabTo.offsetLeft - scrollable.scrollLeft}px, 0)`;
                line.style.transition = `transform ${LINE_ANIMATION_DURATION_MS}ms, width ${LINE_ANIMATION_DURATION_MS}ms`;
            });
            setTimeout(() => {
                // hide line
                line.style.transition = '';
                line.style.display = 'none';
                setIsAnimating(false);
            }, LINE_ANIMATION_DURATION_MS);
        }
    };

    return (
        <div
            id={id}
            role="tablist"
            ref={ref}
            className={styles.outerBorder}
            {...getPrefixedDataAttributes(dataAttributes, 'Tabs')}
        >
            <ResponsiveLayout fullWidth>
                <div className={styles.outer}>
                    <div ref={scrollableContainerRef} className={styles.inner}>
                        <div className={styles.tabsContainer}>
                            {tabs.map(({text, trackingEvent, icon, 'aria-controls': ariaControls}, index) => {
                                const isSelected = index === selectedIndex;
                                return (
                                    <BaseTouchable
                                        dataAttributes={{'component-name': 'Tab', tabindex: index}}
                                        key={index}
                                        className={classnames(
                                            styles.tabVariants[getTabVariant(tabs.length)],
                                            isSelected
                                                ? isAnimating
                                                    ? styles.tabSelectionVariants.selectedAnimating
                                                    : styles.tabSelectionVariants.selected
                                                : styles.tabSelectionVariants.noSelected,
                                            icon && styles.tabWithIcon
                                        )}
                                        onPress={() => {
                                            if (!isAnimating && selectedIndex !== index) {
                                                onChange(index);
                                                animateLine(selectedIndex, index);
                                            }
                                        }}
                                        trackingEvent={trackingEvent}
                                        role="tab"
                                        aria-controls={ariaControls}
                                        aria-selected={isSelected ? 'true' : 'false'}
                                    >
                                        {icon && <div className={styles.icon}>{icon}</div>}
                                        <Text3 medium color="inherit" wordBreak={false} textAlign="center">
                                            {text}
                                        </Text3>
                                    </BaseTouchable>
                                );
                            })}
                        </div>
                    </div>
                    <div ref={animatedLineRef} className={styles.animatedLine} />
                </div>
            </ResponsiveLayout>
        </div>
    );
};

export default Tabs;
