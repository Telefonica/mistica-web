import * as React from 'react';
import classNames from 'classnames';
import {createUseStyles} from './jss';
import Touchable from './touchable';
import Text from './text';
import Box from './box';
import Stack from './stack';
import Badge from './badge';
import {useTheme} from './hooks';
import IconChevron from './icons/icon-chevron';
import Switch from './switch';
import {SPACE} from './utils/key-codes';
import RadioButton from './radio-button';

import type {TrackingEvent} from './utils/types';

// This CircularCheckbox component is only intended to be used inside list rows. Please, don't extract it to it's own file and don't export it from the library.

type CircularCheckboxProps = {
    render?: (checkboxElement: React.ReactElement) => React.ReactNode;
    checked: boolean;
    onChange: (checked: boolean) => void;
    id: string;
};

const CircularCheckbox = ({checked, onChange, id, render}: CircularCheckboxProps) => {
    const theme = useTheme();

    const handleClick = () => {
        onChange(!checked);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.keyCode === SPACE) {
            event.preventDefault();
            event.stopPropagation();
            onChange(!checked);
        }
    };

    const checkbox = (
        <div style={{display: 'inline-flex'}}>
            {checked ? (
                <svg role="presentation" width={24} height={24} viewBox="0 0 24 24">
                    <g fill="none" fillRule="evenodd" transform="translate(1 1)">
                        <circle cx="11" cy="11" r="11" fill={theme.colors.controlActive} />
                        <path
                            fill="#FFF"
                            fillRule="nonzero"
                            d="M8.854 14.686c.303.348.843.35 1.15.005l5.387-6.086c.28-.316.25-.8-.066-1.08s-.8-.25-1.08.066l-4.799 5.445-1.688-1.94c-.277-.318-.76-.352-1.079-.074-.318.277-.352.76-.074 1.079l2.249 2.585z"
                        />
                    </g>
                </svg>
            ) : (
                <svg role="presentation" width={24} height={24} viewBox="0 0 24 24">
                    <circle
                        cx="11"
                        cy="11"
                        r="10.5"
                        fill="none"
                        fillRule="evenodd"
                        stroke="#DDD"
                        transform="translate(1 1)"
                    />
                </svg>
            )}
        </div>
    );

    return (
        <div
            id={id}
            role="checkbox"
            aria-checked={checked}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            tabIndex={0}
        >
            {render ? <>{render(checkbox)}</> : checkbox}
        </div>
    );
};

const useStyles = createUseStyles((theme) => ({
    rowContent: {
        width: '100%',
        cursor: 'pointer',
        '&:hover': {
            background: theme.colors.backgroundAlternative,

            // Revert hover background in touch devices
            '@media (pointer: coarse)': {
                background: 'initial',
            },
        },
        '&:last-child $content': {
            borderBottom: 'none',
        },
    },
    hoverDisabled: {
        cursor: 'initial',
        '&:hover': {
            background: 'none',
        },
    },
    boxed: {
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 4,
        overflow: 'hidden',
    },
    content: {
        display: 'flex',
        width: '100%',
        minHeight: 72,
        borderBottom: `1px solid ${theme.colors.divider}`,
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
    headline?: string | React.ReactNode;
    title: string;
    subtitle?: string;
    description?: string | null;
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
    subtitle,
    description,
    icon,
    iconSize = 40,
    type = 'basic',
    badge,
    right,
}) => {
    const classes = useStyles();
    const theme = useTheme();
    const numTextLines = [headline, title, subtitle, description].filter(Boolean).length;
    const centerIcon = numTextLines === 1;
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
                        <Text as="div" size={12} lineHeight="16px" color={theme.colors.textSecondary}>
                            {headline}
                        </Text>
                    </Box>
                )}
                <Text size={18} weight="light" lineHeight="24px" color={theme.colors.textPrimary}>
                    {title}
                </Text>
                {subtitle && (
                    <Box paddingY={2}>
                        <Text size={14} lineHeight="20px" color={theme.colors.textSecondary}>
                            {subtitle}
                        </Text>
                    </Box>
                )}
                {description && (
                    <Box paddingY={2}>
                        <Text size={14} lineHeight="20px" color={theme.colors.textSecondary}>
                            {description}
                        </Text>
                    </Box>
                )}
            </div>
            {renderBadge()}
            {type === 'chevron' ? (
                <Box paddingLeft={16} className={classes.center}>
                    <IconChevron size={24} color={theme.colors.iconSecondary} direction="right" />
                </Box>
            ) : right ? (
                <div className={classes.right}>{right}</div>
            ) : null}
        </Box>
    );
};

type ControlProps = {
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

    right?: React.ReactNode;
}

interface SwitchRowContentProps extends CommonProps {
    href?: undefined;
    onPress?: undefined;
    to?: undefined;
    right?: undefined;
    checkbox?: undefined;
    radioValue?: undefined;

    switch: ControlProps;
}

interface CheckboxRowContentProps extends CommonProps {
    href?: undefined;
    onPress?: undefined;
    to?: undefined;
    right?: undefined;
    switch?: undefined;
    radioValue?: undefined;

    checkbox: ControlProps;
}

interface RadioRowContentProps extends CommonProps {
    href?: undefined;
    onPress?: undefined;
    to?: undefined;
    right?: undefined;
    switch?: undefined;
    checkbox?: undefined;

    radioValue: string;
}

interface HrefRowContentProps extends CommonProps {
    checkbox?: undefined;
    switch?: undefined;
    radioValue?: undefined;

    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    href?: string;
    newTab?: boolean;
    onPress?: undefined;
    to?: undefined;
    right?: React.ReactNode;
}

interface ToRowContentProps extends CommonProps {
    checkbox?: undefined;
    switch?: undefined;
    radioValue?: undefined;

    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    to?: string;
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
    onPress?: () => void;
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
    const classes = useStyles();
    const {icon, iconSize, headline, title, subtitle, description, badge, role} = props;
    const [isChecked, toggle] = useControlState(props.switch || props.checkbox || {});

    const renderContent = (moreProps: {type: ContentProps['type']; right?: ContentProps['right']}) => (
        <Content
            icon={icon}
            iconSize={iconSize}
            headline={headline}
            title={title}
            subtitle={subtitle}
            description={description}
            badge={badge}
            {...moreProps}
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
        return renderRowWithControl(CircularCheckbox);
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

/*
!!! FIXME !!!

At this moment Row and BoxedRow have the same type (same shape)
Typescript's check for children is structural (not nominal) so now
a BoxedRowList can contain Row items and RowLists can contain BoxedRows

To avoid this we need different prop type shapes for different row types
*/

export const Row: React.FC<RowContentProps> = (props) => <RowContent {...props} />;

type RowElement = React.ReactElement<typeof Row>;

type RowListProps = {
    children: RowElement | Array<RowElement>;
    ariaLabelledby?: string;
    role?: string;
};

export const RowList: React.FC<RowListProps> = ({children, ariaLabelledby, role}) => (
    <div role={role} aria-labelledby={ariaLabelledby}>
        {children}
    </div>
);

export const BoxedRow: React.FC<RowContentProps> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.boxed}>
            <RowContent {...props} />
        </div>
    );
};

type BoxedRowElement = Array<React.ReactElement<typeof BoxedRow>>;

type BoxedRowListProps = {
    children: BoxedRowElement | Array<BoxedRowElement>;
    ariaLabelledby?: string;
    role?: string;
};

export const BoxedRowList: React.FC<BoxedRowListProps> = ({children, ariaLabelledby, role}) => (
    <Stack space={16} role={role} aria-labelledby={ariaLabelledby}>
        {children}
    </Stack>
);
