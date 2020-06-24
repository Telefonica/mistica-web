// @flow
import * as React from 'react';
import classNames from 'classnames';
import {createUseStyles} from './jss';
import Touchable from './touchable';
import Text from './text';
import Box from './box';
import Stack from './stack';
import Badge from './badge';
import {useTheme, useAriaId} from './hooks';
import IcnChevron from './icons/icn-chevron';
import Switch from './switch';
import {SPACE} from './utils/key-codes';

import type {TrackingEvent} from './utils/types';

// This CircularCheckbox component is only intended to be used inside list rows. Please, don't extract it to it's own file and don't export it from the library.

type CircularCheckboxProps = {
    checked: boolean,
    onChange: (checked: boolean) => void,
    id: string,
};

const CircularCheckbox = ({checked, onChange, id}: CircularCheckboxProps) => {
    const theme = useTheme();

    const handleClick = () => {
        onChange(!checked);
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === SPACE) {
            event.preventDefault();
            event.stopPropagation();
            onChange(!checked);
        }
    };

    return (
        <div
            id={id}
            role="checkbox"
            aria-checked={checked}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            tabIndex="0"
            style={{display: 'inline-flex'}}
        >
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
};

const useStyles = createUseStyles((theme) => ({
    rowContent: {
        width: '100%',
        cursor: 'pointer',
        '&:hover': {
            background: theme.colors.backgroundAlternative,
        },
        '&:last-child > div > div, &:last-child > div': {
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
        borderBottom: `1px solid ${theme.colors.borderLight}`,
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
}));

type CommonProps = {
    headline?: string | React.Node,
    title: string,
    subtitle?: string,
    description?: string | null,
    icon?: React.Element<any> | string | null,
    iconSize?: 24 | 40,
    badge?: boolean | number,
};

type ContentProps = {
    ...CommonProps,
    type?: 'chevron' | 'control' | 'basic' | 'custom',
    renderControl?: (id: string) => React.Element<any>,
    right?: React.Node,
};

const Content = ({
    headline,
    title,
    subtitle,
    description,
    icon,
    iconSize = 40,
    type = 'basic',
    renderControl,
    badge,
    right,
}: ContentProps) => {
    const classes = useStyles();
    const controlId = useAriaId();
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

    const renderTitle = () => {
        const text = (
            <Text size={18} weight="light" lineHeight="24px" color={theme.colors.textPrimary}>
                {title}
            </Text>
        );

        if (type === 'control') {
            return (
                <label style={{cursor: 'pointer'}} htmlFor={controlId}>
                    {text}
                </label>
            );
        }

        return text;
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
                {renderTitle()}
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
                    <IcnChevron size={24} color={theme.colors.iconSecondary} direction="right" />
                </Box>
            ) : renderControl ? (
                <div className={classes.control}>{renderControl(controlId)}</div>
            ) : right ? (
                <div className={classes.right}>{right}</div>
            ) : null}
        </Box>
    );
};

type ControlProps = {
    value?: boolean,
    defaultValue?: boolean,
    onChange?: (checked: boolean) => void,
};

type RowContentProps =
    | {
          ...CommonProps,
          right?: React.Node,
      }
    | {
          ...CommonProps,
          switch: ControlProps,
      }
    | {
          ...CommonProps,
          checkbox: ControlProps,
      }
    | {
          ...CommonProps,
          trackingEvent?: TrackingEvent,
          href: string,
          newTab?: boolean,
          right?: React.Node,
      }
    | {
          ...CommonProps,
          trackingEvent?: TrackingEvent,
          to: string,
          fullPageOnWebView?: boolean,
          replace?: boolean,
          right?: React.Node,
      }
    | {
          ...CommonProps,
          trackingEvent?: TrackingEvent,
          onPress: Function,
          right?: React.Node,
      };

const useControlState = ({
    value,
    defaultValue,
    onChange,
}: {
    value?: boolean,
    defaultValue?: boolean,
    onChange?: (isChecked: boolean) => void,
}): [boolean, () => void] => {
    const isControlledByParent = value !== undefined;
    const [isChecked, setIsChecked] = React.useState<boolean>(!!defaultValue);

    const toggle = () => {
        if (!isControlledByParent) {
            setIsChecked(!isChecked);
        }
        if (onChange) {
            onChange(!isChecked);
        }
    };

    if (isControlledByParent) {
        return [!!value, toggle];
    }

    return [isChecked, toggle];
};

const RowContent = (props: RowContentProps) => {
    const classes = useStyles();
    const {icon, iconSize, headline, title, subtitle, description, badge} = props;
    const [isChecked, toggle] = useControlState(props.switch || props.checkbox || ({}: any));

    const renderContent = (moreProps) => (
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

    const renderTouchableContent = (props) => {
        let type = 'chevron';

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
            >
                {renderTouchableContent(props)}
            </Touchable>
        );
    }

    const renderRowWithControl = (Control) => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onClick={() => toggle()} className={classes.rowContent}>
            <Box paddingX={16}>
                {renderContent({
                    type: 'control',
                    renderControl: (id) => <Control checked={isChecked} onChange={toggle} id={id} />,
                })}
            </Box>
        </div>
    );

    if (props.switch) {
        return renderRowWithControl(Switch);
    }

    if (props.checkbox) {
        return renderRowWithControl(CircularCheckbox);
    }

    return (
        <Box paddingX={16} className={classNames(classes.rowContent, classes.hoverDisabled)}>
            {props.right
                ? renderContent({type: 'custom', right: props.right})
                : renderContent({type: 'basic'})}
        </Box>
    );
};

export const Row = (props: RowContentProps): React.Node => <RowContent {...props} />;

type RowListProps = {
    children: React.ChildrenArray<React.Element<typeof Row>>,
};

export const RowList = ({children}: RowListProps): React.Node =>
    React.Children.map(children, (child) => child);

export const BoxedRow = (props: RowContentProps): React.Node => <RowContent {...props} />;

type BoxedRowListProps = {
    children: React.ChildrenArray<React.Element<typeof BoxedRow>>,
};

export const BoxedRowList = ({children}: BoxedRowListProps): React.Node => {
    const classes = useStyles();

    return (
        <Stack space={16}>
            {React.Children.map(children, (child) => (
                <div className={classes.boxed}>{child}</div>
            ))}
        </Stack>
    );
};
