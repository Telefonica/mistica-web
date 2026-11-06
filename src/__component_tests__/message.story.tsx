import * as React from 'react';
import Message from '../message';
import IconCopyRegular from '../generated/mistica-icons/icon-copy-regular';

export const Static = (): JSX.Element => (
    <>
        <Message type="incoming" contentText="Hello" />
        <Message type="outgoing" contentText="Hi" />
        <button>Next control</button>
    </>
);
export const Example = ({
    asset,
    decorativeAsset,
    contentSlot,
    footerSlot,
    footerControl,
    sideSlot,
    actions,
    onAsset,
    assetLabel,
    onAction,
    onFooter,
    href,
    onPress,
    error,
    errorMessage,
    ...props
}: Pick<
    React.ComponentProps<typeof Message>,
    | 'type'
    | 'senderName'
    | 'senderNameAs'
    | 'senderNameLabel'
    | 'timestamp'
    | 'timestampLabel'
    | 'contentText'
    | 'actionsPosition'
    | 'aria-label'
> & {
    href?: string;
    onPress?: () => void;
    error?: boolean;
    errorMessage?: string;
    asset?: boolean;
    decorativeAsset?: boolean;
    contentSlot?: boolean;
    footerSlot?: boolean;
    footerControl?: boolean;
    sideSlot?: boolean;
    actions?: boolean;
    onAsset?: () => void;
    assetLabel?: string;
    onAction?: () => void;
    onFooter?: () => void;
}): JSX.Element => (
    <Message
        {...props}
        {...(href ? {href} : onPress ? {onPress} : {})}
        {...(error ? {error: true, errorMessage: errorMessage ?? ''} : {error: false})}
        asset={
            asset ? (
                <span>Avatar</span>
            ) : decorativeAsset ? (
                <span role="img" aria-label="Avatar" />
            ) : undefined
        }
        {...(onAsset
            ? {onAssetPress: onAsset, assetLabel: assetLabel ?? ''}
            : {onAssetPress: undefined, assetLabel: undefined})}
        contentSlot={contentSlot ? <span>Details</span> : undefined}
        footerSlot={
            footerControl ? (
                <button onClick={onFooter}>Footer action</button>
            ) : footerSlot ? (
                <span>Footer</span>
            ) : undefined
        }
        sideSlot={sideSlot ? <span>Side</span> : undefined}
        actions={
            actions
                ? [{Icon: IconCopyRegular, 'aria-label': 'Copy', onPress: onAction ?? (() => {})}]
                : undefined
        }
    />
);
