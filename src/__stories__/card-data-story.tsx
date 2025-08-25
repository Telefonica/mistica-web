import * as React from 'react';
import {DataCard, Placeholder} from '..';
import {
    commonArgTypes,
    dataArgTypes,
    defaultCommonCardArgs,
    getAsset,
    getButtonLink,
    getButtonPrimary,
    getButtonSecondary,
    getTopActions,
    normalizeAspectRatio,
    ThemeVariantWrapper,
} from './card-common';

import type {Variant} from '../theme-variant-context';
import type {CardAspectRatio, SlotAlignment} from '../card-internal';
import type {CommonCardArgs} from './card-common';

export default {
    title: 'Components/Cards/DataCard',
    parameters: {
        fullScreen: true,
    },
};

type DataCardArgs = CommonCardArgs & {
    slotAlignment: SlotAlignment | '';
    backgroundColor: string;
    footerBackgroundColor: string;
};

export const Default: StoryComponent<DataCardArgs> = ({
    asset,
    width,
    height,
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
    slot,
    slotAlignment,
    footerSlot,
    titleAs,
    pretitleAs,
    ariaLabel,
    ariaDescription,
    ...args
}) => {
    return (
        <ThemeVariantWrapper variant={variantOutside}>
            <DataCard
                width={width ? (Number.isFinite(+width) ? +width : width) : undefined}
                height={height ? (Number.isFinite(+height) ? +height : height) : undefined}
                titleAs={titleAs || undefined}
                pretitleAs={pretitleAs || undefined}
                asset={getAsset(asset)}
                variant={(variant as Variant) || undefined}
                footerVariant={footerVariant || undefined}
                aspectRatio={normalizeAspectRatio(aspectRatio) as CardAspectRatio}
                topActions={getTopActions(topActions)}
                slot={slot ? <Placeholder height={50} /> : undefined}
                slotAlignment={slotAlignment || undefined}
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

Default.storyName = 'DataCard';

Default.args = {
    ...defaultCommonCardArgs,
    slotAlignment: '',
    backgroundColor: '',
    footerBackgroundColor: '',
};

Default.argTypes = {
    ...commonArgTypes,
    ...dataArgTypes,
};
