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

import type {TrackingEvent} from './utils/types';

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
    type?: 'chevron' | 'control' | 'basic',
    renderControl?: (id: string) => React.Element<any>,
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
}: ContentProps) => {
    const classes = useStyles();
    const controlId = useAriaId();
    const theme = useTheme();
    if (description || subtitle || headline) {
        iconSize = 40;
    }
    const isBigIcon = iconSize === 40;
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
            return <label htmlFor={controlId}>{text}</label>;
        }

        return text;
    };

    return (
        <Box paddingY={16} className={classes.content}>
            {icon && (
                <Box
                    paddingRight={16}
                    paddingY={isBigIcon ? 4 : 0}
                    className={classNames({[classes.center]: !isBigIcon})}
                >
                    <div className={classes.icon} style={{width: iconSize, height: iconSize}}>
                        {icon}
                    </div>
                </Box>
            )}
            <div className={classes.rowBody}>
                {headline && (
                    <Box paddingBottom={8}>
                        <Text size={12} lineHeight="16px" color={theme.colors.textSecondary}>
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
            ) : null}
        </Box>
    );
};

type RowContentProps =
    | CommonProps
    | {
          ...CommonProps,
          trackingEvent?: TrackingEvent,
          switch: {
              value?: boolean,
              defaultValue?: boolean,
              onChange?: (checked: boolean) => void,
          },
      }
    | {
          ...CommonProps,
          trackingEvent?: TrackingEvent,
          href: string,
          newTab?: boolean,
      }
    | {
          ...CommonProps,
          trackingEvent?: TrackingEvent,
          to: string,
          fullPageOnWebView?: boolean,
          replace?: boolean,
      }
    | {
          ...CommonProps,
          trackingEvent?: TrackingEvent,
          onPress: Function,
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
    const [isChecked, toggle] = useControlState(props.switch || {});

    const content = (
        <Content
            icon={icon}
            iconSize={iconSize}
            headline={headline}
            title={title}
            subtitle={subtitle}
            description={description}
            badge={badge}
            type="chevron"
        />
    );

    if (props.onPress) {
        return (
            <Touchable
                className={classes.rowContent}
                trackingEvent={props.trackingEvent}
                onPress={props.onPress}
            >
                <Box paddingX={16}>{content}</Box>
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
                <Box paddingX={16}>{content}</Box>
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
                <Box paddingX={16}>{content}</Box>
            </Touchable>
        );
    }

    if (props.switch) {
        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div onClick={() => toggle()} className={classes.rowContent}>
                <Box paddingX={16}>
                    {React.cloneElement(content, {
                        type: 'control',
                        renderControl: (id) => <Switch checked={isChecked} onChange={toggle} id={id} />,
                    })}
                </Box>
            </div>
        );
    }

    return (
        <Box paddingX={16} className={classNames(classes.rowContent, classes.hoverDisabled)}>
            {React.cloneElement(content, {type: 'basic'})}
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
