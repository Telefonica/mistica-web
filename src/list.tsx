/*
 * Specs:
 *   - Structure: https://www.figma.com/file/Be8QB9onmHunKCCAkIBAVr/Lists-Component-Specs?node-id=0%3A2
 *   - Behavior: https://www.figma.com/file/Be8QB9onmHunKCCAkIBAVr/Lists-Component-Specs?node-id=0%3A608
 *   - Assets: https://www.figma.com/file/Be8QB9onmHunKCCAkIBAVr/Lists-Component-Specs?node-id=0%3A1
 */

'use client';
import * as React from 'react';
import classNames from 'classnames';
import {BaseTouchable} from './touchable';
import {Text3, Text2, Text1} from './text';
import Box from './box';
import Stack from './stack';
import Badge from './badge';
import {useAriaId} from './hooks';
import {useIsInverseVariant} from './theme-variant-context';
import IconChevron from './icons/icon-chevron';
import Switch from './switch-component';
import RadioButton, {useRadioContext} from './radio-button';
import Checkbox from './checkbox';
import {Boxed} from './boxed';
import Divider from './divider';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './list.css';
import {vars} from './skins/skin-contract.css';

import type {TouchableElement} from './touchable';
import type {DataAttributes, TrackingEvent} from './utils/types';
import type {ExclusifyUnion} from './utils/utility-types';

interface CommonProps {
    children?: void; // no children allowed
    headline?: string | React.ReactNode;
    title: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string | null;
    descriptionLinesMax?: number;
    detail?: string;
    asset?: React.ReactNode;
    badge?: boolean | number;
    role?: string;
    extra?: React.ReactNode;
    dataAttributes?: DataAttributes;
    disabled?: boolean;
    withChevron?: boolean;
}

type Right = (({centerY}: {centerY: boolean}) => React.ReactNode) | React.ReactNode;

const renderRight = (right: Right, centerY: boolean) => {
    if (typeof right === 'function') return right?.({centerY});

    return centerY ? (
        <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>{right}</div>
    ) : (
        right
    );
};

interface ContentProps extends CommonProps {
    isClickable?: boolean;
    type?: 'chevron' | 'basic' | 'custom' | 'control';
    right?: Right;
    /** This id is to link the title with the related control */
    labelId?: string;
}

export const Content: React.FC<ContentProps> = ({
    withChevron,
    headline,
    title,
    titleLinesMax,
    subtitle,
    subtitleLinesMax,
    description,
    descriptionLinesMax,
    detail,
    asset,
    type = 'basic',
    badge,
    right,
    extra,
    labelId,
    disabled,
}) => {
    const isInverse = useIsInverseVariant();
    const numTextLines = [headline, title, subtitle, description, extra].filter(Boolean).length;
    const centerY = numTextLines === 1;

    const renderBadge = () => {
        if (!badge) {
            return null;
        }
        return (
            <Box paddingLeft={16}>
                <div className={classNames(styles.center, styles.badge, {[styles.disabled]: disabled})}>
                    {badge === true ? <Badge /> : <Badge value={badge} />}
                </div>
            </Box>
        );
    };
    return (
        <Box paddingY={16} className={styles.content}>
            {asset && (
                <Box
                    paddingRight={16}
                    className={classNames({[styles.center]: centerY, [styles.disabled]: disabled})}
                >
                    <div className={styles.asset}>{asset}</div>
                </Box>
            )}
            <div
                className={classNames(styles.rowBody, {[styles.disabled]: disabled})}
                style={{justifyContent: centerY ? 'center' : 'flex-start'}}
            >
                <Stack space={4}>
                    {headline && (
                        <Text1 regular color={vars.colors.textPrimary} hyphens="auto">
                            {headline}
                        </Text1>
                    )}
                    <Stack space={2}>
                        <Text3
                            regular
                            color={vars.colors.textPrimary}
                            truncate={titleLinesMax}
                            id={labelId}
                            hyphens="auto"
                        >
                            {title}
                        </Text3>
                        {subtitle && (
                            <Text2
                                regular
                                color={vars.colors.textSecondary}
                                truncate={subtitleLinesMax}
                                hyphens="auto"
                            >
                                {subtitle}
                            </Text2>
                        )}
                        {description && (
                            <Text2
                                regular
                                color={vars.colors.textSecondary}
                                truncate={descriptionLinesMax}
                                hyphens="auto"
                            >
                                {description}
                            </Text2>
                        )}
                        {extra}
                    </Stack>
                </Stack>
            </div>

            {renderBadge()}

            <div
                className={classNames({
                    [styles.right]: !!detail || type !== 'basic',
                    [styles.rightRestrictedWidth]: !!detail,
                })}
            >
                {detail && (
                    <div className={classNames(styles.center, styles.detail, {[styles.disabled]: disabled})}>
                        <Text2 regular color={vars.colors.textSecondary} hyphens="auto">
                            {detail}
                        </Text2>
                    </div>
                )}

                {type === 'control' && (
                    <div className={classNames({[styles.detailRight]: !!detail})}>
                        {renderRight(right, centerY)}
                    </div>
                )}

                {type === 'custom' && (
                    <div
                        className={classNames({[styles.detailRight]: !!detail, [styles.disabled]: disabled})}
                    >
                        {renderRight(right, centerY)}
                    </div>
                )}

                {(type === 'chevron' || (type === 'custom' && withChevron)) && (
                    <Box
                        paddingLeft={detail || type === 'custom' ? 4 : 0}
                        className={classNames(styles.center, {[styles.disabled]: disabled})}
                    >
                        <IconChevron
                            color={isInverse ? vars.colors.inverse : vars.colors.neutralMedium}
                            direction="right"
                        />
                    </Box>
                )}
            </div>
        </Box>
    );
};

