import * as React from 'react';
import {
    Avatar,
    Image,
    IconMobileDeviceRegular,
    Box,
    Message,
    ResponsiveLayout,
    Stack,
    Text,
    Text1,
    Text3,
    IconCopyRegular,
    IconCheckRegular,
    IconTimeRegular,
    Placeholder,
    skinVars,
} from '..';
import avatarImg from './images/avatar.jpg';

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
    avatarSize: number;
    assetType: 'avatar' | 'image' | 'icon';
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
    actions: boolean;
    actionsPosition: 'side' | 'footer';
    actionsCount: 1 | 2;
    variantOutside: Variant;
};

const defaultArgs: Args = {
    type: 'incoming',
    text: 'Lorem ipsum dolor sit amet et dolores voluptas.',
    senderName: 'John Doe',
    senderNameAs: 'span',
    senderNameLabel: '',
    timestamp: '13:32',
    timestampLabel: '13:32',
    asset: true,
    avatarSize: 40,
    assetType: 'avatar',
    interactiveAsset: false,
    assetLabel: 'Open profile',
    boxed: true,
    maxWidth: '80%',
    position: 'standalone',
    error: false,
    errorMessage: 'Error text',
    interaction: 'none',
    ariaLabel: '',
    href: 'https://example.com',
    contentSlot: false,
    footer: false,
    side: false,
    actions: false,
    actionsPosition: 'footer',
    actionsCount: 1,
    variantOutside: 'default',
};

export default {
    title: 'Components/Message',
    args: defaultArgs,
    parameters: {fullScreen: true, controls: {expanded: false}},
    argTypes: {
        type: {options: ['incoming', 'outgoing'], control: 'select'},
        text: {control: 'text'},
        senderName: {control: 'text'},
        senderNameAs: {
            options: ['span', 'p', 'h2', 'h3', 'h4', 'h5', 'h6'],
            control: 'select',
            description: 'HTML element for the sender name. Changes semantics, not typography.',
        },
        senderNameLabel: {control: 'text'},
        timestamp: {control: 'text'},
        timestampLabel: {control: 'text'},
        asset: {control: 'boolean'},
        assetType: {options: ['avatar', 'image', 'icon'], control: 'select', if: {arg: 'asset'}},
        avatarSize: {control: 'number', if: {arg: 'assetType', eq: 'avatar'}},
        interactiveAsset: {control: 'boolean', if: {arg: 'asset'}},
        assetLabel: {control: 'text', if: {arg: 'interactiveAsset'}},
        boxed: {
            control: 'boolean',
            description: 'Show the bubble background and padding. False renders an unboxed message.',
        },
        maxWidth: {control: 'text'},
        position: {
            options: ['standalone', 'first', 'middle', 'last'],
            control: 'select',
            if: {arg: 'boxed'},
        },
        error: {control: 'boolean'},
        errorMessage: {control: 'text'},
        interaction: {options: ['none', 'onPress', 'href'], control: 'select'},
        ariaLabel: {control: 'text'},
        href: {control: 'text', if: {arg: 'interaction', eq: 'href'}},
        contentSlot: {control: 'boolean', if: {arg: 'error', eq: false}},
        footer: {control: 'boolean', if: {arg: 'error', eq: false}},
        side: {control: 'boolean', if: {arg: 'error', eq: false}},
        actions: {control: 'boolean', if: {arg: 'error', eq: false}},
        actionsPosition: {
            options: ['side', 'footer'],
            control: 'radio',
            if: {arg: 'actions'},
        },
        actionsCount: {options: [1, 2], control: 'radio', if: {arg: 'error', eq: false}},
        variantOutside: {
            options: ['default', 'brand', 'alternative', 'negative', 'media'],
            control: 'select',
        },
    },
};

