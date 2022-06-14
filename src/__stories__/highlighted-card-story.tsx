import * as React from 'react';
import HighlightedCard from '../highlighted-card';
import {StorySection, useCheckbox, useTextField, useSelect} from './helpers';
import {ButtonPrimary, ButtonSecondary, ButtonLink} from '../button';
import {Box, Stack, ThemeVariant, Text1} from '..';

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
                    <ButtonLink href="#" aligned>
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
            imageUrl={image !== 'none' ? 'https://i.imgur.com/jeDSXBU.jpg' : undefined}
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

export const CustomCardSize: StoryComponent = () => {
    return (
        <div
            style={{display: 'flex', background: '#eee', overflowX: 'auto', justifyContent: 'flex-start'}}
            data-testid="highlighted-card"
        >
            <HighlightedCard
                width={250}
                title="Title 1"
                description="Some description here"
                imageUrl="https://i.imgur.com/jeDSXBU.jpg"
                imageFit="fit"
                onClose={() => {}}
            />

            <Box paddingRight={8} />

            <HighlightedCard
                width={250}
                title="Title 2"
                description="Some description here"
                imageUrl="https://i.imgur.com/jeDSXBU.jpg"
                imageFit="fit"
                button={
                    <ButtonPrimary small href="https://google.com">
                        Action
                    </ButtonPrimary>
                }
            />

            <Box paddingRight={8} />

            <HighlightedCard
                width={250}
                title="Title 3"
                description="Some description here. Some description here."
                imageUrl="https://i.imgur.com/jeDSXBU.jpg"
                imageFit="fit"
                button={
                    <ButtonPrimary small href="https://google.com">
                        Action
                    </ButtonPrimary>
                }
            />

            <Box paddingRight={8} />

            <HighlightedCard
                width={250}
                onClose={() => {}}
                onPress={() => {}}
                title="Title 4"
                description="Some description here. Some description here. Some description here. "
                imageUrl="https://i.imgur.com/jeDSXBU.jpg"
                imageFit="fit"
            />
        </div>
    );
};

const CardWrapper: React.FC = ({children}) => (
    <div style={{display: 'flex', width: '18%', marginRight: 8}}>{children}</div>
);

export const CustomCardSizeInsideWrapper: StoryComponent = () => {
    return (
        <div style={{display: 'flex', background: '#eee'}} data-testid="highlighted-card">
            <CardWrapper>
                <HighlightedCard title="Title1" description="Simple" />
            </CardWrapper>

            <CardWrapper>
                <HighlightedCard title="Title2" description="Dismisseable" onClose={() => {}} />
            </CardWrapper>

            <CardWrapper>
                <HighlightedCard title="Title3" description="Touchable card" onPress={() => {}} />
            </CardWrapper>

            <CardWrapper>
                <HighlightedCard
                    title="Title4"
                    description="Touchable and dismisseable"
                    onPress={() => {}}
                    onClose={() => {}}
                />
            </CardWrapper>

            <CardWrapper>
                <HighlightedCard
                    title="Title5"
                    description="Super long description. Super long description. Super long description. Super long description."
                    onClose={() => {}}
                />
            </CardWrapper>
        </div>
    );
};