type ControlProps = {
    name?: string;
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (checked: boolean) => void;
};

interface BasicRowContentProps extends CommonProps {
    right?: Right;
}

interface SwitchRowContentProps extends CommonProps {
    onPress?: (() => void) | undefined;

    switch: ControlProps | undefined;
}

interface CheckboxRowContentProps extends CommonProps {
    onPress?: (() => void) | undefined;

    checkbox: ControlProps | undefined;
}

interface RadioRowContentProps extends CommonProps {
    onPress?: (() => void) | undefined;

    radioValue: string;
}

interface HrefRowContentProps extends CommonProps {
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    href: string | undefined;
    newTab?: boolean;
    right?: Right;
}

interface ToRowContentProps extends CommonProps {
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    to: string | undefined;
    fullPageOnWebView?: boolean;
    replace?: boolean;
    right?: Right;
}

interface OnPressRowContentProps extends CommonProps {
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    onPress: (() => void) | undefined;
    right?: Right;
}

type RowContentProps = ExclusifyUnion<
    | BasicRowContentProps
    | SwitchRowContentProps
    | RadioRowContentProps
    | CheckboxRowContentProps
    | HrefRowContentProps
    | ToRowContentProps
    | OnPressRowContentProps
>;

const useControlState = ({
    value,
    defaultValue,
    onChange,
}: {
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (isChecked: boolean) => void;
}): [boolean, () => void] => {
    const isControlledByParent = value !== undefined;
    const [isChecked, setIsChecked] = React.useState<boolean>(!!defaultValue);

    const toggle = () => {
        if (!isControlledByParent) {
            setIsChecked(!isChecked);
        }
        if (onChange) {
            onChange(isControlledByParent ? !value : !isChecked);
        }
    };

    if (isControlledByParent) {
        return [!!value, toggle];
    }

    return [isChecked, toggle];
};

const areSwitchRowContentProps = (obj: any): obj is SwitchRowContentProps => {
    return obj.switch !== undefined;
};

const areCheckboxRowContentProps = (obj: any): obj is CheckboxRowContentProps => {
    return obj.checkbox !== undefined;
};

const areRadioRowContentProps = (obj: any): obj is RadioRowContentProps => {
    return obj.radioValue !== undefined;
};

