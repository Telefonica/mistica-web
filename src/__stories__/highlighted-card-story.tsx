import * as React from 'react';
import HighlightedCard from '../highlighted-card';
import {StorySection, useCheckbox, useTextField, useSelect} from './helpers';
import {ButtonPrimary, ButtonSecondary} from '../button';
import TextLink from '../text-link';
import {Box, Stack} from '..';
import {imagePlaceholder} from '../placeholder';

export default {
    title: 'Components|Cards/HighlightedCard',
};

export const Default: StoryComponent = () => {
    const [title, titleTextField] = useTextField('title', 'Resolver problema técnico', true);
    const [paragraph, paragraphTextField] = useTextField(
        'paragraph',
        'Usa nuestra herramienta para resolver tus problemas técnicos',
        true
    );
    const [href, hrefTextField] = useTextField('href *', 'url/url');
    const [isInverse, inverseCheckbox] = useCheckbox('Is inverse', false);
    const [image, imageCheckbox] = useCheckbox('With Image', true);
    const [isClosable, closableCheckbox] = useCheckbox('Is closable', false);
    const [action, actionSelect] = useSelect('Action type', 'ButtonPrimary', [
        'ButtonPrimary',
        'ButtonSecondary',
        'TextLink',
        'None',
    ]);
    const [imageBackgroundSize, imageBackgroundSizeSelect] = useSelect('Image background-size', 'cover', [
        'auto',
        'contain',
        'cover',
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
                        TextLink
                    </TextLink>
                );
            case 'None':
            default:
                return null;
        }
    };

    return (
        <>
            <Stack space={16}>
                <Box paddingTop={16}>
                    <p>Highlighted options:</p>
                </Box>
                {titleTextField}
                {paragraphTextField}
                {hrefTextField}
                <span style={{fontSize: 12}}>
                    * This could be <b>to | href | onPress</b> prop. If any of these prop is set without an
                    action all card will be clickable.
                </span>
                {actionSelect}
                {imageBackgroundSizeSelect}
                {imageCheckbox}
                {inverseCheckbox}
                {closableCheckbox}
            </Stack>
            <div data-testid="highlighted-card">
                <StorySection title="HighlightedCard">
                    <HighlightedCard
                        title={title}
                        paragraph={paragraph}
                        isInverse={isInverse}
                        image={image ? imagePlaceholder : ''}
                        imageBackgroundSize={imageBackgroundSize}
                        action={getAction(action)}
                        isClosable={isClosable}
                        href={href}
                    />
                </StorySection>
            </div>
        </>
    );
};

Default.story = {name: 'HighlightedCard'};
