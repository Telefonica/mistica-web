import * as React from 'react';
import classNames from 'classnames';
import {createUseStyles} from './jss';
import Touchable from './touchable';
import {Text3, Text2, Text1} from './text';
import Box from './box';
import Stack from './stack';
import Badge from './badge';
import {useTheme, useScreenSize} from './hooks';
import {useIsInverseVariant} from './theme-variant-context';
import IconChevron from './icons/icon-chevron';
import Switch from './switch-component';
import RadioButton from './radio-button';
import Checkbox from './checkbox';
import {Boxed} from './boxed';
import Divider from './divider';

import type {TrackingEvent} from './utils/types';

const useStyles = createUseStyles(({colors}) => ({
    rowContent: {
        width: '100%',
        cursor: 'pointer',
        '&:hover': {
            background: ({isInverse}) => (isInverse ? 'initial' : colors.backgroundAlternative),

            // Revert hover background in touch devices
            '@media (pointer: coarse)': {
                background: () => 'initial',
            },
        },
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
    icon: {
        display: 'flex',
        alignItems: 'center',

        '& img': {
            display: 'flex',
            width: '100%',
        },
    },
    rowBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
    icon?: React.ReactElement<any> | string | null;
    iconSize?: 24 | 40;
    badge?: boolean | number;
    role?: string;
}

interface ContentProps extends CommonProps {
    isClickable?: boolean;
    type?: 'chevron' | 'basic' | 'custom';
    right?: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({
    headline,
    title,
    titleLinesMax,
    subtitle,
    subtitleLinesMax,
    description,
    descriptionLinesMax,
    icon,
    iconSize = 40,
    type = 'basic',
    badge,
    right,
}) => {
    const isInverse = useIsInverseVariant();
    const classes = useStyles({isInverse});
    const {colors} = useTheme();
    const numTextLines = [headline, title, subtitle, description].filter(Boolean).length;
    const centerIcon = numTextLines === 1;
    const {isMobile} = useScreenSize();

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
            {icon && (
                <Box
                    paddingRight={16}
                    paddingY={!centerIcon ? 4 : 0}
                    className={classNames({[classes.center]: centerIcon})}
                >
                    <div className={classes.icon} style={{width: iconSize, height: iconSize}}>
                        {icon}
                    </div>
                </Box>
            )}
            <div className={classes.rowBody}>
                {headline && (
                    <Box paddingBottom={8}>
                        <Text1 wordBreak as="div" regular color={colors.textSecondary}>
                            {headline}
                        </Text1>
                    </Box>
                )}
                <Text3 wordBreak light color={colors.textPrimary} truncate={titleLinesMax}>
                    {title}
                </Text3>
                {subtitle && (
                    <Box paddingY={2}>
                        <Text2 wordBreak regular color={colors.textSecondary} truncate={subtitleLinesMax}>
                            {subtitle}
                        </Text2>
                    </Box>
                )}
                {description && (
                    <Box paddingY={isMobile ? 2 : 0}>
                        <Text2 wordBreak regular color={colors.textSecondary} truncate={descriptionLinesMax}>
                            {description}
                        </Text2>
                    </Box>
                )}
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
    onPress?: undefined;
    to?: undefined;
    right?: undefined;
    checkbox?: undefined;
    radioValue?: undefined;
    newTab?: undefined;

    switch: ControlProps;
}

interface CheckboxRowContentProps extends CommonProps {
    href?: undefined;
    onPress?: undefined;
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
    const isInverse = useIsInverseVariant();
    const classes = useStyles({isInverse});
    const {
        icon,
        iconSize,
        headline,
        title,
        titleLinesMax,
        subtitle,
        subtitleLinesMax,
        description,
        descriptionLinesMax,
        badge,
        role,
    } = props;
    const [isChecked, toggle] = useControlState(props.switch || props.checkbox || {});
    const controlName = props.switch?.name ?? props.checkbox?.name;

    const renderContent = ({type, right}: {type: ContentProps['type']; right?: ContentProps['right']}) => (
        <Content
            icon={icon}
            iconSize={iconSize}
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

    if (props.onPress) {
        return (
            <Touchable
                className={classes.rowContent}
                trackingEvent={props.trackingEvent}
                onPress={props.onPress}
                role={role}
            >
                {renderTouchableContent(props)}
            </Touchable>
        );
    }

    if (props.to) {
        return (
            <Touchable
                className={classes.rowContent}
                trackingEvent={props.trackingEvent}
                to={props.to}
                fullPageOnWebView={props.fullPageOnWebView}
                role={role}
            >
                {renderTouchableContent(props)}
            </Touchable>
        );
    }

    if (props.href) {
        return (
            <Touchable
                className={classes.rowContent}
                trackingEvent={props.trackingEvent}
                href={props.href}
                newTab={props.newTab}
                role={role}
            >
                {renderTouchableContent(props)}
            </Touchable>
        );
    }

    const centered = (el: React.ReactElement<any>) => <div className={classes.centeredControl}>{el}</div>;

    const renderRowWithControl = (Control: React.FC<any>) => (
        <div className={classes.rowContent}>
            <Control
                name={controlName}
                checked={isChecked}
                onChange={toggle}
                render={(control: React.ReactElement) => (
                    <Box paddingX={16} role={role}>
                        {renderContent({
                            type: 'custom',
                            right: centered(control),
                        })}
                    </Box>
                )}
            />
        </div>
    );

    if (props.switch) {
        return renderRowWithControl(Switch);
    }

    if (props.checkbox) {
        return renderRowWithControl(Checkbox);
    }

    if (props.radioValue) {
        return (
            <div className={classes.rowContent} role={role}>
                <RadioButton
                    value={props.radioValue}
                    render={(radio) => (
                        <Box paddingX={16}>
                            {renderContent({
                                type: 'custom',
                                right: centered(radio),
                            })}
                        </Box>
                    )}
                />
            </div>
        );
    }

    return (
        <Box paddingX={16} className={classNames(classes.rowContent, classes.hoverDisabled)} role={role}>
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
};

export const RowList: React.FC<RowListProps> = ({children, ariaLabelledby, role}) => (
    <div role={role} aria-labelledby={ariaLabelledby}>
        {React.Children.toArray(children)
            .filter(Boolean)
            .map((child, index) => (
                <React.Fragment key={index}>
                    {index > 0 && (
                        <Box paddingX={16}>
                            <Divider />
                        </Box>
                    )}
                    {child}
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
};

export const BoxedRowList: React.FC<BoxedRowListProps> = ({children, ariaLabelledby, role}) => (
    <Stack space={16} role={role} aria-labelledby={ariaLabelledby}>
        {children}
    </Stack>
);