const RowContent = React.forwardRef<TouchableElement, RowContentProps>((props, ref) => {
    const titleId = useAriaId();
    const isInverse = useIsInverseVariant();
    const {
        asset,
        headline,
        title,
        titleLinesMax,
        subtitle,
        subtitleLinesMax,
        description,
        descriptionLinesMax,
        detail,
        badge,
        role,
        extra,
        dataAttributes,
    } = props;

    const radioContext = useRadioContext();
    const disabled = props.disabled || (props.radioValue !== undefined && radioContext.disabled);
    const hasHoverDefault = !disabled && !isInverse;
    const hasHoverInverse = !disabled && isInverse;

    const [isChecked, toggle] = useControlState(props.switch || props.checkbox || {});

    const renderContent = ({
        type,
        right,
        labelId,
    }: {
        type: ContentProps['type'];
        right?: ContentProps['right'];
        labelId?: string;
    }) => (
        <Content
            asset={asset}
            headline={headline}
            title={title}
            subtitle={subtitle}
            description={description}
            badge={badge}
            titleLinesMax={titleLinesMax}
            subtitleLinesMax={subtitleLinesMax}
            descriptionLinesMax={descriptionLinesMax}
            detail={detail}
            type={type}
            right={right}
            extra={extra}
            labelId={labelId}
            disabled={disabled}
            withChevron={!!props.onPress || !!props.href || !!props.to}
        />
    );

    const renderBaseTouchableContent = (
        props: HrefRowContentProps | ToRowContentProps | OnPressRowContentProps
    ) => {
        let type: ContentProps['type'] = 'chevron';

        if (props.right === null) {
            type = 'basic';
        }

        if (props.right) {
            type = 'custom';
        }

        return (
            <Box paddingX={16} ref={ref as React.Ref<HTMLDivElement>}>
                {renderContent({type, right: props.right})}
            </Box>
        );
    };

    if (
        props.onPress &&
        !areSwitchRowContentProps(props) &&
        !areCheckboxRowContentProps(props) &&
        !areRadioRowContentProps(props)
    ) {
        return (
            <BaseTouchable
                ref={ref}
                className={classNames(styles.rowContent, {
                    [styles.touchableBackground]: hasHoverDefault,
                    [styles.touchableBackgroundInverse]: hasHoverInverse,
                    [styles.pointer]: !disabled,
                })}
                trackingEvent={props.trackingEvent}
                onPress={props.onPress}
                role={role}
                dataAttributes={dataAttributes}
                disabled={disabled}
            >
                {renderBaseTouchableContent(props)}
            </BaseTouchable>
        );
    }

    if (props.to) {
        return (
            <BaseTouchable
                className={classNames(styles.rowContent, {
                    [styles.touchableBackground]: hasHoverDefault,
                    [styles.touchableBackgroundInverse]: hasHoverInverse,
                    [styles.pointer]: !disabled,
                })}
                trackingEvent={props.trackingEvent}
                to={props.to}
                fullPageOnWebView={props.fullPageOnWebView}
                role={role}
                dataAttributes={dataAttributes}
                disabled={disabled}
            >
                {renderBaseTouchableContent(props)}
            </BaseTouchable>
        );
    }

    if (props.href) {
        return (
            <BaseTouchable
                className={classNames(styles.rowContent, {
                    [styles.touchableBackground]: hasHoverDefault,
                    [styles.touchableBackgroundInverse]: hasHoverInverse,
                    [styles.pointer]: !disabled,
                })}
                trackingEvent={props.trackingEvent}
                href={props.href}
                newTab={props.newTab}
                role={role}
                dataAttributes={dataAttributes}
                disabled={disabled}
            >
                {renderBaseTouchableContent(props)}
            </BaseTouchable>
        );
    }

    const renderRowWithControl = (Control: typeof Switch | typeof Checkbox) => {
        const name = props.switch?.name ?? props.checkbox?.name ?? titleId;

        return props.onPress ? (
            <div className={styles.dualActionContainer}>
                <BaseTouchable
                    dataAttributes={dataAttributes}
                    disabled={disabled}
                    onPress={props.onPress}
                    role={role}
                    className={classNames(styles.dualActionLeft, {
                        [styles.touchableBackground]: hasHoverDefault,
                        [styles.touchableBackgroundInverse]: hasHoverInverse,
                    })}
                >
                    {renderContent({type: 'basic', labelId: titleId})}
                </BaseTouchable>
                <div className={styles.dualActionDivider} />

                <Control
                    disabled={disabled}
                    name={name}
                    checked={isChecked}
                    aria-labelledby={titleId}
                    onChange={toggle}
                    render={({controlElement}) => (
                        <div className={styles.dualActionRight}>{controlElement}</div>
                    )}
                />
            </div>
        ) : (
            <div
                className={classNames(styles.rowContent, {
                    [styles.touchableBackground]: hasHoverDefault,
                    [styles.touchableBackgroundInverse]: hasHoverInverse,
                    [styles.pointer]: !disabled,
                })}
            >
                <Control
                    disabled={disabled}
                    dataAttributes={dataAttributes}
                    name={name}
                    checked={isChecked}
                    onChange={toggle}
                    render={({controlElement, labelId}) => (
                        <Box paddingX={16} role={role}>
                            {renderContent({
                                labelId,
                                type: 'control',
                                right: () => <Stack space="around">{controlElement}</Stack>,
                            })}
                        </Box>
                    )}
                />
            </div>
        );
    };

    if (props.switch) {
        return renderRowWithControl(Switch);
    }

    if (props.checkbox) {
        return renderRowWithControl(Checkbox);
    }

    if (props.radioValue) {
        return props.onPress ? (
            <div className={styles.dualActionContainer}>
                <BaseTouchable
                    disabled={disabled}
                    onPress={props.onPress}
                    role={role}
                    className={classNames(styles.dualActionLeft, {
                        [styles.touchableBackground]: hasHoverDefault,
                        [styles.touchableBackgroundInverse]: hasHoverInverse,
                    })}
                >
                    {renderContent({type: 'basic', labelId: titleId})}
                </BaseTouchable>
                <div className={styles.dualActionDivider} />
                <RadioButton
                    dataAttributes={dataAttributes}
                    value={props.radioValue}
                    aria-labelledby={titleId}
                    render={({controlElement}) => (
                        <Stack space="around">
                            <Box paddingX={16}>{controlElement}</Box>
                        </Stack>
                    )}
                />
            </div>
        ) : (
            <div
                className={classNames(styles.rowContent, {
                    [styles.touchableBackground]: hasHoverDefault,
                    [styles.touchableBackgroundInverse]: hasHoverInverse,
                    [styles.pointer]: !disabled,
                })}
                role={role}
                ref={ref as React.Ref<HTMLDivElement>}
            >
                <RadioButton
                    dataAttributes={dataAttributes}
                    value={props.radioValue}
                    aria-labelledby={titleId}
                    render={({controlElement}) => (
                        <Box paddingX={16}>
                            {renderContent({
                                labelId: titleId,
                                type: 'control',
                                right: () => <Stack space="around">{controlElement}</Stack>,
                            })}
                        </Box>
                    )}
                />
            </div>
        );
    }

    return (
        <Box paddingX={16} className={styles.rowContent} role={role} dataAttributes={dataAttributes}>
            {props.right
                ? renderContent({type: 'custom', right: props.right})
                : renderContent({type: 'basic'})}
        </Box>
    );
});

