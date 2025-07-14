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

import type {CardAspectRatio, DefaultOrInverseVariant, SlotAlignment} from '../card-internal';
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
};

export const Default: StoryComponent<DataCardArgs> = ({
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
    slot,
    slotAlignment,
    footerSlot,
    titleAs,
    pretitleAs,
    ...args
}) => {
    return (
        <ThemeVariantWrapper variant={variantOutside}>
            <DataCard
                titleAs={titleAs || undefined}
                pretitleAs={pretitleAs || undefined}
                asset={getAsset(asset)}
                variant={(variant as DefaultOrInverseVariant) || undefined}
                footerVariant={footerVariant || undefined}
                aspectRatio={normalizeAspectRatio(aspectRatio) as CardAspectRatio}
                topActions={getTopActions(topActions)}
                slot={slot ? <Placeholder height={50} /> : undefined}
                slotAlignment={slotAlignment || undefined}
                footerSlot={slot ? <Placeholder height={50} /> : undefined}
                buttonPrimary={getButtonPrimary(buttonPrimary)}
                buttonSecondary={getButtonSecondary(buttonSecondary)}
                buttonLink={getButtonLink(buttonLink)}
                onClose={onClose ? () => {} : undefined}
                onPress={onPress ? () => {} : undefined}
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
};

Default.argTypes = {
    ...commonArgTypes,
    ...dataArgTypes,
};
