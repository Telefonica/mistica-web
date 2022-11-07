/*
 * Specs:
 *   - Structure: https://www.figma.com/file/Be8QB9onmHunKCCAkIBAVr/Lists-Component-Specs?node-id=0%3A2
 *   - Behavior: https://www.figma.com/file/Be8QB9onmHunKCCAkIBAVr/Lists-Component-Specs?node-id=0%3A608
 *   - Assets: https://www.figma.com/file/Be8QB9onmHunKCCAkIBAVr/Lists-Component-Specs?node-id=0%3A1
 */
import * as React from 'react';
import classNames from 'classnames';
import {createUseStyles} from './jss';
import Touchable from './touchable';
import {Text3, Text2, Text1} from './text';
import Box from './box';
import Stack from './stack';
import Badge from './badge';
import {useAriaId, useTheme} from './hooks';
import {useIsInverseVariant} from './theme-variant-context';
import IconChevron from './icons/icon-chevron';
import Switch from './switch-component';
import RadioButton, {useRadioContext} from './radio-button';
import Checkbox from './checkbox';
import {Boxed} from './boxed';
import Divider from './divider';
import {getPrefixedDataAttributes} from './utils/dom';

import type {TouchableElement} from './touchable';
import type {DataAttributes, TrackingEvent} from './utils/types';

const useStyles = createUseStyles(({colors, mq}) => ({
    disabled: {
        opacity: 0.5,
    },
    hover: {
        [mq.supportsHover]: {
            '&:hover': {
                background: ({isInverse, disabled}) =>
                    isInverse || disabled ? 'initial' : colors.backgroundAlternative,
            },
        },
    },
    rowContent: {
        width: '100%',
        cursor: ({disabled}) => (disabled ? 'default' : 'pointer'),
    },
    hoverDisabled: {
        cursor: () => 'initial',
        '&:hover': {
            background: () => 'none',
        },
    },
    content: {
        display: 'flex',
        width: '100%',
        minHeight: 72,
    },
    asset: {
        display: 'flex',
        flexShrink: 0,
        flexGrow: 0,
    },
    rowBody: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    center: {
        display: 'flex',
        alignItems: 'center',
    },
    badge: {
        justifyContent: 'center',
        minWidth: 16,
        height: '100%',
        flexShrink: 0,
    },
    control: {
        marginLeft: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexGrow: 0,
        flexShrink: 0,
    },
    right: {
        marginLeft: 16,
    },
    centeredControl: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
    },
    dualActionContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    dualActionLeft: {
        flexGrow: 1,
        padding: '0 16px',
    },
    dualActionRight: {
        padding: '0 16px',
        margin: '16px 0',
        borderLeft: `1px solid ${colors.divider}`,
        display: 'flex',
        alignItems: 'center',
        flexGrow: 0,
        width: 'auto',
        lineHeight: 0,
    },
}));

