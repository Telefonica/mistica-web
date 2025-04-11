'use client';
import * as React from 'react';
import {Content as HeaderContent} from './list';
import IconChevron from './icons/icon-chevron';
import Box from './box';
import * as styles from './accordion.css';
import Stack from './stack';
import {BaseTouchable} from './touchable';
import classNames from 'classnames';
import {vars as skinVars} from './skins/skin-contract.css';
import {getPrefixedDataAttributes} from './utils/dom';
import Divider from './divider';
import {InternalBoxed} from './boxed';
import {useIsInverseOrMediaVariant} from './theme-variant-context';
import {CSSTransition} from 'react-transition-group';
import {isRunningAcceptanceTest} from './utils/platform';
import Inline from './inline';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes, TrackingEvent} from './utils/types';
import type {TouchableElement} from './touchable';

const ACCORDION_TRANSITION_DURATION_IN_MS = 400;

type AccordionContextType = {
    index: ReadonlyArray<number>;
    toggle: (item: number) => void;
};

const AccordionContext = React.createContext<AccordionContextType>({
    index: [],
    toggle: () => {},
});

const useAccordionContext = (): AccordionContextType => React.useContext(AccordionContext);

interface AccordionItemContentProps {
    children?: void;
    title: string;
    titleAs?: string;
    subtitle?: string;
    asset?: React.ReactNode;
    content: React.ReactNode;
    dataAttributes?: DataAttributes;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    role?: string;
    detail?: string;
    right?: React.ReactNode;
    'aria-label'?: string;
    'aria-labelledby'?: string;
}

const useAccordionState = ({
    value,
    defaultValue,
    onChange,
    singleOpen,
}: {
    value?: number | ReadonlyArray<number>;
    defaultValue?: number | ReadonlyArray<number>;
    onChange?: (item: number, value: boolean) => void;
    singleOpen?: boolean;
}): [ReadonlyArray<number>, (value: number) => void] => {
    const isControlledByParent = value !== undefined;

    const getValueAsList = (value?: number | ReadonlyArray<number>) => {
        return value === undefined ? [] : typeof value === 'number' ? [value] : value;
    };

    const [index, setIndex] = React.useState<ReadonlyArray<number>>(getValueAsList(defaultValue));

    React.useEffect(() => {
        if (index.length > 1 && singleOpen) {
            const newIndex = [...index];
            newIndex.splice(1);
            setIndex(newIndex);
        }
    }, [singleOpen, index]);

    const updateIndexOnToggle = (item: number, index?: ReadonlyArray<number>) => {
        if (!index) {
            return [item];
        }

        const valueIndex = index.indexOf(item);
        let newIndex = [...index];
        if (valueIndex === -1) {
            if (singleOpen) {
                newIndex = [item];
            } else {
                newIndex.push(item);
            }
        } else {
            newIndex.splice(valueIndex, 1);
        }

        return newIndex;
    };

    const toggle = (item: number) => {
        if (!isControlledByParent) {
            setIndex(updateIndexOnToggle(item, index));
        }
        if (onChange) {
            const currentItemValue = (isControlledByParent ? getValueAsList(value) : index).includes(item);
            onChange(item, !currentItemValue);
        }
    };

    if (isControlledByParent) {
        return [getValueAsList(value), toggle];
    }

    return [index, toggle];
};

const getAccordionItemIndex = (element: Element | null) => {
    const accordionAncestor = element?.closest('[data-accordion]');
    if (!accordionAncestor) return undefined;

    return Array.from(accordionAncestor.querySelectorAll('[data-accordion-item]'))
        .filter((e) => e.closest('[data-accordion]') === accordionAncestor)
        .findIndex((e) => e === element);
};

