'use client';

import * as React from 'react';
import classnames from 'classnames';
import Touchable from './touchable';
import Avatar from './avatar';
import {Text1, Text2} from './text';
import {IconButton} from './icon-button';
import IconWarningRegular from './generated/mistica-icons/icon-warning-regular';
import ScreenReaderOnly from './screen-reader-only';
import {ThemeVariant, useThemeVariant} from './theme-variant-context';
import {useElementDimensions, useTheme} from './hooks';
import {vars} from './skins/skin-contract.css';
import {getPrefixedDataAttributes} from './utils/dom';
import * as tokens from './text-tokens';
import * as styles from './message.css';

import type {IconButtonProps} from './icon-button';
import type {PressHandler, TouchableComponentProps} from './touchable';
import type {ExclusifyUnion} from './utils/utility-types';

type MessageAction = IconButtonProps & {
    small?: never;
    type?: never;
    bleedLeft?: never;
    bleedRight?: never;
    bleedY?: never;
};
type MessageActions = readonly [MessageAction] | readonly [MessageAction, MessageAction];
const avatarSize = 40;
const maximumActions = 2;

export type MessageProps = TouchableComponentProps<
    {
        type: 'incoming' | 'outgoing';
        senderName?: string;
        senderNameAs?: 'span' | 'p' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        senderNameLabel?: string;
        timestamp?: string;
        timestampLabel?: string;
        asset?: React.ReactNode;
        boxed?: boolean;
        /** Maximum width of the whole message, including its asset and side actions. Defaults to 80%.
         * Error feedback may be wider than a short bubble, but stays within the available message width.
         */
        maxWidth?: number | string;
        position?: 'standalone' | 'first' | 'middle' | 'last';
    } & ExclusifyUnion<
        {onAssetPress: PressHandler; assetLabel: string} | {onAssetPress?: undefined; assetLabel?: undefined}
    > & {
            contentText?: string;
            contentSlot?: React.ReactNode;
            footerSlot?: React.ReactNode;
            side?: React.ReactNode;
            /** Up to two actions. Extra actions from untyped consumers are ignored. */
            actions?: MessageActions;
            actionsPosition?: 'side' | 'footer';
        } & ExclusifyUnion<{error: true; errorMessage: string} | {error?: false}>
>;

