'use client';
import * as React from 'react';
import classnames from 'classnames';
import Touchable from './touchable';
import {Text2, Text3} from './text';
import IconChevron from './icons/icon-chevron';
import ScreenReaderOnly from './screen-reader-only';
import * as styles from './side-navigation.css';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes, IconProps, TrackingEvent} from './utils/types';
import type {Location} from 'history';
import type {ExclusifyUnion} from './utils/utility-types';

type SideNavigationContextValue = {
    collapsed: boolean;
};

const SideNavigationContext = React.createContext<SideNavigationContextValue>({
    collapsed: false,
});

const useSideNavigationContext = (): SideNavigationContextValue => React.useContext(SideNavigationContext);

type CommonInteractiveProps = {
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    disabled?: boolean;
    'aria-label'?: string;
    dataAttributes?: DataAttributes;
};

type SideNavigationInteractiveProps = ExclusifyUnion<
    | {
          onPress: () => void;
          href?: undefined;
          to?: undefined;
      }
    | {
          href: string;
          newTab?: boolean;
          loadOnTop?: boolean;
          onNavigate?: () => void | Promise<void>;
          onPress?: undefined;
          to?: undefined;
      }
    | {
          to: string | Location;
          newTab?: boolean;
          fullPageOnWebView?: boolean;
          replace?: boolean;
          onNavigate?: () => void | Promise<void>;
          onPress?: undefined;
          href?: undefined;
      }
    | {
          onPress?: undefined;
          href?: undefined;
          to?: undefined;
      }
>;

type SideNavigationItemBaseProps = CommonInteractiveProps & {
    label: string;
    description?: string;
    Icon?: (props: IconProps) => JSX.Element;
    asset?: React.ReactNode;
    selected?: boolean;
    right?: React.ReactNode;
};

export type SideNavigationItemProps = SideNavigationItemBaseProps & SideNavigationInteractiveProps;

export type SideNavigationSectionProps = CommonInteractiveProps & {
    label: string;
    Icon?: (props: IconProps) => JSX.Element;
    asset?: React.ReactNode;
    selected?: boolean;
    defaultOpen?: boolean;
    open?: boolean;
    onChange?: (open: boolean) => void;
    children: React.ReactNode;
};

export type SideNavigationProps = {
    children: React.ReactNode;
    logo?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    collapsed?: boolean;
    'aria-label'?: string;
    dataAttributes?: DataAttributes;
};

const renderAsset = ({
    Icon,
    asset,
}: {
    Icon?: (props: IconProps) => JSX.Element;
    asset?: React.ReactNode;
}): React.ReactNode => {
    if (Icon) {
        return <Icon size={24} color="currentColor" />;
    }
    return asset;
};

const SideNavigationItemContent = ({
    label,
    description,
    Icon,
    asset,
    selected,
    right,
}: SideNavigationItemBaseProps): JSX.Element => {
    const {collapsed} = useSideNavigationContext();
    const renderedAsset = renderAsset({Icon, asset});

    return (
        <>
            {renderedAsset && <div className={styles.asset}>{renderedAsset}</div>}
            {collapsed ? (
                <ScreenReaderOnly>
                    <span>{label}</span>
                </ScreenReaderOnly>
            ) : (
                <>
                    <div className={styles.label}>
                        {selected ? (
                            <Text3 medium truncate={1} color="currentColor">
                                {label}
                            </Text3>
                        ) : (
                            <Text3 regular truncate={1} color="currentColor">
                                {label}
                            </Text3>
                        )}
                        {description && (
                            <Text2 regular truncate={1} color="currentColor">
                                {description}
                            </Text2>
                        )}
                    </div>
                    {right && <div className={styles.right}>{right}</div>}
                </>
            )}
        </>
    );
};

