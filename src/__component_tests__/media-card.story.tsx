import * as React from 'react';
import {MediaCard} from '../card-media';
import Tag from '../tag';
import Stack from '../stack';
import {Text2} from '../text';
import beachVideo from '../__stories__/videos/beach.mp4';
import {ButtonPrimary, ButtonLink} from '../button';
import IconMobileDeviceRegular from '../generated/mistica-icons/icon-mobile-device-regular';
import IconStarFilled from '../generated/mistica-icons/icon-star-filled';
import IconStarRegular from '../generated/mistica-icons/icon-star-regular';

export const AccessibleName = ({
    action,
    snap = false,
    ...props
}: {action: 'href' | 'to' | 'onPress'; snap?: boolean} & Pick<
    React.ComponentProps<typeof MediaCard>,
    'pretitleAs' | 'titleAs'
>): JSX.Element => (
    <MediaCard
        {...props}
        {...(action === 'href'
            ? {href: 'https://example.org'}
            : action === 'to'
              ? {to: '/foo/bar'}
              : {onPress: () => {}})}
        imageSrc="https://source.unsplash.com/900x900/"
        {...(snap
            ? {size: 'snap' as const, subtitle: 'Subtitle'}
            : {headline: <Tag type="promo">Headline</Tag>, pretitle: 'Pretitle'})}
        title="Title"
        description="Description"
        slot={
            <Stack space={4}>
                <Text2 regular>Extra line 1</Text2>
                <Text2 regular>Extra line 2</Text2>
            </Stack>
        }
    />
);
export const Closable = (): JSX.Element => {
    const [calls, setCalls] = React.useState(0);
    return (
        <>
            <MediaCard
                onClose={() => setCalls((count) => count + 1)}
                closeButtonLabel="custom close label"
                title="Title"
                description="Description"
                imageSrc="https://source.unsplash.com/900x900/"
            />
            <input type="hidden" data-testid="closes" value={calls} />
        </>
    );
};

export const VideoTabOrder = ({mediaPosition}: {mediaPosition: 'top' | 'left' | 'right'}): JSX.Element => {
    return (
        <>
            <MediaCard
                mediaPosition={mediaPosition}
                videoSrc={beachVideo}
                aria-label="Card touchable"
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
        </>
    );
};
export const ImageLabel = (): JSX.Element => (
    <MediaCard
        title="Title"
        subtitle="Subtitle"
        description="Description"
        imageSrc="image.jpg"
        imageAlt="Image description"
        href="/"
    />
);
