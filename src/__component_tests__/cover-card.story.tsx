import beachVideo from '../__stories__/videos/beach.mp4';
import * as React from 'react';
import {CoverCard} from '../card-cover';
import {makeTheme} from '../test-utils/theme';
import ThemeContextProvider from '../theme-context-provider';
import {ButtonPrimary, ButtonLink} from '../button';
import IconMobileDeviceRegular from '../generated/mistica-icons/icon-mobile-device-regular';
import IconStarFilled from '../generated/mistica-icons/icon-star-filled';
import IconStarRegular from '../generated/mistica-icons/icon-star-regular';
import {useThemeVariant} from '../theme-variant-context';

export const VideoTabOrder = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <CoverCard
                videoSrc={beachVideo}
                aria-label="Card Touchable"
                onClose={() => {}}
                closeButtonLabel="Close label"
                onPress={() => {}}
                topActions={[
                    {
                        Icon: IconMobileDeviceRegular,
                        onPress: () => alert('Icon pressed'),
                        label: 'Device Icon',
                    },
                    {
                        checkedProps: {Icon: IconStarFilled, label: 'Star Checked'},
                        uncheckedProps: {Icon: IconStarRegular, label: 'Star Unchecked'},
                        defaultChecked: true,
                        onChange: () => {},
                    },
                ]}
                showFooter
                buttonPrimary={
                    <ButtonPrimary onPress={() => {}} small>
                        Button Primary
                    </ButtonPrimary>
                }
                buttonLink={
                    <ButtonLink onPress={() => {}} small>
                        Button Link
                    </ButtonLink>
                }
                title="Title"
                description="Description"
            />
        </ThemeContextProvider>
    );
};
export const ImageVariant = (): JSX.Element => {
    const Slot = () => {
        const variant = useThemeVariant();
        return <div data-testid="slot-element">{variant}</div>;
    };
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <CoverCard
                imageSrc="https://example.com/image.jpg"
                title="Title"
                description="Description"
                slot={<Slot />}
            />
        </ThemeContextProvider>
    );
};