interface CommonProps {
    children?: void; // no children allowed
    headline?: string | React.ReactNode;
    title: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string | null;
    descriptionLinesMax?: number;
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

const Content: React.FC<ContentProps> = ({
    withChevron,
    headline,
    title,
    titleLinesMax,
    subtitle,
    subtitleLinesMax,
    description,
    descriptionLinesMax,
    asset,
    type = 'basic',
    badge,
    right,
    extra,
    labelId,
    disabled,
}) => {
    const isInverse = useIsInverseVariant();
    const classes = useStyles({isInverse});
    const {colors} = useTheme();
    const numTextLines = [headline, title, subtitle, description, extra].filter(Boolean).length;
    const centerY = numTextLines === 1;

    const renderBadge = () => {
        if (!badge) {
            return null;
        }
        return (
            <Box paddingLeft={16}>
                <div className={classNames(classes.center, classes.badge, {[classes.disabled]: disabled})}>
                    {badge === true ? <Badge /> : <Badge value={badge} />}
                </div>
            </Box>
        );
    };
    return (
        <Box paddingY={16} className={classes.content}>
            {asset && (
                <Box
                    paddingRight={16}
                    className={classNames({[classes.center]: centerY, [classes.disabled]: disabled})}
                >
                    <div className={classes.asset}>{asset}</div>
                </Box>
            )}
            <div
                className={classNames(classes.rowBody, {[classes.disabled]: disabled})}
                style={{justifyContent: centerY ? 'center' : 'flex-start'}}
            >
                <Stack space={4}>
                    {headline && (
                        <Text1 regular color={colors.textPrimary}>
                            {headline}
                        </Text1>
                    )}
                    <Stack space={2}>
                        <Text3 regular color={colors.textPrimary} truncate={titleLinesMax} id={labelId}>
                            {title}
                        </Text3>
                        {subtitle && (
                            <Text2 regular color={colors.textSecondary} truncate={subtitleLinesMax}>
                                {subtitle}
                            </Text2>
                        )}
                        {description && (
                            <Text2 regular color={colors.textSecondary} truncate={descriptionLinesMax}>
                                {description}
                            </Text2>
                        )}
                        {extra}
                    </Stack>
                </Stack>
            </div>
            {renderBadge()}
            {type === 'chevron' && (
                <Box paddingLeft={16} className={classNames(classes.center, {[classes.disabled]: disabled})}>
                    <IconChevron
                        color={isInverse ? colors.inverse : colors.neutralMedium}
                        direction="right"
                    />
                </Box>
            )}
            {type === 'control' && <div className={classes.right}>{renderRight(right, centerY)}</div>}
            {type === 'custom' && (
                <>
                    <div className={classNames(classes.right, {[classes.disabled]: disabled})}>
                        {renderRight(right, centerY)}
                    </div>
                    {withChevron && (
                        <Box
                            paddingLeft={4}
                            className={classNames(classes.center, {[classes.disabled]: disabled})}
                        >
                            <IconChevron
                                color={isInverse ? colors.inverse : colors.neutralMedium}
                                direction="right"
                            />
                        </Box>
                    )}
                </>
            )}
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
    href?: undefined;
    onPress?: undefined;
    to?: undefined;
    checkbox?: undefined;
    switch?: undefined;
    radioValue?: undefined;
    newTab?: undefined;
    fullPageOnWebView?: undefined;
    right?: Right;
}

interface SwitchRowContentProps extends CommonProps {
    href?: undefined;
    onPress?: () => void;
    to?: undefined;
    right?: undefined;
    checkbox?: undefined;
    radioValue?: undefined;
    newTab?: undefined;
    fullPageOnWebView?: undefined;

    switch: ControlProps;
}

interface CheckboxRowContentProps extends CommonProps {
    href?: undefined;
    onPress?: () => void;
    to?: undefined;
    right?: undefined;
    switch?: undefined;
    radioValue?: undefined;
    newTab?: undefined;
    fullPageOnWebView?: undefined;

    checkbox: ControlProps;
}

interface RadioRowContentProps extends CommonProps {
    href?: undefined;
    onPress?: undefined;
    to?: undefined;
    right?: undefined;
    switch?: undefined;
    checkbox?: undefined;
    newTab?: undefined;
    fullPageOnWebView?: undefined;

    radioValue: string;
}

interface HrefRowContentProps extends CommonProps {
    checkbox?: undefined;
    switch?: undefined;
    radioValue?: undefined;
    fullPageOnWebView?: undefined;

    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    href: string;
    newTab?: boolean;
    onPress?: undefined;
    to?: undefined;
    right?: Right;
}

interface ToRowContentProps extends CommonProps {
    checkbox?: undefined;
    switch?: undefined;
    radioValue?: undefined;
    newTab?: undefined;

    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    to: string;
    fullPageOnWebView?: boolean;
    replace?: boolean;
    href?: undefined;
    onPress?: undefined;
    right?: Right;
}

interface OnPressRowContentProps extends CommonProps {
    checkbox?: undefined;
    switch?: undefined;
    radioValue?: undefined;
    fullPageOnWebView?: undefined;

    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    onPress: () => void;
    href?: undefined;
    to?: undefined;
    right?: Right;
}

type RowContentProps =
    | BasicRowContentProps
    | SwitchRowContentProps
    | RadioRowContentProps
    | CheckboxRowContentProps
    | HrefRowContentProps
    | ToRowContentProps
    | OnPressRowContentProps;

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
        badge,
        role,
        extra,
        dataAttributes,
    } = props;