export const SideNavigationItem = ({
    label,
    description,
    Icon,
    asset,
    selected,
    right,
    disabled,
    dataAttributes,
    trackingEvent,
    'aria-label': ariaLabel,
    ...props
}: SideNavigationItemProps): JSX.Element => {
    const {collapsed} = useSideNavigationContext();
    const className = classnames(styles.itemInteractive, {
        [styles.itemInteractiveCollapsed]: collapsed,
        [styles.itemSelected]: selected,
        [styles.itemDisabled]: disabled,
    });
    const content = (
        <SideNavigationItemContent
            label={label}
            description={description}
            Icon={Icon}
            asset={asset}
            selected={selected}
            right={right}
            disabled={disabled}
        />
    );
    const commonProps = {
        className,
        disabled,
        trackingEvent,
        'aria-label': ariaLabel ?? (collapsed ? label : undefined),
        'aria-current': selected ? 'page' : undefined,
        dataAttributes,
    } as const;

    return (
        <div className={styles.item} role="listitem">
            {props.href ? (
                <Touchable
                    {...commonProps}
                    href={props.href}
                    newTab={props.newTab}
                    loadOnTop={props.loadOnTop}
                    onNavigate={props.onNavigate}
                >
                    {content}
                </Touchable>
            ) : props.to ? (
                <Touchable
                    {...commonProps}
                    to={props.to}
                    newTab={props.newTab}
                    fullPageOnWebView={props.fullPageOnWebView}
                    replace={props.replace}
                    onNavigate={props.onNavigate}
                >
                    {content}
                </Touchable>
            ) : props.onPress ? (
                <Touchable {...commonProps} onPress={props.onPress}>
                    {content}
                </Touchable>
            ) : (
                <div
                    className={classnames(styles.itemStatic, {
                        [styles.itemInteractiveCollapsed]: collapsed,
                        [styles.itemSelected]: selected,
                        [styles.itemDisabled]: disabled,
                    })}
                    aria-label={ariaLabel ?? (collapsed ? label : undefined)}
                    aria-current={selected ? 'page' : undefined}
                    {...getPrefixedDataAttributes(dataAttributes, 'SideNavigationItem')}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export const SideNavigationSection = ({
    label,
    Icon,
    asset,
    selected,
    defaultOpen = false,
    open,
    onChange,
    disabled,
    dataAttributes,
    trackingEvent,
    'aria-label': ariaLabel,
    children,
}: SideNavigationSectionProps): JSX.Element => {
    const {collapsed} = useSideNavigationContext();
    const panelId = React.useId();
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isOpen = open ?? internalOpen;
    const toggleOpen = () => {
        const nextOpen = !isOpen;
        if (open === undefined) {
            setInternalOpen(nextOpen);
        }
        onChange?.(nextOpen);
    };

    return (
        <div className={styles.item} role="listitem">
            <Touchable
                className={classnames(styles.itemInteractive, {
                    [styles.itemInteractiveCollapsed]: collapsed,
                    [styles.itemSelected]: selected,
                    [styles.itemDisabled]: disabled,
                })}
                onPress={toggleOpen}
                disabled={disabled}
                trackingEvent={trackingEvent}
                aria-label={ariaLabel ?? (collapsed ? label : undefined)}
                aria-expanded={collapsed ? undefined : isOpen}
                aria-controls={collapsed ? undefined : panelId}
                dataAttributes={dataAttributes}
            >
                <SideNavigationItemContent
                    label={label}
                    Icon={Icon}
                    asset={asset}
                    selected={selected}
                    disabled={disabled}
                    right={<IconChevron size={16} direction={isOpen ? 'up' : 'down'} color="currentColor" />}
                />
            </Touchable>
            <div
                id={panelId}
                role="group"
                className={classnames(styles.sectionPanel, {
                    [styles.sectionPanelCollapsed]: collapsed || !isOpen,
                })}
            >
                {children}
            </div>
        </div>
    );
};

const SideNavigation = ({
    children,
    logo,
    header,
    footer,
    collapsed = false,
    'aria-label': ariaLabel = 'Side navigation',
    dataAttributes,
}: SideNavigationProps): JSX.Element => {
    return (
        <SideNavigationContext.Provider value={{collapsed}}>
            <nav
                aria-label={ariaLabel}
                className={classnames(styles.root, {[styles.collapsed]: collapsed})}
                {...getPrefixedDataAttributes(dataAttributes, 'SideNavigation')}
            >
                {logo && (
                    <div
                        className={classnames(styles.logoContainer, {
                            [styles.logoContainerCollapsed]: collapsed,
                        })}
                    >
                        {logo}
                    </div>
                )}
                {header && (
                    <div
                        role="list"
                        className={classnames(styles.header, {[styles.headerCollapsed]: collapsed})}
                    >
                        {header}
                    </div>
                )}
                <div
                    role="list"
                    className={classnames(styles.content, {[styles.contentCollapsed]: collapsed})}
                >
                    {children}
                </div>
                {footer && (
                    <div
                        role="list"
                        className={classnames(styles.footer, {[styles.footerCollapsed]: collapsed})}
                    >
                        {footer}
                    </div>
                )}
            </nav>
        </SideNavigationContext.Provider>
    );
};

export default SideNavigation;