const getAsset = (args: Args, initials: string) => {
    if (!args.asset) {
        return undefined;
    }
    switch (args.assetType) {
        case 'image':
            return <Image src={avatarImg} width={40} aspectRatio="1:1" />;
        case 'icon':
            return <IconMobileDeviceRegular size={24} />;
        default:
            return <Avatar size={args.avatarSize} initials={initials} />;
    }
};

const MessageExample = (args: Args) => {
    const copyAction = {
        Icon: IconCopyRegular,
        'aria-label': 'Copy message',
        onPress: () => window.alert('Copied'),
    };
    const reminderAction = {
        Icon: IconTimeRegular,
        'aria-label': 'Remind me later',
        onPress: () => window.alert('Reminder set'),
    };
    const actions =
        args.actionsCount === 2 ? ([copyAction, reminderAction] as const) : ([copyAction] as const);
    const content = args.error
        ? {error: true as const, errorMessage: args.errorMessage, text: args.text}
        : {
              ...(args.contentSlot ? {contentSlot: <Placeholder height={80} />} : {text: args.text}),
              footer: args.footer ? <Text1 regular>Delivered</Text1> : undefined,
              side: args.side ? <IconCheckRegular size={16} /> : undefined,
              actions: args.actions ? actions : undefined,
              actionsPosition: args.actionsPosition,
          };
    return (
        <Message
            {...content}
            type={args.type}
            senderName={args.senderName}
            senderNameAs={args.senderNameAs}
            senderNameLabel={args.senderNameLabel || undefined}
            timestamp={args.timestamp}
            timestampLabel={args.timestampLabel || undefined}
            asset={getAsset(args, 'JD')}
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
    );
};

export const Default: StoryComponent<Args> = (args) => (
    <ResponsiveLayout
        variant={args.variantOutside}
        backgroundColor={args.variantOutside === 'media' ? skinVars.colors.backgroundNegative : undefined}
        fullWidth
    >
        <Box padding={16} dataAttributes={{testid: 'messages'}}>
            <MessageExample {...args} />
        </Box>
    </ResponsiveLayout>
);

