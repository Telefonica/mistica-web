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
import RadioButton from './radio-button';
import Checkbox from './checkbox';
import {Boxed} from './boxed';
import Divider from './divider';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes, TrackingEvent} from './utils/types';

const useStyles = createUseStyles(({colors}) => ({
    hover: {
        // Only apply hover effect to user agents using fine pointer devices (a mouse, for example)
        // Also enabled for (pointer: none) for acceptance tests, where (pointer: fine) doesn't match.
        // WARNING: you may be tempted to use @media (hover: hover) instead, but that doesn't work as expected in some android browsers.
        // See: https://hover-pointer-media-query.glitch.me/ and https://github.com/mui-org/material-ui/issues/15736
        '@media (pointer: fine), (pointer: none)': {
            '&:hover': {
                background: ({isInverse}) => (isInverse ? 'initial' : colors.backgroundAlternative),
            },
        },
    },
    rowContent: {
        width: '100%',
        cursor: 'pointer',
    },
    hoverDisabled: {
        cursor: 'initial',
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
    /** @deprecated use asset prop */
    icon?: React.ReactNode;
    /** @deprecated this prop is ignored */
    iconSize?: 24 | 40;
    asset?: React.ReactNode;
    badge?: boolean | number;
    role?: string;
    extra?: React.ReactNode;
    dataAttributes?: DataAttributes;
}

interface ContentProps extends CommonProps {
    isClickable?: boolean;
    type?: 'chevron' | 'basic' | 'custom';
    right?: React.ReactNode;
    /** This id is to link the title with the related control */
    labelId?: string;
}

const Content: React.FC<ContentProps> = ({
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
}) => {
    const isInverse = useIsInverseVariant();
    const classes = useStyles({isInverse});
    const {colors} = useTheme();
    const numTextLines = [headline, title, subtitle, description, extra].filter(Boolean).length;
    const shouldCenter = numTextLines === 1;

    const renderBadge = () => {
        if (!badge) {
            return null;
        }
        return (
            <Box paddingLeft={16}>
                <div className={classNames(classes.center, classes.badge)}>
                    {badge === true ? <Badge /> : <Badge value={badge} />}
                </div>
            </Box>
        );
    };

    return (
        <Box paddingY={16} className={classes.content}>
            {asset && (
                <Box paddingRight={16} className={classNames({[classes.center]: shouldCenter})}>
                    <div className={classes.asset}>{asset}</div>
                </Box>
            )}
            <div className={classes.rowBody} style={{justifyContent: shouldCenter ? 'center' : 'flex-start'}}>
                <Stack space={4}>
                    {headline && (
                        <Text1 wordBreak regular color={colors.textPrimary}>
                            {headline}
                        </Text1>
                    )}
                    <Stack space={2}>
                        <Text3
                            wordBreak
                            regular
                            color={colors.textPrimary}
                            truncate={titleLinesMax}
                            id={labelId}
                        >
                            {title}
                        </Text3>
                        {subtitle && (
                            <Text2 wordBreak regular color={colors.textSecondary} truncate={subtitleLinesMax}>
                                {subtitle}
                            </Text2>
                        )}
                        {description && (
                            <Text2
                                wordBreak
                                regular
                                color={colors.textSecondary}
                                truncate={descriptionLinesMax}
                            >
                                {description}
                            </Text2>
                        )}
                        {extra}
                    </Stack>
                </Stack>
            </div>
            {renderBadge()}
            {type === 'chevron' ? (
                <Box paddingLeft={16} className={classes.center}>
                    <IconChevron
                        size={24}
                        color={isInverse ? colors.inverse : colors.neutralMedium}
                        direction="right"
                    />
                </Box>
            ) : right ? (
                <div className={classes.right}>{right}</div>
            ) : null}
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

    right?: React.ReactNode;
}

interface SwitchRowContentProps extends CommonProps {
    href?: undefined;
    onPress?: () => void;
    to?: undefined;
    right?: undefined;
    checkbox?: undefined;
    radioValue?: undefined;
    newTab?: undefined;

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

    radioValue: string;
}

interface HrefRowContentProps extends CommonProps {
    checkbox?: undefined;
    switch?: undefined;
    radioValue?: undefined;

    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    href: string;
    newTab?: boolean;
    onPress?: undefined;
    to?: undefined;
    right?: React.ReactNode;
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
    right?: React.ReactNode;
}

interface OnPressRowContentProps extends CommonProps {
    checkbox?: undefined;
    switch?: undefined;
    radioValue?: undefined;

    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    onPress: () => void;
    href?: undefined;
    to?: undefined;
    right?: React.ReactNode;
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
            onChange(!value);
        }
    };

    if (isControlledByParent) {
        return [!!value, toggle];
    }

    return [isChecked, toggle];
};

const RowContent = (props: RowContentProps) => {
    const titleId = useAriaId();
    const isInverse = useIsInverseVariant();
    const classes = useStyles({isInverse});
    const {
        asset = props.icon,
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

        return <Box paddingX={16}>{renderContent({type, right: props.right})}</Box>;
    };

    if (
        props.onPress &&
        props.switch === undefined &&
        props.radioValue === undefined &&
        props.checkbox === undefined
    ) {
        return (
            <Touchable
                className={classNames(classes.rowContent, classes.hover)}
                trackingEvent={props.trackingEvent}
                onPress={props.onPress}
                role={role}
                dataAttributes={dataAttributes}
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
                    onPress={props.onPress}
                    role={role}
                    className={classNames(classes.dualActionLeft, classes.hover)}
                >
                    {renderContent({type: 'custom', labelId: titleId})}
                </Touchable>
                <Touchable
                    className={classes.dualActionRight}
                    onPress={toggle}
                    dataAttributes={dataAttributes}
                >
                    <Control name={name} checked={isChecked} aria-labelledby={titleId} />
                </Touchable>
            </div>
        ) : (
            <div className={classNames(classes.rowContent, classes.hover)}>
                <Control
                    dataAttributes={dataAttributes}
                    name={name}
                    checked={isChecked}
                    onChange={toggle}
                    render={(control: React.ReactElement, labelId) => (
                        <Box paddingX={16} role={role}>
                            {renderContent({
                                labelId,
                                type: 'custom',
                                right: <Stack space="around">{control}</Stack>,
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
            <div className={classNames(classes.rowContent, classes.hover)} role={role}>
                <RadioButton
                    dataAttributes={dataAttributes}
                    value={props.radioValue}
                    aria-labelledby={titleId}
                    render={(radio) => (
                        <Box paddingX={16}>
                            {renderContent({
                                type: 'custom',
                                right: <Stack space="around">{radio}</Stack>,
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
            className={classNames(classNames(classes.rowContent, classes.hover), classes.hoverDisabled)}
            role={role}
        >
            {props.right
                ? renderContent({type: 'custom', right: props.right})
                : renderContent({type: 'basic'})}
        </Box>
    );
};

export const Row: React.FC<RowContentProps> = (props) => <RowContent {...props} />;

type RowListProps = {
    children: React.ReactNode;
    ariaLabelledby?: string;
    role?: string;
    dataAttributes?: DataAttributes;
};

export const RowList: React.FC<RowListProps> = ({children, ariaLabelledby, role, dataAttributes}) => (
    <div role={role} aria-labelledby={ariaLabelledby} {...getPrefixedDataAttributes(dataAttributes)}>
        {React.Children.toArray(children)
            .filter(Boolean)
            .map((child, index) => (
                <React.Fragment key={index}>
                    {child}
                    <Box paddingX={16}>
                        <Divider />
                    </Box>
                </React.Fragment>
            ))}
    </div>
);

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

export const BoxedRow: React.FC<BoxedRowProps> = (props) => (
    <Boxed isInverse={props.isInverse}>
        <RowContent {...props} />
    </Boxed>
);

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