const AccordionItemContent = React.forwardRef<TouchableElement, AccordionItemContentProps>(
    (
        {
            content,
            dataAttributes,
            trackingEvent,
            right,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
            ...props
        },
        ref
    ) => {
        const panelContainerRef = React.useRef<HTMLDivElement | null>(null);
        const itemRef = React.useRef<HTMLDivElement | null>(null);
        const {index, toggle} = useAccordionContext();
        const isInverse = useIsInverseOrMediaVariant();
        const labelId = React.useId();
        const panelId = React.useId();

        const [itemIndex, setItemIndex] = React.useState<number>();
        const isOpen = itemIndex !== undefined && index?.includes(itemIndex);

        React.useEffect(() => {
            setItemIndex(getAccordionItemIndex(itemRef.current));
        }, []);

        return (
            <div ref={itemRef} {...getPrefixedDataAttributes({...dataAttributes, 'accordion-item': true})}>
                <BaseTouchable
                    ref={ref}
                    className={classNames(
                        styles.itemContent,
                        isInverse ? styles.touchableBackgroundInverse : styles.touchableBackground
                    )}
                    onPress={() => {
                        if (itemIndex !== undefined) toggle(itemIndex);
                    }}
                    trackingEvent={trackingEvent}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledby}
                >
                    <Box paddingX={16}>
                        <HeaderContent
                            labelId={labelId}
                            {...props}
                            right={({centerY}) => (
                                <Inline
                                    space={4}
                                    alignItems={centerY ? 'center' : undefined}
                                    className={styles.rightContentContainer}
                                >
                                    {right}
                                    <div className={styles.chevronContainer}>
                                        <IconChevron
                                            size={20}
                                            transitionDuration={ACCORDION_TRANSITION_DURATION_IN_MS}
                                            direction={isOpen ? 'up' : 'down'}
                                            color={
                                                isInverse
                                                    ? skinVars.colors.inverse
                                                    : isOpen
                                                      ? skinVars.colors.neutralHigh
                                                      : skinVars.colors.neutralMedium
                                            }
                                        />
                                    </div>
                                </Inline>
                            )}
                        />
                    </Box>
                </BaseTouchable>
                <CSSTransition
                    in={isOpen}
                    timeout={isRunningAcceptanceTest() ? 0 : ACCORDION_TRANSITION_DURATION_IN_MS}
                    nodeRef={panelContainerRef}
                    classNames={styles.panelTransitionClasses}
                    mountOnEnter
                    unmountOnExit
                >
                    <div className={styles.panelContainer} ref={panelContainerRef}>
                        <div className={styles.panel} role="region" aria-labelledby={labelId} id={panelId}>
                            <Box paddingX={16} paddingBottom={16}>
                                {content}
                            </Box>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        );
    }
);

export const AccordionItem = React.forwardRef<TouchableElement, AccordionItemContentProps>(
    ({dataAttributes, role, ...props}, ref) => (
        <div role={role} className={styles.accordionItem}>
            <AccordionItemContent
                {...props}
                ref={ref}
                dataAttributes={{'component-name': 'AccordionItem', ...dataAttributes}}
            />
        </div>
    )
);

type AccordionBaseProps = {
    children: React.ReactNode;
    dataAttributes?: DataAttributes;
    onChange?: (index: number, value: boolean) => void;
    role?: string;
};

type SingleOpenProps = {
    singleOpen: true;
    index?: number;
    defaultIndex?: number;
};

type MultipleOpenProps = {
    singleOpen?: false;
    index?: number | ReadonlyArray<number>;
    defaultIndex?: number | ReadonlyArray<number>;
};

type AccordionProps = AccordionBaseProps & ExclusifyUnion<SingleOpenProps | MultipleOpenProps>;

export const Accordion = ({
    children,
    dataAttributes,
    index,
    defaultIndex,
    onChange,
    singleOpen,
    role,
}: AccordionProps): JSX.Element => {
    const [indexList, toggle] = useAccordionState({
        value: index,
        defaultValue: defaultIndex,
        onChange,
        singleOpen,
    });
    const childrenContent = React.Children.toArray(children).filter(Boolean);
    const lastIndex = childrenContent.length - 1;

    return (
        <AccordionContext.Provider value={{index: indexList, toggle}}>
            <div
                role={role}
                {...getPrefixedDataAttributes({...dataAttributes, accordion: true}, 'Accordion')}
            >
                {childrenContent.map((child, index) => (
                    <React.Fragment key={index}>
                        {child}
                        {index < lastIndex && (
                            <Box paddingX={16}>
                                <Divider />
                            </Box>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </AccordionContext.Provider>
    );
};

interface BoxedAccordionItemProps extends AccordionItemContentProps {
    isInverse?: boolean;
}

export const BoxedAccordionItem = React.forwardRef<HTMLDivElement, BoxedAccordionItemProps>(
    ({dataAttributes, isInverse, ...props}, ref) => (
        <InternalBoxed
            overflow="visible"
            className={styles.boxed}
            variant={isInverse ? 'inverse' : 'default'}
            ref={ref}
            dataAttributes={{'component-name': 'BoxedAccordionItem', ...dataAttributes}}
        >
            <AccordionItemContent {...props} />
        </InternalBoxed>
    )
);

export const BoxedAccordion = ({
    children,
    dataAttributes,
    index,
    defaultIndex,
    onChange,
    singleOpen,
    role,
}: AccordionProps): JSX.Element => {
    const [indexList, toggle] = useAccordionState({
        value: index,
        defaultValue: defaultIndex,
        onChange,
        singleOpen,
    });

    return (
        <AccordionContext.Provider value={{index: indexList, toggle}}>
            <Stack
                space={16}
                role={role}
                dataAttributes={{'component-name': 'BoxedAccordion', accordion: true, ...dataAttributes}}
            >
                {children}
            </Stack>
        </AccordionContext.Provider>
    );
};