    const radioContext = useRadioContext();
    const disabled = props.disabled || (props.radioValue !== undefined && radioContext.disabled);

    const classes = useStyles({
        isInverse,
        disabled,
    });
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
            type={type}
            right={right}
            extra={extra}
            labelId={labelId}
            disabled={disabled}
            withChevron={!!props.onPress || !!props.href || !!props.to}
        />
    );

    const renderTouchableContent = (
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
        props.switch === undefined &&
        props.radioValue === undefined &&
        props.checkbox === undefined
    ) {
        return (
            <Touchable
                ref={ref}
                className={classNames(classes.rowContent, classes.hover)}
                trackingEvent={props.trackingEvent}
                onPress={props.onPress}
                role={role}
                dataAttributes={dataAttributes}
                disabled={disabled}
            >
                {renderTouchableContent(props)}
            </Touchable>
        );
    }

    if (props.to) {
        return (
            <Touchable
                className={classNames(classes.rowContent, classes.hover)}
                trackingEvent={props.trackingEvent}
                to={props.to}
                fullPageOnWebView={props.fullPageOnWebView}
                role={role}
                dataAttributes={dataAttributes}
                disabled={disabled}
            >
                {renderTouchableContent(props)}
            </Touchable>
        );
    }

    if (props.href) {
        return (
            <Touchable
                className={classNames(classes.rowContent, classes.hover)}
                trackingEvent={props.trackingEvent}
                href={props.href}
                newTab={props.newTab}
                role={role}
                dataAttributes={dataAttributes}
                disabled={disabled}
            >
                {renderTouchableContent(props)}
            </Touchable>
        );
    }

    const renderRowWithControl = (Control: typeof Switch | typeof Checkbox) => {
        const name = props.switch?.name ?? props.checkbox?.name ?? titleId;
        return props.onPress ? (
            <div className={classes.dualActionContainer}>
                <Touchable
                    disabled={disabled}
                    onPress={props.onPress}
                    role={role}
                    className={classNames(classes.dualActionLeft, classes.hover)}
                >
                    {renderContent({type: 'basic', labelId: titleId})}
                </Touchable>
                <Touchable
                    disabled={disabled}
                    className={classes.dualActionRight}
                    onPress={toggle}
                    dataAttributes={dataAttributes}
                >
                    <Control
                        disabled={disabled}
                        name={name}
                        checked={isChecked}
                        aria-labelledby={titleId}
                        render={({controlElement}) => controlElement}
                    />
                </Touchable>
            </div>
        ) : (
            <div className={classNames(classes.rowContent, classes.hover)}>
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
        return (
            <div
                className={classNames(classes.rowContent, classes.hover)}
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
        <Box
            paddingX={16}
            className={classNames(classes.rowContent, classes.hover, classes.hoverDisabled)}
            role={role}
        >
            {props.right
                ? renderContent({type: 'custom', right: props.right})
                : renderContent({type: 'basic'})}
        </Box>
    );
});

export const Row = React.forwardRef<TouchableElement, RowContentProps>((props, ref) => (
    <RowContent {...props} ref={ref} />
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
        <div role={role} aria-labelledby={ariaLabelledby} {...getPrefixedDataAttributes(dataAttributes)}>
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

type BoxedRowProps =
    | BasicBoxedRowProps
    | SwitchBoxedRowProps
    | RadioBoxedRowProps
    | CheckboxBoxedRowProps
    | HrefBoxedRowProps
    | ToBoxedRowProps
    | OnPressBoxedRowProps;

export const BoxedRow = React.forwardRef<HTMLDivElement, BoxedRowProps>((props, ref) => (
    <Boxed isInverse={props.isInverse} ref={ref}>
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
    <Stack space={16} role={role} aria-labelledby={ariaLabelledby} dataAttributes={dataAttributes}>
        {children}
    </Stack>
);
