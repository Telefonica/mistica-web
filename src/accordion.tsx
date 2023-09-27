import * as React from 'react';
import {Content} from './list';
import IconChevron from './icons/icon-chevron';
import Box from './box';
import * as styles from './accordion.css';
import Stack from './stack';
import {BaseTouchable} from './touchable';
import classNames from 'classnames';
import {vars as skinVars} from './skins/skin-contract.css';
import {Text3} from './text';
import {getPrefixedDataAttributes} from './utils/dom';
import Divider from './divider';
import {Boxed} from './boxed';
import {useIsInverseVariant} from './theme-variant-context';

import type {DataAttributes, TrackingEvent} from './utils/types';
import type {TouchableElement} from './touchable';

interface AccordionContentProps {
    children?: void;
    title: string;
    subtitle?: string;
    asset?: React.ReactNode;
    extra?: React.ReactNode;
    content: string | Array<string>;
    isOpen?: boolean;
    isInitialOpen?: boolean;
    onToogle?: (value: boolean) => void;
    dataAttributes?: DataAttributes;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
}

const useAccordionState = ({
    value,
    defaultValue,
    onChange,
}: {
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (value: boolean) => void;
}): [boolean, () => void] => {
    const isControlledByParent = value !== undefined;
    const [isOpen, setIsOpen] = React.useState<boolean>(defaultValue !== undefined ? defaultValue : !!value);

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

const AccordionContent = React.forwardRef<TouchableElement, AccordionContentProps>(
    (
        {extra, content, isOpen: openValue, isInitialOpen, onToogle, dataAttributes, trackingEvent, ...props},
        ref
    ) => {
        const [isOpen, toggle] = useAccordionState({
            value: openValue,
            defaultValue: isInitialOpen,
            onChange: onToogle,
        });
        const isInverse = useIsInverseVariant();

        const contentParagraphs = !content ? [] : typeof content === 'string' ? [content] : content;

        return (
            <div {...getPrefixedDataAttributes(dataAttributes)}>
                <BaseTouchable
                    ref={ref}
                    className={classNames(styles.accordionContent, {
                        [styles.touchableBackground]: !isInverse,
                        [styles.touchableBackgroundInverse]: isInverse,
                    })}
                    onPress={toggle}
                    trackingEvent={trackingEvent}
                >
                    <Box paddingX={16}>
                        <Content
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
                    <div className={styles.panelContent}>
                        <Box paddingX={16} paddingBottom={16}>
                            <Stack space={16}>
                                <Text3 as="div" regular color={skinVars.colors.textSecondary}>
                                    {contentParagraphs.map((text, index) => (
                                        <p
                                            key={index}
                                            style={{
                                                margin: 0,
                                                marginBottom:
                                                    index < contentParagraphs.length - 1 ? '1em' : undefined,
                                            }}
                                        >
                                            {text}
                                        </p>
                                    ))}
                                </Text3>

                                {extra}
                            </Stack>
                        </Box>
                    </div>
                </div>
            </div>
        );
    }
);

export const Accordion = React.forwardRef<TouchableElement, AccordionContentProps>(
    ({dataAttributes, ...props}, ref) => (
        <AccordionContent
            {...props}
            ref={ref}
            dataAttributes={{'component-name': 'Accordion', ...dataAttributes}}
        />
    )
);

type AccordionListProps = {
    children: React.ReactNode;
    ariaLabelledby?: string;
    role?: string;
    noLastDivider?: boolean;
    dataAttributes?: DataAttributes;
};

export const AccordionList: React.FC<AccordionListProps> = ({
    children,
    ariaLabelledby,
    role,
    dataAttributes,
    noLastDivider,
}) => {
    const lastIndex = React.Children.count(children) - 1;
    const showLastDivider = !noLastDivider;

    return (
        <div
            role={role}
            aria-labelledby={ariaLabelledby}
            {...getPrefixedDataAttributes(dataAttributes, 'AccordionList')}
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
    );
};

interface BoxedAccordionProps extends AccordionContentProps {
    isInverse?: boolean;
}

export const BoxedAccordion = React.forwardRef<HTMLDivElement, BoxedAccordionProps>(
    ({dataAttributes, ...props}, ref) => (
        <Boxed
            isInverse={props.isInverse}
            ref={ref}
            dataAttributes={{'component-name': 'BoxedAccordion', ...dataAttributes}}
        >
            <AccordionContent {...props} />
        </Boxed>
    )
);

type BoxedAccordionListProps = {
    children: React.ReactNode;
    ariaLabelledby?: string;
    role?: string;
    dataAttributes?: DataAttributes;
};

export const BoxedAccordionList: React.FC<BoxedAccordionListProps> = ({
    children,
    ariaLabelledby,
    role,
    dataAttributes,
}) => (
    <Stack
        space={16}
        role={role}
        aria-labelledby={ariaLabelledby}
        dataAttributes={{'component-name': 'BoxedAccordionList', ...dataAttributes}}
    >
        {children}
    </Stack>
);

type GroupedAccordionListProps = {
    children: React.ReactNode;
    ariaLabelledby?: string;
    role?: string;
    dataAttributes?: DataAttributes;
    isInverse?: boolean;
};

export const GroupedAccordionList: React.FC<GroupedAccordionListProps> = ({
    children,
    ariaLabelledby,
    role,
    dataAttributes,
    isInverse,
}) => {
    const lastIndex = React.Children.count(children) - 1;
    return (
        <Boxed
            isInverse={isInverse}
            dataAttributes={{'component-name': 'GroupedAccordionList', ...dataAttributes}}
            role={role}
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
    );
};
