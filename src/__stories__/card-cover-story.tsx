import * as React from 'react';
import {CoverCard, Placeholder} from '..';
import {
    commonArgTypes,
    defaultCommonCardArgs,
    getAsset,
    getButtonLink,
    getButtonPrimary,
    getButtonSecondary,
    getTopActions,
    imageAndVideoArgTypes,
    imageNameToUrl,
    normalizeAspectRatio,
    ThemeVariantWrapper,
    videoNameToUrl,
} from './card-common';

import type {Variant} from '../theme-variant-context';
import type {CardAspectRatio} from '../card-internal';
import type {CommonCardArgs} from './card-common';

export default {
    title: 'Components/Cards/CoverCard',
    parameters: {
        fullScreen: true,
    },
};

type CoverCardArgs = CommonCardArgs & {
    backgroundColor: string;
    footerBackgroundColor: string;
    gradientOverlayColor?: string;
    imageSrc: string;
    videoSrc: string;
};

export const Default: StoryComponent<CoverCardArgs> = ({
    width,
    height,
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
    ariaLabel,
    ariaDescription,
    ...args
}) => {
    return (
        <ThemeVariantWrapper variant={variantOutside}>
            <CoverCard
                width={width ? (Number.isFinite(+width) ? +width : width) : undefined}
                height={height ? (Number.isFinite(+height) ? +height : height) : undefined}
                titleAs={titleAs || undefined}
                pretitleAs={pretitleAs || undefined}
                asset={getAsset(asset)}
                variant={(variant as Variant) || undefined}
                footerVariant={footerVariant || undefined}
                aspectRatio={normalizeAspectRatio(aspectRatio) as CardAspectRatio}
                topActions={getTopActions(topActions)}
                imageSrc={imageNameToUrl[imageSrc as never]}
                videoSrc={videoNameToUrl[videoSrc as never]}
                slot={slot ? <Placeholder height={50} /> : undefined}
                footerSlot={footerSlot ? <Placeholder height={50} /> : undefined}
                buttonPrimary={getButtonPrimary(buttonPrimary)}
                buttonSecondary={getButtonSecondary(buttonSecondary)}
                buttonLink={getButtonLink(buttonLink)}
                onClose={onClose ? () => {} : undefined}
                onPress={onPress ? () => {} : undefined}
                aria-label={ariaLabel || undefined}
                aria-description={ariaDescription || undefined}
                {...args}
            />
        </ThemeVariantWrapper>
    );
};

Default.storyName = 'CoverCard';

Default.args = {
    ...defaultCommonCardArgs,
    backgroundColor: '',
    gradientOverlayColor: '',
    footerBackgroundColor: '',
    imageSrc: 'beach',
    videoSrc: 'undefined',
};

Default.argTypes = {
    ...commonArgTypes,
    ...imageAndVideoArgTypes,
};
