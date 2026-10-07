'use client';

import * as React from 'react';
import classnames from 'classnames';
import Touchable from './touchable';
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

export type MessageProps = TouchableComponentProps<
    {
        type?: 'incoming' | 'outgoing';
        senderName?: string;
        senderNameAs?: 'span' | 'p' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        senderNameLabel?: string;
        timestamp?: string;
        timestampLabel?: string;
        asset?: React.ReactNode;
        boxed?: boolean;
        maxWidth?: number | string;
        position?: 'standalone' | 'first' | 'middle' | 'last';
    } & ExclusifyUnion<
        {onAssetPress: PressHandler; assetLabel: string} | {onAssetPress?: undefined; assetLabel?: undefined}
    > &
        ExclusifyUnion<
            | {error: true; errorMessage?: string; text?: string}
            | ({error?: false; footer?: React.ReactNode; side?: React.ReactNode} & ExclusifyUnion<
                  {text?: string} | {children?: React.ReactNode}
              > &
                  ExclusifyUnion<{sideActions?: MessageActions} | {footerActions?: MessageActions}>)
        >
>;

const Message = ({
    type = 'incoming',
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
    text,
    children,
    footer,
    side,
    sideActions,
    footerActions,
    error = false,
    errorMessage,
    dataAttributes,
    ...touchableProps
}: MessageProps): JSX.Element => {
    const {t} = useTheme();
    const variant = useThemeVariant();
    const id = React.useId();
    const {width: textWidth, ref: textRef} = useElementDimensions();
    const {height: bubbleContentHeight, ref: bubbleRef} = useElementDimensions();
    const bubbleHeight = bubbleContentHeight + (boxed ? styles.bubblePaddingY * 2 : 0);
    const inlineTimestamp = boxed && textWidth > 0 && textWidth < styles.minimumBubbleSize;
    const isInteractive = !!(touchableProps.onPress || touchableProps.href || touchableProps.to);
    const errorText = errorMessage ?? t(tokens.messageError);
    const directionLabel = t(type === 'incoming' ? tokens.messageIncoming : tokens.messageOutgoing);
    const actions = sideActions || footerActions;
    const renderActions = () =>
        actions?.map((action, index) => <IconButton key={index} {...action} small type="neutral" />);

    const accessibleIds = [
        `${id}-direction`,
        (senderName || senderNameLabel) && `${id}-sender`,
        `${id}-content`,
        !error && footer && `${id}-footer`,
        !error && timestamp && `${id}-timestamp`,
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
                    className={classnames(styles.asset, styles.assetAlignment[type])}
                    style={
                        type === 'outgoing' && bubbleHeight
                            ? {transform: `translateY(calc(${bubbleHeight}px - 100%))`}
                            : undefined
                    }
                >
                    <Touchable maybe onPress={onAssetPress} aria-label={assetLabel}>
                        <span aria-hidden>{asset}</span>
                    </Touchable>
                </div>
            )}
            <div className={styles.column}>
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
                        styles.corners[`${type}-${error ? 'standalone' : position}`]
                    )}
                >
                    <ThemeVariant variant={boxed ? 'default' : variant}>
                        <div
                            ref={bubbleRef}
                            data-testid="MessageBubble"
                            className={classnames(styles.bubble, {
                                [styles.boxed]: boxed,
                                [styles.incomingBackground[variant]]: boxed && type === 'incoming' && !error,
                                [styles.outgoingBackground]: boxed && type === 'outgoing' && !error,
                                [styles.errorBackground]: boxed && error,
                                [styles.interactive]: boxed && isInteractive,
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
                                        color={boxed ? vars.colors.textBrand : undefined}
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
                                    {text !== undefined ? (
                                        <Text2 regular as="p">
                                            <span ref={textRef} className={styles.text}>
                                                {text}
                                            </span>
                                        </Text2>
                                    ) : (
                                        children
                                    )}
                                </div>
                                {!error && timestamp && (
                                    <div className={boxed ? styles.timestamp : undefined}>
                                        <Text1
                                            regular
                                            as="span"
                                            id={`${id}-timestamp`}
                                            aria-label={timestampLabel}
                                            color={boxed ? vars.colors.textSecondary : undefined}
                                        >
                                            {timestamp}
                                        </Text1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </ThemeVariant>
                    {!error && footer && (
                        <div className={styles.footer} id={`${id}-footer`}>
                            {footer}
                        </div>
                    )}
                    {error && (
                        <div className={styles.footer}>
                            <div
                                className={classnames(styles.error, {[styles.boxedError]: boxed})}
                                role="alert"
                                id={`${id}-error`}
                            >
                                <IconWarningRegular size={16} color={vars.colors.textError} />
                                <Text1 regular color={vars.colors.textError}>
                                    {errorText}
                                </Text1>
                            </div>
                        </div>
                    )}
                </Touchable>
                {!error && footerActions && (
                    <div className={classnames(styles.actions, {[styles.unboxedActions]: !boxed})}>
                        {renderActions()}
                    </div>
                )}
            </div>
            {!error && (side || sideActions) && (
                <div
                    className={classnames(styles.side, styles.sideDirection[type])}
                    style={{height: bubbleHeight || undefined}}
                >
                    {side}
                    {sideActions && <div className={styles.actions}>{renderActions()}</div>}
                </div>
            )}
        </div>
    );
};

export default Message;