export const Row = React.forwardRef<TouchableElement, RowContentProps>(({dataAttributes, ...props}, ref) => (
    <RowContent {...props} ref={ref} dataAttributes={{'component-name': 'Row', ...dataAttributes}} />
));

type RowListProps = {
    children: React.ReactNode;
    ariaLabelledby?: string;
    role?: string;
    noLastDivider?: boolean;
    dataAttributes?: DataAttributes;
};

export const RowList: React.FC<RowListProps> = ({
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
            {...getPrefixedDataAttributes(dataAttributes, 'RowList')}
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

interface CommonBoxedRowProps {
    isInverse?: boolean;
}
interface BasicBoxedRowProps extends BasicRowContentProps, CommonBoxedRowProps {}
interface SwitchBoxedRowProps extends SwitchRowContentProps, CommonBoxedRowProps {}
interface CheckboxBoxedRowProps extends CheckboxRowContentProps, CommonBoxedRowProps {}
interface RadioBoxedRowProps extends RadioRowContentProps, CommonBoxedRowProps {}
interface HrefBoxedRowProps extends HrefRowContentProps, CommonBoxedRowProps {}
interface ToBoxedRowProps extends ToRowContentProps, CommonBoxedRowProps {}
interface OnPressBoxedRowProps extends OnPressRowContentProps, CommonBoxedRowProps {}

type BoxedRowProps = ExclusifyUnion<
    | BasicBoxedRowProps
    | SwitchBoxedRowProps
    | RadioBoxedRowProps
    | CheckboxBoxedRowProps
    | HrefBoxedRowProps
    | ToBoxedRowProps
    | OnPressBoxedRowProps
>;

export const BoxedRow = React.forwardRef<HTMLDivElement, BoxedRowProps>(({dataAttributes, ...props}, ref) => (
    <Boxed
        isInverse={props.isInverse}
        ref={ref}
        dataAttributes={{'component-name': 'BoxedRow', ...dataAttributes}}
    >
        <RowContent {...props} />
    </Boxed>
));

type BoxedRowListProps = {
    children: React.ReactNode;
    ariaLabelledby?: string;
    role?: string;
    dataAttributes?: DataAttributes;
};

export const BoxedRowList: React.FC<BoxedRowListProps> = ({
    children,
    ariaLabelledby,
    role,
    dataAttributes,
}) => (
    <Stack
        space={16}
        role={role}
        aria-labelledby={ariaLabelledby}
        dataAttributes={{'component-name': 'BoxedRowList', ...dataAttributes}}
    >
        {children}
    </Stack>
);
