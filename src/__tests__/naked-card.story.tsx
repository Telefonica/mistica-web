import * as React from 'react';
import {NakedCard} from '../card-naked';
import Tag from '../tag';
import Stack from '../stack';
import {Text2} from '../text';

export const AccessibleName = ({
    action,
    snap = false,
    ...props
}: {action: 'href' | 'to' | 'onPress'; snap?: boolean} & Pick<
    React.ComponentProps<typeof NakedCard>,
    'pretitleAs' | 'titleAs'
>): JSX.Element => (
    <NakedCard
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
            <NakedCard
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
