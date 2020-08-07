import * as React from 'react';
import HighlightedCard from '../highlighted-card';
import {StorySection, useCheckbox, useTextField, useSelect} from './helpers';
import {Placeholder} from '../placeholder';
import {ButtonPrimary, ButtonSecondary} from '../button';
import TextLink from '../text-link';
import {Box, Stack} from '..';

export default {
    title: 'Components|Cards/Highlighted Card',
};

export const Default: StoryComponent = () => {
    const [title, titleTextField] = useTextField('title', 'Resolver problema técnico', true);
    const [paragraph, paragraphTextField] = useTextField(
        'paragraph',
        'Usa nuestra herramienta para resolver tus problemas técnicos',
        true
    );
    const [isInverse, inverseCheckbox] = useCheckbox('Inverse context', false);
    const [image, imageCheckbox] = useCheckbox('With Image', true);
    const [action, actionSelect] = useSelect('Action type', 'ButtonPrimary', [
        'ButtonPrimary',
        'ButtonSecondary',
        'TextLink',
        'None',
    ]);

    const getAction = (action: string) => {
        switch (action) {
            case 'ButtonPrimary':
                return (
                    <ButtonPrimary href="whatever/url" small>
                        ButtonPrimary
                    </ButtonPrimary>
                );
            case 'ButtonSecondary':
                return (
                    <ButtonSecondary href="whatever/url" small>
                        ButtonSecondary
                    </ButtonSecondary>
                );
            case 'TextLink':
                return (
                    <TextLink href="whatever/url" small>
                        ButtonLink
                    </TextLink>
                );
            case 'None':
            default:
                return null;
        }
    };

    return (
        <>
            <Box paddingX={16}>
                <Stack space={16}>
                    <Box paddingTop={16}>
                        <p>Highlighted options:</p>
                    </Box>
                    {titleTextField}
                    {paragraphTextField}
                    {inverseCheckbox}
                    {imageCheckbox}
                    {actionSelect}
                </Stack>
            </Box>
            <div data-testid="highlighted-card">
                <StorySection title="HighlightedCard">
                    <HighlightedCard
                        title={title}
                        paragraph={paragraph}
                        isInverse={isInverse}
                        image={image ? <Placeholder height={100} /> : ''}
                        action={getAction(action)}
                    />
                </StorySection>
            </div>
        </>
    );
};

Default.story = {name: 'HighlightedCard'};
