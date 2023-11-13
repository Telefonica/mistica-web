import * as React from 'react';
import {
    HighlightedCard,
    ButtonPrimary,
    ButtonSecondary,
    ButtonLink,
    ResponsiveLayout,
    Stack,
    Text2,
    Inline,
} from '..';
import personPortraitImg from './images/person-portrait.jpg';

export default {
    title: 'Components/Cards/HighlightedCard',
};

type Args = {
    title: string;
    description: string;
    action: 'ButtonPrimary' | 'ButtonSecondary' | 'ButtonLink' | 'touchable' | 'none';
    image: 'fit' | 'fill' | 'none';
    inverse: boolean;
    closable: boolean;
};

export const Default: StoryComponent<Args> = ({
    title,
    description,
    action = 'ButtonPrimary',
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
                    <ButtonLink href="#" bleedLeft>
                        TextLink
                    </ButtonLink>
                );
            case 'none':
            default:
                return undefined;
        }
    };

    return (
        <HighlightedCard
            title={title}
            description={description}
            imageUrl={image !== 'none' ? personPortraitImg : undefined}
            imageFit={image !== 'none' ? image : undefined}
            dataAttributes={{testid: 'highlighted-card'}}
            button={getButton(action) as any}
            onPress={action === 'touchable' ? () => {} : undefined}
            isInverse={inverse}
            onClose={closable ? () => {} : undefined}
        />
    );
};

Default.storyName = 'HighlightedCard';
Default.args = {
    title: 'Resolver problema técnico',
    description: 'Usa nuestra herramienta para resolver tus problemas técnicos',
    action: 'ButtonPrimary',
    image: 'fit',
    inverse: false,
    closable: false,
};

Default.argTypes = {
    action: {
        options: ['ButtonPrimary', 'ButtonSecondary', 'ButtonLink', 'touchable', 'none'],
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
                    always fixed on bottom
                </Text2>
                <style>{`.group > * {display: flex}`}</style>
                <Inline space={16} className="group">
                    <HighlightedCard
                        width={250}
                        title="Title 1"
                        description="Some description here"
                        imageUrl={personPortraitImg}
                        imageFit="fill"
                        onClose={() => {}}
                    />
                    <HighlightedCard
                        width={250}
                        title="Title 2"
                        description="Some description here"
                        imageUrl={personPortraitImg}
                        imageFit="fill"
                        button={
                            <ButtonPrimary small href="https://google.com">
                                Action
                            </ButtonPrimary>
                        }
                    />
                    <HighlightedCard
                        width={250}
                        onClose={() => {}}
                        onPress={() => {}}
                        title="Title 4"
                        description="Some description here. Some description here. Some description here. "
                        imageUrl={personPortraitImg}
                        imageFit="fill"
                    />
                </Inline>
            </Stack>
        </ResponsiveLayout>
    );
};

Group.storyName = 'HighlightedCard group';
