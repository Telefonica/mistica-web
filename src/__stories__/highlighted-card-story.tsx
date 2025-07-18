import * as React from 'react';
import {
    HighlightedCard,
    ButtonPrimary,
    ButtonSecondary,
    ButtonLink,
    ResponsiveLayout,
    Stack,
    Text2,
    Carousel,
} from '..';
import personPortraitImg from './images/person-portrait.jpg';

export default {
    title: 'Private/Deprecated Card Stories/HighlightedCard',
};

type Args = {
    title: string;
    description: string;
    actions: 'ButtonPrimary' | 'ButtonSecondary' | 'ButtonLink' | 'onPress' | 'none';
    image: 'fit' | 'fill' | 'none';
    inverse: boolean;
    closable: boolean;
};

export const Default: StoryComponent<Args> = ({
    title,
    description,
    actions = 'ButtonPrimary',
    image = 'fit',
    inverse,
    closable,
}) => {
    const getButton = (action: string) => {
        switch (action) {
            case 'ButtonPrimary':
                return (
                    <ButtonPrimary href="#" small>
                        ButtonPrimary
                    </ButtonPrimary>
                );
            case 'ButtonSecondary':
                return (
                    <ButtonSecondary href="#" small>
                        ButtonSecondary
                    </ButtonSecondary>
                );
            case 'ButtonLink':
                return (
                    <ButtonLink small href="#" bleedLeft>
                        TextLink
                    </ButtonLink>
                );
            case 'none':
            default:
                return undefined;
        }
    };

    const actionProps =
        actions === 'none' ? {} : actions === 'onPress' ? {onPress: () => {}} : {button: getButton(actions)};

    return (
        <HighlightedCard
            title={title}
            description={description}
            imageUrl={image !== 'none' ? personPortraitImg : undefined}
            imageFit={image !== 'none' ? image : undefined}
            dataAttributes={{testid: 'highlighted-card'}}
            isInverse={inverse}
            onClose={closable ? () => {} : undefined}
            {...actionProps}
        />
    );
};

Default.storyName = 'HighlightedCard';
Default.args = {
    title: 'Resolver problema técnico',
    description: 'Usa nuestra herramienta para resolver tus problemas técnicos',
    actions: 'ButtonPrimary',
    image: 'fit',
    inverse: false,
    closable: false,
};

Default.argTypes = {
    actions: {
        options: ['ButtonPrimary', 'ButtonSecondary', 'ButtonLink', 'onPress', 'none'],
        control: {type: 'select'},
    },
    image: {
        options: ['fit', 'fill', 'none'],
        control: {type: 'select'},
    },
};

export const Group: StoryComponent = () => {
    return (
        <ResponsiveLayout>
            <Stack space={16}>
                <Text2 regular>
                    We can group multiple cards and they adjust to the same height. The card actions are
                    always fixed on bottom.
                </Text2>
                <Carousel
                    itemsPerPage={3}
                    items={[
                        <HighlightedCard
                            title="Title 1"
                            description="Some description here"
                            imageUrl={personPortraitImg}
                            imageFit="fill"
                            onClose={() => {}}
                        />,
                        <HighlightedCard
                            title="Title 2"
                            description="Some description here"
                            imageUrl={personPortraitImg}
                            imageFit="fill"
                            button={
                                <ButtonPrimary small href="https://google.com">
                                    Action
                                </ButtonPrimary>
                            }
                        />,
                        <HighlightedCard
                            onClose={() => {}}
                            onPress={() => {}}
                            title="Title 4"
                            description="Some description here. Some description here. Some description here. "
                            imageUrl={personPortraitImg}
                            imageFit="fill"
                        />,
                    ]}
                />
            </Stack>
        </ResponsiveLayout>
    );
};

Group.storyName = 'HighlightedCard group';
