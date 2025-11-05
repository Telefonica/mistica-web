'use client';
import * as React from 'react';
import classnames from 'classnames';
import {BaseTouchable} from './touchable';
import ResponsiveLayout from './responsive-layout';
import {useElementDimensions, useTheme} from './hooks';
import {Text} from './text';
import {isRunningAcceptanceTest} from './utils/platform';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './tabs.css';
import Inline from './inline';
import {useIsInverseOrMediaVariant} from './theme-variant-context';
import {vars} from './skins/skin-contract.css';
import {LEFT, RIGHT} from './utils/keys';

import type {DataAttributes, IconProps, TrackingEvent} from './utils/types';

const LINE_ANIMATION_DURATION_MS = isRunningAcceptanceTest() ? 0 : 300;

const getTabVariant = (numberOfTabs: number): keyof typeof styles.tabVariants => {
    switch (numberOfTabs) {
        case 1:
        case 2:
        case 3:
            return 'fullWidth';
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
        readonly Icon?: (props: IconProps) => JSX.Element;
        readonly 'aria-controls'?: string;
        readonly id?: string;
    }>;
    children?: void;
    dataAttributes?: DataAttributes;
    selectedTabRef?: React.RefCallback<HTMLDivElement> | React.Ref<HTMLDivElement>;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-description'?: string;
    'aria-describedby'?: string;
    renderPanel?: (config: {
        selectedIndex: number;
        panelProps: {
            id: string;
            role: string;
            tabIndex: number;
            'aria-labelledby': string;
        };
    }) => React.ReactNode;
};

const Tabs = ({
    selectedIndex,
    onChange,
    tabs,
    dataAttributes,
    selectedTabRef,
    renderPanel,
    ...otherProps
}: TabsProps): JSX.Element => {
    const {textPresets} = useTheme();
    const id = React.useId();
    const {ref} = useElementDimensions();
    const animatedLineRef = React.useRef<HTMLDivElement>(null);
    const scrollableContainerRef = React.useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const isInverse = useIsInverseOrMediaVariant();

    const getTabId = (index: number) => {
        return tabs[index].id ?? `${id}-tab-${index}`;
    };

    const getPanelId = (index: number) => {
        return tabs[index]['aria-controls'] ?? (renderPanel ? `${id}-tabpanel-${index}` : undefined);
    };

    const animateLine = (fromIndex: number, toIndex: number) => {
        const tabFrom = document.getElementById(getTabId(fromIndex));
        const tabTo = document.getElementById(getTabId(toIndex));
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
                line.style.transition = `transform ${LINE_ANIMATION_DURATION_MS}ms, width ${LINE_ANIMATION_DURATION_MS}ms`;
                line.style.width = `${tabTo.offsetWidth}px`;
                line.style.transform = `translate(${tabTo.offsetLeft - scrollable.scrollLeft}px, 0)`;
            });
            setTimeout(() => {
                // hide line
                line.style.transition = '';
                line.style.display = 'none';
                setIsAnimating(false);
            }, LINE_ANIMATION_DURATION_MS);
        }
    };

    const handleKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'));
        const focusedTab = document.activeElement as HTMLElement;
        const focusedIndex = tabs.indexOf(focusedTab);
        if (focusedIndex === -1) {
            return;
        }

        if (event.key === RIGHT) {
            event.preventDefault();
            const nextTab = focusedIndex < tabs.length - 1 ? tabs[focusedIndex + 1] : tabs[0];
            nextTab?.focus();
        } else if (event.key === LEFT) {
            event.preventDefault();
            const prevTab = focusedIndex > 0 ? tabs[focusedIndex - 1] : tabs[tabs.length - 1];
            prevTab?.focus();
        }
    }, []);

    return (
        <>
            {/* This eslint rule doesn't support aria-description and it's complaining about it */}
            {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
            <div
                id={id}
                role="tablist"
                ref={ref}
                className={isInverse ? styles.outerBorderInverse : styles.outerBorder}
                {...getPrefixedDataAttributes(dataAttributes, 'Tabs')}
                aria-label={otherProps['aria-label']}
                aria-labelledby={otherProps['aria-labelledby']}
                aria-description={otherProps['aria-description']}
                aria-describedby={otherProps['aria-describedby']}
            >
                <ResponsiveLayout fullWidth>
                    <div className={styles.outer}>
                        <div ref={scrollableContainerRef} className={styles.inner}>
                            <div className={styles.tabsContainer} onKeyDown={handleKeyDown}>
                                {tabs.map(({text, trackingEvent, Icon}, index) => {
                                    const isSelected = index === selectedIndex;
                                    return (
                                        <BaseTouchable
                                            id={getTabId(index)}
                                            tabIndex={isSelected ? undefined : -1}
                                            ref={isSelected ? selectedTabRef : undefined}
                                            dataAttributes={{'component-name': 'Tab'}}
                                            key={index}
                                            className={classnames(
                                                styles.tabVariants[getTabVariant(tabs.length)],
                                                isSelected
                                                    ? isAnimating
                                                        ? isInverse
                                                            ? styles.tabSelectionVariants
                                                                  .selectedAnimatingInverse
                                                            : styles.tabSelectionVariants.selectedAnimating
                                                        : isInverse
                                                          ? styles.tabSelectionVariants.selectedInverse
                                                          : styles.tabSelectionVariants.selected
                                                    : isInverse
                                                      ? styles.tabSelectionVariants.noSelectedInverse
                                                      : styles.tabSelectionVariants.noSelected,
                                                isInverse ? styles.tabHover.inverse : styles.tabHover.default
                                            )}
                                            onPress={() => {
                                                if (!isAnimating && selectedIndex !== index) {
                                                    onChange(index);
                                                    animateLine(selectedIndex, index);
                                                }
                                            }}
                                            trackingEvent={trackingEvent}
                                            role="tab"
                                            aria-controls={getPanelId(index)}
                                            aria-selected={isSelected ? 'true' : 'false'}
                                        >
                                            <Inline space={!!Icon && !!text ? 8 : 0} alignItems="center">
                                                {Icon && (
                                                    <div className={styles.icon}>
                                                        <Icon size="100%" color="currentColor" />
                                                    </div>
                                                )}
                                                <Text
                                                    as="div"
                                                    desktopSize={textPresets.tabsLabel.size.desktop}
                                                    mobileSize={textPresets.tabsLabel.size.mobile}
                                                    desktopLineHeight={
                                                        textPresets.tabsLabel.lineHeight.desktop
                                                    }
                                                    mobileLineHeight={textPresets.tabsLabel.lineHeight.mobile}
                                                    weight={textPresets.tabsLabel.weight}
                                                    color="inherit"
                                                    wordBreak={false}
                                                    textAlign="center"
                                                    hyphens="auto"
                                                >
                                                    {text}
                                                </Text>
                                            </Inline>
                                        </BaseTouchable>
                                    );
                                })}
                            </div>
                        </div>
                        <div
                            ref={animatedLineRef}
                            className={styles.animatedLine}
                            style={{
                                background: isInverse
                                    ? vars.colors.controlActivatedInverse
                                    : vars.colors.controlActivated,
                            }}
                        />
                    </div>
                </ResponsiveLayout>
            </div>
            {renderPanel?.({
                selectedIndex,
                panelProps: {
                    role: 'tabpanel',
                    tabIndex: 0,
                    id: getPanelId(selectedIndex) as string,
                    'aria-labelledby': `${id}-tab-${selectedIndex}`,
                },
            })}
        </>
    );
};

export default Tabs;
