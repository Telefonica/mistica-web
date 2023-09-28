import * as React from 'react';
import {Content} from './list';
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

import type {DataAttributes, TrackingEvent} from './utils/types';
import type {TouchableElement} from './touchable';

type AccordionContextType = {
    index?: Array<number>;
    defaultIndex?: Array<number>;
    onChange?: (index: number, value: boolean) => void;
};
const AccordionContext = React.createContext<AccordionContextType>({
    index: undefined,
    defaultIndex: undefined,
    onChange: () => {},
});
export const useAccordionContext = (): AccordionContextType => React.useContext(AccordionContext);

interface AccordionItemContentProps {
    children?: void;
    title: string;
    subtitle?: string;
    asset?: React.ReactNode;
    content: React.ReactNode;
    isOpen?: boolean;
    isInitialOpen?: boolean;
    onToogle?: (value: boolean) => void;
    dataAttributes?: DataAttributes;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
}

const useAccordionItemState = ({
    value,
    defaultValue,
    onChange,
}: {
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (value: boolean) => void;
}): [boolean, () => void] => {
    const isControlledByParent = value !== undefined;
    const [isOpen, setIsOpen] = React.useState<boolean>(!!defaultValue);

    React.useEffect(() => setIsOpen(!!defaultValue), [defaultValue]);

    const toggle = () => {
        if (!isControlledByParent) {
            setIsOpen(!isOpen);
        }
        if (onChange) {
            onChange(isControlledByParent ? !value : !isOpen);
        }
    };

    if (isControlledByParent) {
        return [!!value, toggle];
    }

    return [isOpen, toggle];
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
        const itemRef = React.useRef<HTMLDivElement | null>(null);
        const labelId = useAriaId();
        const panelId = useAriaId();
        const {index, defaultIndex, onChange} = useAccordionContext();
        const isInverse = useIsInverseVariant();

        const itemIndex = getAccordionItemIndex(itemRef.current);

        const [isOpen, toggle] = useAccordionItemState({
            value: itemIndex !== undefined ? index?.includes(itemIndex) : undefined,
            defaultValue: itemIndex !== undefined ? defaultIndex?.includes(itemIndex) : undefined,
            onChange: (value) => {
                if (itemIndex) {
                    onChange?.(itemIndex, value);
                }
            },
        });

        return (
            <div ref={itemRef} {...getPrefixedDataAttributes({...dataAttributes, 'accordion-item': ''})}>
                <BaseTouchable
                    ref={ref}
                    className={classNames(styles.itemContent, {
                        [styles.touchableBackground]: !isInverse,
                        [styles.touchableBackgroundInverse]: isInverse,
                    })}
                    onPress={toggle}
                    trackingEvent={trackingEvent}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                >
                    <Box paddingX={16}>
                        <Content
                            labelId={labelId}
                            type="custom"
                            {...props}
                            right={
                                <div className={styles.chevronContainer}>
                                    <IconChevron
                                        size={24}
                                        className={isOpen ? styles.openChevron : styles.closeChevron}
                                        color={
                                            isInverse
                                                ? skinVars.colors.inverse
                                                : skinVars.colors.neutralMedium
                                        }
                                    />
                                </div>
                            }
                        />
                    </Box>
                </BaseTouchable>
                <div className={isOpen ? styles.openPanel : styles.closePanel}>
                    <div className={styles.panelContent} role="region" aria-labelledby={labelId} id={panelId}>
                        <Box paddingX={16} paddingBottom={16}>
                            {content}
                        </Box>
                    </div>
                </div>
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

type AccordionProps = {
    children: React.ReactNode;
    ariaLabelledby?: string;
    noLastDivider?: boolean;
    dataAttributes?: DataAttributes;
    index?: number | Array<number>;
    defaultIndex?: number | Array<number>;
    onChange?: (index: number, value: boolean) => void;
};

export const Accordion: React.FC<AccordionProps> = ({
    children,
    ariaLabelledby,
    dataAttributes,
    noLastDivider,
    index,
    defaultIndex,
    onChange,
}) => {
    const lastIndex = React.Children.count(children) - 1;
    const showLastDivider = !noLastDivider;

    const indexList = index === undefined ? undefined : typeof index === 'number' ? [index] : index;
    const defaultIndexList =
        defaultIndex === undefined
            ? undefined
            : typeof defaultIndex === 'number'
            ? [defaultIndex]
            : defaultIndex;

    return (
        <AccordionContext.Provider value={{index: indexList, defaultIndex: defaultIndexList, onChange}}>
            <div
                aria-labelledby={ariaLabelledby}
                {...getPrefixedDataAttributes({...dataAttributes, accordion: ''}, 'Accordion')}
            >
                {React.Children.toArray(children)
                    .filter(Boolean)
                    .map((child, index) => (
                        <React.Fragment key={index}>
                            {child}
                            {(index < lastIndex || showLastDivider) && (
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

type BoxedAccordionProps = {
    children: React.ReactNode;
    ariaLabelledby?: string;
    dataAttributes?: DataAttributes;
    index?: number | Array<number>;
    defaultIndex?: number | Array<number>;
    onChange?: (index: number, value: boolean) => void;
};

export const BoxedAccordion: React.FC<BoxedAccordionProps> = ({
    children,
    ariaLabelledby,
    dataAttributes,
    index,
    defaultIndex,
    onChange,
}) => {
    const indexList = index === undefined ? undefined : typeof index === 'number' ? [index] : index;
    const defaultIndexList =
        defaultIndex === undefined
            ? undefined
            : typeof defaultIndex === 'number'
            ? [defaultIndex]
            : defaultIndex;

    return (
        <AccordionContext.Provider value={{index: indexList, defaultIndex: defaultIndexList, onChange}}>
            <Stack
                space={16}
                aria-labelledby={ariaLabelledby}
                dataAttributes={{'component-name': 'BoxedAccordion', accordion: '', ...dataAttributes}}
            >
                {children}
            </Stack>
        </AccordionContext.Provider>
    );
};

type GroupedAccordionProps = {
    children: React.ReactNode;
    ariaLabelledby?: string;
    dataAttributes?: DataAttributes;
    isInverse?: boolean;
    index?: number | Array<number>;
    defaultIndex?: number | Array<number>;
    onChange?: (index: number, value: boolean) => void;
};

export const GroupedAccordion: React.FC<GroupedAccordionProps> = ({
    children,
    ariaLabelledby,
    dataAttributes,
    isInverse,
    index,
    defaultIndex,
    onChange,
}) => {
    const lastIndex = React.Children.count(children) - 1;

    const indexList = index === undefined ? undefined : typeof index === 'number' ? [index] : index;
    const defaultIndexList =
        defaultIndex === undefined
            ? undefined
            : typeof defaultIndex === 'number'
            ? [defaultIndex]
            : defaultIndex;

    return (
        <AccordionContext.Provider value={{index: indexList, defaultIndex: defaultIndexList, onChange}}>
            <Boxed
                isInverse={isInverse}
                dataAttributes={{'component-name': 'GroupedAccordion', accordion: '', ...dataAttributes}}
                aria-labelledby={ariaLabelledby}
            >
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
            </Boxed>
        </AccordionContext.Provider>
    );
};
