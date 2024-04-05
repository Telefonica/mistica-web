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
import {Boxed} from './boxed';
import {useIsInverseVariant} from './theme-variant-context';
import {useAriaId} from './hooks';
import {CSSTransition} from 'react-transition-group';
import {isRunningAcceptanceTest} from './utils/platform';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes, TrackingEvent} from './utils/types';
import type {TouchableElement} from './touchable';

const ACCORDION_TRANSITION_DURATION_IN_MS = 400;

type AccordionContextType = {
    index: Array<number>;
    toogle: (item: number) => void;
};
const AccordionContext = React.createContext<AccordionContextType>({
    index: [],
    toogle: () => {},
});
export const useAccordionContext = (): AccordionContextType => React.useContext(AccordionContext);

interface AccordionItemContentProps {
    children?: void;
    title: string;
    titleAs?: string;
    subtitle?: string;
    asset?: React.ReactNode;
    content: React.ReactNode;
    onToogle?: (value: boolean) => void;
    dataAttributes?: DataAttributes;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
}

const useAccordionState = ({
    value,
    defaultValue,
    onChange,
    singleOpen,
}: {
    value?: number | Array<number>;
    defaultValue?: number | Array<number>;
    onChange?: (item: number, value: boolean) => void;
    singleOpen?: boolean;
}): [Array<number>, (value: number) => void] => {
    const isControlledByParent = value !== undefined;

    const getValueAsList = (value?: number | Array<number>) => {
        return value === undefined ? [] : typeof value === 'number' ? [value] : value;
    };

    const [index, setIndex] = React.useState<Array<number>>(getValueAsList(defaultValue));

    React.useEffect(() => {
        if (index.length > 1 && singleOpen) {
            index.splice(1);
            setIndex([...index]);
        }
    }, [singleOpen, index]);

    const updateIndexOnToogle = (item: number, index?: Array<number>) => {
        if (!index) {
            return [item];
        }

        const valueIndex = index.indexOf(item);
        if (valueIndex === -1) {
            if (singleOpen) {
                index = [item];
            } else {
                index.push(item);
            }
        } else {
            index.splice(valueIndex, 1);
        }

        return [...index];
    };

    const toggle = (item: number) => {
        if (!isControlledByParent) {
            setIndex(updateIndexOnToogle(item, index));
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
    ({content, dataAttributes, trackingEvent, ...props}, ref) => {
        const panelContainerRef = React.useRef<HTMLDivElement | null>(null);
        const itemRef = React.useRef<HTMLDivElement | null>(null);
        const {index, toogle} = useAccordionContext();
        const isInverse = useIsInverseVariant();
        const labelId = useAriaId();
        const panelId = useAriaId();

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
                        if (itemIndex !== undefined) toogle(itemIndex);
                    }}
                    trackingEvent={trackingEvent}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                >
                    <Box paddingX={16}>
                        <HeaderContent
                            labelId={labelId}
                            type="custom"
                            {...props}
                            right={
                                <div className={styles.chevronContainer}>
                                    <IconChevron
                                        size={24}
                                        transitionDuration={400}
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
                            }
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
    ({dataAttributes, ...props}, ref) => (
        <AccordionItemContent
            {...props}
            ref={ref}
            dataAttributes={{'component-name': 'AccordionItem', ...dataAttributes}}
        />
    )
);

type AccordionBaseProps = {
    children: React.ReactNode;
    dataAttributes?: DataAttributes;
    onChange?: (index: number, value: boolean) => void;
};

type SingleOpenProps = {
    singleOpen: true;
    index?: number;
    defaultIndex?: number;
};

type MultipleOpenProps = {
    singleOpen?: false;
    index?: number | Array<number>;
    defaultIndex?: number | Array<number>;
};

type AccordionProps = AccordionBaseProps & ExclusifyUnion<SingleOpenProps | MultipleOpenProps>;

export const Accordion: React.FC<AccordionProps> = ({
    children,
    dataAttributes,
    index,
    defaultIndex,
    onChange,
    singleOpen,
}) => {
    const [indexList, toogle] = useAccordionState({
        value: index,
        defaultValue: defaultIndex,
        onChange,
        singleOpen,
    });
    const lastIndex = React.Children.count(children) - 1;

    return (
        <AccordionContext.Provider value={{index: indexList, toogle}}>
            <div {...getPrefixedDataAttributes({...dataAttributes, accordion: true}, 'Accordion')}>
                {React.Children.toArray(children)
                    .filter(Boolean)
                    .map((child, index) => (
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
        <Boxed
            isInverse={isInverse}
            ref={ref}
            dataAttributes={{'component-name': 'BoxedAccordionItem', ...dataAttributes}}
        >
            <AccordionItemContent {...props} />
        </Boxed>
    )
);

export const BoxedAccordion: React.FC<AccordionProps> = ({
    children,
    dataAttributes,
    index,
    defaultIndex,
    onChange,
    singleOpen,
}) => {
    const [indexList, toogle] = useAccordionState({
        value: index,
        defaultValue: defaultIndex,
        onChange,
        singleOpen,
    });

    return (
        <AccordionContext.Provider value={{index: indexList, toogle}}>
            <Stack
                space={16}
                dataAttributes={{'component-name': 'BoxedAccordion', accordion: true, ...dataAttributes}}
            >
                {children}
            </Stack>
        </AccordionContext.Provider>
    );
};