export const Conversation: StoryComponent<Args> = (args) => {
    const [failed, setFailed] = React.useState(true);
    const common = {boxed: args.boxed, maxWidth: args.maxWidth, senderNameAs: args.senderNameAs};
    return (
        <ResponsiveLayout
            variant={args.variantOutside}
            backgroundColor={args.variantOutside === 'media' ? skinVars.colors.backgroundNegative : undefined}
            fullWidth
        >
            <Box padding={16} dataAttributes={{testid: 'messages'}}>
                <Stack space={16}>
                    <Message
                        {...common}
                        asset={getAsset(args, 'AP')}
                        senderName={args.senderName}
                        text={args.text}
                        timestamp={args.timestamp}
                    />
                    <Stack space={4}>
                        <Message {...common} text="I found three options." position="first" />
                        <Message {...common} text="Tuesday or Wednesday." position="middle" />
                        <Message {...common} text="Thursday works too." position="last" />
                    </Stack>
                    {failed ? (
                        <Message
                            {...common}
                            type="outgoing"
                            text="Tuesday, please."
                            error
                            errorMessage={args.errorMessage}
                            onPress={() => setFailed(false)}
                        />
                    ) : (
                        <Message {...common} type="outgoing" text="Tuesday, please." timestamp="16:50" />
                    )}
                    <Message {...common} type="outgoing" text="Hi!" timestamp="16:51" />
                    <Message
                        text="I'll send the details."
                        boxed={false}
                        senderName={args.senderName}
                        senderNameAs={args.senderNameAs}
                        footer={<IconTimeRegular size={16} />}
                    />
                    <MessageExample {...args} asset={false} text="Custom content" timestamp="" />
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};
Conversation.args = {
    ...defaultArgs,
    senderName: 'Adriana',
    text: 'Good afternoon! Can we confirm the visit?',
    timestamp: '16:45',
    footer: true,
    actions: true,
    actionsPosition: 'footer',
};
Conversation.parameters = {
    controls: {
        include: [
            'text',
            'senderName',
            'senderNameAs',
            'timestamp',
            'asset',
            'assetType',
            'avatarSize',
            'errorMessage',
            'boxed',
            'maxWidth',
            'variantOutside',
            'contentSlot',
            'footer',
            'side',
            'actions',
            'actionsPosition',
            'actionsCount',
        ],
    },
};

type ErrorArgs = Args & {shortText: string; shortErrorMessage: string; longErrorMessage: string};
export const ErrorExamples: StoryComponent<ErrorArgs> = (args) => (
    <ResponsiveLayout
        variant={args.variantOutside}
        backgroundColor={args.variantOutside === 'media' ? skinVars.colors.backgroundNegative : undefined}
        fullWidth
    >
        <Box padding={16} dataAttributes={{testid: 'messages'}}>
            <Stack space={32}>
                <MessageExample {...args} error />
                <MessageExample {...args} error errorMessage={args.longErrorMessage} />
                <MessageExample {...args} error text={args.shortText} errorMessage={args.shortErrorMessage} />
            </Stack>
        </Box>
    </ResponsiveLayout>
);
ErrorExamples.args = {
    ...defaultArgs,
    type: 'outgoing',
    error: true,
    asset: false,
    senderName: '',
    variantOutside: 'alternative',
    errorMessage: "Couldn't send. Tap to retry",
    shortText: 'Ok',
    shortErrorMessage: 'Error message long text.',
    longErrorMessage:
        'Error message long text. Error long text. Error message long text. Error message long text.',
};
ErrorExamples.argTypes = {
    shortText: {control: 'text'},
    shortErrorMessage: {control: 'text'},
    longErrorMessage: {control: 'text'},
};
ErrorExamples.parameters = {
    controls: {
        include: [
            'type',
            'text',
            'errorMessage',
            'shortText',
            'shortErrorMessage',
            'longErrorMessage',
            'asset',
            'assetType',
            'avatarSize',
            'boxed',
            'maxWidth',
            'variantOutside',
        ],
    },
};

export const SlotsAndActions: StoryComponent<Args> = (args) => (
    <ResponsiveLayout
        variant={args.variantOutside}
        backgroundColor={args.variantOutside === 'media' ? skinVars.colors.backgroundNegative : undefined}
        fullWidth
    >
        <Box padding={16} dataAttributes={{testid: 'messages'}}>
            <Stack space={24}>
                <MessageExample {...args} type="incoming" />
                <MessageExample {...args} type="outgoing" />
            </Stack>
        </Box>
    </ResponsiveLayout>
);
SlotsAndActions.args = {
    ...defaultArgs,
    contentSlot: true,
    footer: true,
    side: true,
    actions: true,
    actionsPosition: 'footer',
    actionsCount: 2,
};
SlotsAndActions.parameters = {
    controls: {
        include: [
            'text',
            'senderName',
            'senderNameAs',
            'timestamp',
            'asset',
            'assetType',
            'avatarSize',
            'interactiveAsset',
            'assetLabel',
            'boxed',
            'maxWidth',
            'variantOutside',
            'contentSlot',
            'footer',
            'side',
            'actions',
            'actionsPosition',
            'actionsCount',
        ],
    },
};

export const ContentTypography: StoryComponent<Args> = (args) => (
    <ResponsiveLayout fullWidth variant={args.variantOutside}>
        <Box padding={16}>
            <Stack space={16}>
                <Message boxed={args.boxed} text="Default text" />
                <Message boxed={args.boxed} contentSlot="Plain content" />
                <Message boxed={args.boxed} contentSlot={<Text>Inherited text</Text>} />
                <Message boxed={args.boxed} contentSlot={<Text3 bold>Custom text</Text3>} />
                <Text3 bold>Custom reference</Text3>
            </Stack>
        </Box>
    </ResponsiveLayout>
);
ContentTypography.parameters = {controls: {include: ['boxed', 'variantOutside']}};