const Message = ({
    type,
    senderName,
    senderNameAs = 'span',
    senderNameLabel,
    timestamp,
    timestampLabel,
    asset,
    onAssetPress,
    assetLabel,
    boxed = true,
    maxWidth = '80%',
    position = 'standalone',
    contentText,
    contentSlot,
    footerSlot,
    side,
    actions,
    actionsPosition = 'footer',
    error = false,
    errorMessage,
    dataAttributes,
    ...touchableProps
}: MessageProps): JSX.Element => {
    const {t} = useTheme();
    const variant = useThemeVariant();
    const id = React.useId();
    const {width: textWidth, ref: textRef} = useElementDimensions();
    const {width: bubbleContentWidth, height: bubbleContentHeight, ref: bubbleRef} = useElementDimensions();
    const bubbleHeight = bubbleContentHeight + (boxed ? styles.bubblePaddingY * 2 : 0);
    const bubbleWidth = bubbleContentWidth + (boxed ? styles.bubblePaddingX * 2 : 0);
    const shortError = error && bubbleContentWidth > 0 && bubbleWidth < styles.minimumErrorWidth;
    const inlineTimestamp = boxed && !contentSlot && textWidth > 0 && textWidth < styles.minimumBubbleSize;
    const isInteractive = !!(touchableProps.onPress || touchableProps.href || touchableProps.to);
    const directionLabel = t(type === 'incoming' ? tokens.messageIncoming : tokens.messageOutgoing);
    const renderActions = () =>
        actions
            ?.slice(0, maximumActions)
            .map((action, index) => <IconButton key={index} {...action} small type="neutral" />);

    const accessibleIds = [
        `${id}-direction`,
        (senderName || senderNameLabel) && `${id}-sender`,
        `${id}-content`,
        !error && timestamp && `${id}-timestamp`,
        footerSlot && `${id}-footer`,
        error && `${id}-error`,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div
            className={classnames(styles.message, styles.direction[type])}
            style={{maxWidth}}
            {...getPrefixedDataAttributes({testid: 'Message', ...dataAttributes})}
        >
            {asset && (
                <div
                    className={classnames(styles.asset, styles.assetAlignment[type], {
                        [styles.unboxedAssetSpacing[type]]: !boxed,
                    })}
                    style={
                        type === 'outgoing' && bubbleHeight
                            ? {transform: `translateY(calc(${bubbleHeight}px - 100%))`}
                            : undefined
                    }
                >
                    <Touchable maybe onPress={onAssetPress} aria-label={assetLabel}>
                        <span aria-hidden>
                            {React.isValidElement<{size: number}>(asset) && asset.type === Avatar
                                ? React.cloneElement(asset, {size: avatarSize})
                                : asset}
                        </span>
                    </Touchable>
                </div>
            )}
            <div className={classnames(styles.column, {[styles.shortErrorLayout[type]]: shortError})}>
                <Touchable
                    {...touchableProps}
                    maybe
                    aria-labelledby={
                        touchableProps['aria-label']
                            ? undefined
                            : touchableProps['aria-labelledby'] ?? (isInteractive ? accessibleIds : undefined)
                    }
                    className={classnames(
                        styles.touchable,
                        styles.corners[`${type}-${error ? 'standalone' : position}`],
                        {[styles.shortErrorBubble]: shortError}
                    )}
                >
                    <ThemeVariant variant={boxed ? 'default' : variant}>
                        <div
                            ref={bubbleRef}
                            data-testid="MessageBubble"
                            className={classnames(styles.bubble, {
                                [styles.boxed]: boxed,
                                [styles.incomingBackground[variant]]: boxed && type === 'incoming' && !error,
                                [styles.outgoingBackground[variant]]: boxed && type === 'outgoing' && !error,
                                [styles.errorBackground]: boxed && error,
                                [styles.interactive]: boxed && isInteractive,
                                [styles.shortErrorBubble]: shortError,
                            })}
                        >
                            <ScreenReaderOnly>
                                <span id={`${id}-direction`}>{directionLabel}: </span>
                            </ScreenReaderOnly>
                            {(senderName || senderNameLabel) &&
                                (senderName ? (
                                    <Text1
                                        medium
                                        as={senderNameAs}
                                        id={`${id}-sender`}
                                        aria-label={senderNameLabel}
                                        color={vars.colors.textBrand}
                                    >
                                        {senderName}
                                    </Text1>
                                ) : (
                                    <ScreenReaderOnly>
                                        <span id={`${id}-sender`}>{senderNameLabel}</span>
                                    </ScreenReaderOnly>
                                ))}
                            <div
                                className={classnames(styles.body, {
                                    [styles.inlineTimestamp]: inlineTimestamp,
                                })}
                            >
                                <div className={styles.content} id={`${id}-content`}>
                                    {contentText !== undefined && (
                                        <Text2 regular as="p">
                                            <span ref={textRef} className={styles.text}>
                                                {contentText}
                                            </span>
                                        </Text2>
                                    )}
                                    {contentSlot !== undefined && (
                                        <div className={styles.contentSlot}>{contentSlot}</div>
                                    )}
                                </div>
                                {!error && timestamp && (
                                    <div className={boxed ? styles.timestamp : undefined}>
                                        <Text1
                                            regular
                                            as="span"
                                            id={`${id}-timestamp`}
                                            aria-label={timestampLabel}
                                            color={
                                                boxed
                                                    ? type === 'outgoing'
                                                        ? vars.colors.textPrimary
                                                        : vars.colors.textSecondary
                                                    : undefined
                                            }
                                        >
                                            {timestamp}
                                        </Text1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </ThemeVariant>
                    {footerSlot && (
                        <div className={styles.footer} id={`${id}-footer`}>
                            {footerSlot}
                        </div>
                    )}
                </Touchable>
                {actions && actionsPosition === 'footer' && (
                    <div
                        className={classnames(styles.actions, styles.footerActions, {
                            [styles.unboxedActions]: !boxed,
                            [styles.outgoingFooterActions]: type === 'outgoing',
                        })}
                    >
                        {renderActions()}
                    </div>
                )}
                {error && (
                    <div className={classnames(styles.footer, {[styles.shortErrorFooter]: shortError})}>
                        <div
                            className={classnames(styles.error, {
                                [styles.boxedError]: boxed,
                            })}
                            role="alert"
                            id={`${id}-error`}
                        >
                            <Text1 regular color={vars.colors.textError}>
                                <IconWarningRegular color="currentColor" className={styles.errorIcon} />
                            </Text1>
                            <Text1 regular color={vars.colors.textError}>
                                {errorMessage}
                            </Text1>
                        </div>
                    </div>
                )}
            </div>
            {(side || (actions && actionsPosition === 'side')) && (
                <div
                    className={classnames(styles.side, styles.sideDirection[type])}
                    style={{height: bubbleHeight || undefined}}
                >
                    {side}
                    {actions && actionsPosition === 'side' && (
                        <div className={classnames(styles.actions, styles.sideActions[type])}>
                            {renderActions()}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Message;
