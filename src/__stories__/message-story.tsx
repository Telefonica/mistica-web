import * as React from 'react';
import {
    Avatar,
    Box,
    Message,
    ResponsiveLayout,
    Stack,
    Text1,
    Text2,
    IconCopyRegular,
    IconCheckRegular,
    IconTimeRegular,
    Placeholder,
} from '..';

import type {Variant} from '../theme-variant-context';

type Args = {
    type: 'incoming' | 'outgoing';
    text: string;
    senderName: string;
    senderNameAs: 'span' | 'p' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    senderNameLabel: string;
    timestamp: string;
    timestampLabel: string;
    asset: boolean;
    interactiveAsset: boolean;
    assetLabel: string;
    boxed: boolean;
    maxWidth: string;
    position: 'standalone' | 'first' | 'middle' | 'last';
    error: boolean;
    errorMessage: string;
    interaction: 'none' | 'onPress' | 'href';
    ariaLabel: string;
    href: string;
    contentSlot: boolean;
    footer: boolean;
    side: boolean;
    actions: 'none' | 'side' | 'footer';
    variantOutside: Variant;
};

export default {
    title: 'Components/Message',
    parameters: {fullScreen: true},
    argTypes: {
        type: {options: ['incoming', 'outgoing'], control: 'select'},
        text: {control: 'text'},
        senderName: {control: 'text'},
        senderNameAs: {options: ['span', 'p', 'h2', 'h3', 'h4', 'h5', 'h6'], control: 'select'},
        senderNameLabel: {control: 'text'},
        timestamp: {control: 'text'},
        timestampLabel: {control: 'text'},
        asset: {control: 'boolean'},
        interactiveAsset: {control: 'boolean', if: {arg: 'asset'}},
        assetLabel: {control: 'text', if: {arg: 'interactiveAsset'}},
        boxed: {control: 'boolean'},
        maxWidth: {control: 'text'},
        position: {options: ['standalone', 'first', 'middle', 'last'], control: 'select'},
        error: {control: 'boolean'},
        errorMessage: {control: 'text', if: {arg: 'error'}},
        interaction: {options: ['none', 'onPress', 'href'], control: 'select'},
        ariaLabel: {control: 'text'},
        href: {control: 'text', if: {arg: 'interaction', eq: 'href'}},
        contentSlot: {control: 'boolean', if: {arg: 'error', eq: false}},
        footer: {control: 'boolean', if: {arg: 'error', eq: false}},
        side: {control: 'boolean', if: {arg: 'error', eq: false}},
        actions: {options: ['none', 'side', 'footer'], control: 'select', if: {arg: 'error', eq: false}},
        variantOutside: {
            options: ['default', 'brand', 'alternative', 'negative', 'media'],
            control: 'select',
        },
    },
};

export const Default: StoryComponent<Args> = (args) => {
    const actions = [
        {Icon: IconCopyRegular, 'aria-label': 'Copy message', onPress: () => window.alert('Copied')},
    ] as const;
    const content = args.error
        ? {error: true as const, errorMessage: args.errorMessage || undefined, text: args.text}
        : {
              ...(args.contentSlot ? {children: <Placeholder height={80} />} : {text: args.text}),
              footer: args.footer ? <Text1 regular>Delivered</Text1> : undefined,
              side: args.side ? <IconCheckRegular size={16} /> : undefined,
              ...(args.actions === 'side'
                  ? {sideActions: actions}
                  : args.actions === 'footer'
                    ? {footerActions: actions}
                    : {}),
          };
    return (
        <ResponsiveLayout variant={args.variantOutside} fullWidth>
            <Box padding={16} dataAttributes={{testid: 'messages'}}>
                <Message
                    {...content}
                    type={args.type}
                    senderName={args.senderName}
                    senderNameAs={args.senderNameAs}
                    senderNameLabel={args.senderNameLabel || undefined}
                    timestamp={args.timestamp}
                    timestampLabel={args.timestampLabel || undefined}
                    asset={args.asset ? <Avatar size={40} initials="JD" /> : undefined}
                    {...(args.interactiveAsset
                        ? {onAssetPress: () => window.alert('Profile'), assetLabel: args.assetLabel}
                        : {onAssetPress: undefined, assetLabel: undefined})}
                    boxed={args.boxed}
                    maxWidth={args.maxWidth}
                    position={args.position}
                    aria-label={args.ariaLabel || undefined}
                    {...(args.interaction === 'onPress'
                        ? {onPress: () => window.alert('Message')}
                        : args.interaction === 'href'
                          ? {href: args.href}
                          : {})}
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.args = {
    type: 'incoming',
    text: 'Lorem ipsum dolor sit amet et dolores voluptas.',
    senderName: 'John Doe',
    senderNameAs: 'span',
    senderNameLabel: '',
    timestamp: '13:32',
    timestampLabel: '13:32',
    asset: true,
    interactiveAsset: false,
    assetLabel: 'Open profile',
    boxed: true,
    maxWidth: '80%',
    position: 'standalone',
    error: false,
    errorMessage: '',
    interaction: 'none',
    ariaLabel: '',
    href: 'https://example.com',
    contentSlot: false,
    footer: false,
    side: false,
    actions: 'none',
    variantOutside: 'default',
};

export const Conversation: StoryComponent = () => {
    const [failed, setFailed] = React.useState(true);
    return (
        <Box padding={16} dataAttributes={{testid: 'messages'}}>
            <Stack space={16}>
                <Message
                    asset={<Avatar size={40} initials="AP" />}
                    senderName="Adriana"
                    text="Good afternoon! Can we confirm the visit?"
                    timestamp="16:45"
                />
                <Stack space={4}>
                    <Message text="I found three options." position="first" />
                    <Message text="Tuesday or Wednesday." position="middle" />
                    <Message text="Thursday works too." position="last" />
                </Stack>
                {failed ? (
                    <Message type="outgoing" text="Tuesday, please." error onPress={() => setFailed(false)} />
                ) : (
                    <Message type="outgoing" text="Tuesday, please." timestamp="16:50" />
                )}
                <Message type="outgoing" text="Hi!" timestamp="16:51" />
                <Message
                    text="I'll send the details."
                    boxed={false}
                    senderName="Adriana"
                    footer={<IconTimeRegular size={16} />}
                />
                <Message
                    senderName="Adriana"
                    footer={<Text1 regular>Delivery details</Text1>}
                    footerActions={[
                        {
                            Icon: IconCopyRegular,
                            'aria-label': 'Copy details',
                            onPress: () => window.alert('Copied'),
                        },
                    ]}
                >
                    <Text2 regular>Custom content</Text2>
                </Message>
            </Stack>
        </Box>
    );
};
