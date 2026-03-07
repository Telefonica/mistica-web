import React from 'react';
import {NakedCard} from '../card-naked';
import figma from '@figma/code-connect';
import {
    Avatar,
    Image,
    Circle,
    skinVars,
    IconLightningRegular,
    ButtonPrimary,
    ButtonSecondary,
    ButtonLink,
    IconStarFilled,
    IconStarRegular,
} from '../../dist';

const nakedCardProps = {
    size: figma.enum('Size', {
        Display: 'display',
        Default: undefined,
        Snap: 'snap',
    }),
    // imageSrc: figma.enum('Background', {
    //     Image: 'https://example.com/image.jpg',
    // }),
    videoSrc: figma.boolean('Video controls', {
        true: 'https://example.com/video.mp4',
        false: undefined,
    }),
    aspectRatio: figma.enum('Aspect ratio', {
        true: '7:10',
        false: undefined,
    }),
    asset: figma.nestedProps('Asset', {
        type: figma.enum('Asset type', {
            Icon: <IconLightningRegular size={24} color={skinVars.colors.brand} />,
            'Circle icon': (
                <Circle size={40}>
                    <IconLightningRegular size={24} color={skinVars.colors.brand} />
                </Circle>
            ),
            Avatar: <Avatar size={40} src="https://example.com/avatar.jpg" />,
            Image: <Image src="https://example.com/image.jpg" />,
            Slot: figma.children('*'),
        }),
    }),
    headline: figma.boolean('Tag', {
        true: figma.children('Tag [D]'),
        false: undefined,
    }),
    pretitle: figma.boolean('Pretitle', {
        true: figma.textContent('Pretitle'),
        false: undefined,
    }),
    title: figma.boolean('Title', {
        true: figma.textContent('Title'),
        false: undefined,
    }),
    subtitle: figma.boolean('Subtitle', {
        true: figma.textContent('Subtitle'),
        false: undefined,
    }),
    description: figma.boolean('Description', {
        true: figma.textContent('Description'),
        false: undefined,
    }),
    topActions: figma.boolean('Top actions', {
        true: [
            {
                Icon: IconLightningRegular,
                onPress: () => {},
                label: 'Icon',
            },
            {
                checkedProps: {
                    Icon: IconStarFilled,
                    label: 'checked',
                },
                uncheckedProps: {
                    Icon: IconStarRegular,
                    label: 'unchecked',
                },
                defaultChecked: false,
                onChange: () => {},
            },
        ],
        false: undefined,
    }),
    slot: figma.boolean('Slot', {
        true: figma.instance('🔄 Replace slot'),
        false: undefined,
    }),
    onPress: figma.boolean('Actions', {
        true: undefined,
        false: () => {},
    }),
    buttonPrimary: figma.boolean('Actions', {
        true: <ButtonPrimary onPress={() => {}}>Primary</ButtonPrimary>,
        false: undefined,
    }),
    buttonSecondary: figma.boolean('Actions', {
        true: <ButtonSecondary onPress={() => {}}>Secondary</ButtonSecondary>,
        false: undefined,
    }),
    buttonLink: figma.boolean('Actions', {
        true: <ButtonLink onPress={() => {}}>Link</ButtonLink>,
        false: undefined,
    }),
    showFooter: figma.enum('Footer', {
        true: true,
        false: false,
    }),
    footerSlot: figma.boolean('Footer slot', {
        true: figma.instance('🔄 Replace footer slot'),
        false: undefined,
    }),
};

// Desktop
figma.connect(
    NakedCard,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10867%3A12291',
    {
        props: nakedCardProps,
        example: (props) => (
            <NakedCard
                size={props.size}
                aspectRatio={props.aspectRatio}
                // imageSrc={props.imageSrc}
                videoSrc={props.videoSrc}
                asset={props.asset.type}
                headline={props.headline}
                pretitle={props.pretitle}
                title={props.title}
                subtitle={props.subtitle}
                description={props.description}
                onPress={props.onPress}
                topActions={props.topActions}
                showFooter={props.showFooter}
                slot={props.slot}
                footerSlot={props.footerSlot}
                buttonPrimary={props.buttonPrimary}
                buttonSecondary={props.buttonSecondary}
                buttonLink={props.buttonLink}
            />
        ),
    }
);

// Mobile
figma.connect(
    NakedCard,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=22748%3A12424',
    {
        props: nakedCardProps,
        example: (props) => (
            <NakedCard
                size={props.size}
                aspectRatio={props.aspectRatio}
                // imageSrc={props.imageSrc}
                videoSrc={props.videoSrc}
                asset={props.asset.type}
                headline={props.headline}
                pretitle={props.pretitle}
                title={props.title}
                subtitle={props.subtitle}
                description={props.description}
                onPress={props.onPress}
                topActions={props.topActions}
                showFooter={props.showFooter}
                slot={props.slot}
                footerSlot={props.footerSlot}
                buttonPrimary={props.buttonPrimary}
                buttonSecondary={props.buttonSecondary}
                buttonLink={props.buttonLink}
            />
        ),
    }
);
