import * as React from 'react';
import {ButtonLink, ButtonPrimary, ButtonSecondary, CoverCard, Placeholder} from '..';
import {
    commonArgTypes,
    defaultCommonCardArgs,
    getAsset,
    getTopActions,
    imageAndVideoArgTypes,
    imageNameToUrl,
    normalizeAspectRatio,
    ThemeVariantWrapper,
    videoNameToUrl,
} from './card-common';

import type {CardAspectRatio, DefaultOrInverseVariant} from '../card-internal';
import type {CommonCardArgs} from './card-common';

export default {
    title: 'Components/Cards/CoverCard',
    parameters: {
        fullScreen: true,
    },
};

type CoverCardArgs = CommonCardArgs & {
    backgroundColor: string;
    imageSrc: string;
    videoSrc: string;
};

export const Default: StoryComponent<CoverCardArgs> = ({
    asset,
    variant,
    variantOutside,
    aspectRatio,
    onClose,
    onPress,
    topActions,
    buttonPrimary,
    buttonSecondary,
    buttonLink,
    footerVariant,
    imageSrc,
    videoSrc,
    slot,
    footerSlot,
    titleAs,
    pretitleAs,
    ...args
}) => {
    return (
        <ThemeVariantWrapper variant={variantOutside}>
            <CoverCard
                titleAs={titleAs || undefined}
                pretitleAs={pretitleAs || undefined}
                asset={getAsset(asset)}
                variant={(variant as DefaultOrInverseVariant) || undefined}
                footerVariant={footerVariant || undefined}
                aspectRatio={normalizeAspectRatio(aspectRatio) as CardAspectRatio}
                topActions={getTopActions(topActions)}
                imageSrc={imageNameToUrl[imageSrc as never]}
                videoSrc={videoNameToUrl[videoSrc as never]}
                slot={slot ? <Placeholder height={50} /> : undefined}
                footerSlot={slot ? <Placeholder height={50} /> : undefined}
                buttonPrimary={
                    buttonPrimary ? (
                        <ButtonPrimary small onPress={() => {}}>
                            Button Primary
                        </ButtonPrimary>
                    ) : undefined
                }
                buttonSecondary={
                    buttonSecondary ? (
                        <ButtonSecondary small onPress={() => {}}>
                            Button Secondary
                        </ButtonSecondary>
                    ) : undefined
                }
                buttonLink={
                    buttonLink ? (
                        <ButtonLink small onPress={() => {}} withChevron>
                            Button Link
                        </ButtonLink>
                    ) : undefined
                }
                onClose={onClose ? () => {} : undefined}
                onPress={onPress ? () => {} : undefined}
                {...args}
            />
        </ThemeVariantWrapper>
    );
};

Default.storyName = 'CoverCard';

Default.args = {
    ...defaultCommonCardArgs,
    backgroundColor: '',
    imageSrc: 'beach',
    videoSrc: 'undefined',
};

Default.argTypes = {
    ...commonArgTypes,
    ...imageAndVideoArgTypes,
};
