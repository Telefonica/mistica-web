import * as React from 'react';
import {
    DisplayDataCard,
    ButtonPrimary,
    ButtonLink,
    IconInvoicePlanFileRegular,
    skinVars,
    Circle,
    Tag,
    TagType,
    Image,
    ButtonSecondary,
    IconLightningRegular,
} from '..';
import {Placeholder} from '../placeholder';

export default {
    title: 'Components/Cards/Display data card',
};

type DisplayDataCardArgs = {
    asset: 'icon' | 'circle + icon' | 'image' | 'circle + image';
    headlineType: TagType;
    headline: string;
    pretitle: string;
    title: string;
    description: string;
    withExtra: boolean;
    closable: boolean;
    withTopAction: boolean;
    actions: 'button' | 'link' | 'button and link' | 'button and secondary button';
    isInverse: boolean;
};

export const Default: StoryComponent<DisplayDataCardArgs> = ({
    asset = 'icon',
    headline,
    headlineType,
    pretitle,
    title,
    description,
    withExtra,
    actions = 'button',
    closable,
    withTopAction,
    isInverse,
}) => {
    let icon;
    if (asset === 'circle + icon') {
        icon = (
            <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                <IconInvoicePlanFileRegular color={skinVars.colors.brand} />
            </Circle>
        );
    } else if (asset === 'circle + image') {
        icon = <Circle size={40} backgroundImage="https://i.imgur.com/QwNlo5s.png" />;
    } else if (asset === 'icon') {
        icon = <IconInvoicePlanFileRegular size={40} />;
    } else if (asset === 'image') {
        icon = <Image src="https://i.imgur.com/QwNlo5s.png" width={40} height={40} />;
    }

    const button = actions.includes('button') ? (
        <ButtonPrimary small fake>
            Action
        </ButtonPrimary>
    ) : undefined;

    const buttonLink = actions.includes('link') ? <ButtonLink href="#">Link</ButtonLink> : undefined;
    const secondaryButton = actions.includes('secondary') ? (
        <ButtonSecondary small fake>
            Action 2
        </ButtonSecondary>
    ) : undefined;

    return (
        <DisplayDataCard
            isInverse={isInverse}
            onClose={closable ? () => {} : undefined}
            actions={
                withTopAction
                    ? [
                          {
                              Icon: IconLightningRegular,
                              onPress: () => {},
                              label: 'Lightning',
                          },
                      ]
                    : undefined
            }
            icon={icon}
            headline={headline ? <Tag type={headlineType}>{headline}</Tag> : undefined}
            pretitle={pretitle}
            title={title}
            description={description}
            extra={withExtra ? <Placeholder /> : undefined}
            button={button}
            buttonLink={buttonLink}
            secondaryButton={secondaryButton}
            dataAttributes={{testid: 'display-data-card'}}
            aria-label="Display data card label"
        />
    );
};

Default.storyName = 'Display Data card';
Default.args = {
    asset: 'icon',
    headlineType: 'promo',
    headline: 'Priority',
    pretitle: 'Pretitle',
    title: 'Title',
    description: 'This is a description for the card',
    withExtra: false,
    actions: 'button',
    closable: false,
    withTopAction: false,
    isInverse: false,
};
Default.argTypes = {
    asset: {
        options: ['icon', 'circle + icon', 'image', 'circle + image', 'none'],
        control: {type: 'select'},
    },
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error'],
        control: {type: 'select'},
    },
    actions: {
        options: ['button', 'link', 'button and link', 'button and secondary button'],
        control: {type: 'select'},
    },
};
