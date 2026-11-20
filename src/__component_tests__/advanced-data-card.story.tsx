import * as React from 'react';
import {AdvancedDataCard} from '../community';
import Tag from '../tag';
import Stack from '../stack';
import {Text2} from '../text';

export const AccessibleName = ({
    action,
    ...props
}: {action: 'href' | 'to' | 'onPress'} & Pick<
    React.ComponentProps<typeof AdvancedDataCard>,
    'pretitleAs' | 'titleAs'
>): JSX.Element => (
    <AdvancedDataCard
        {...props}
        {...(action === 'href'
            ? {href: 'https://example.org'}
            : action === 'to'
              ? {to: '/foo/bar'}
              : {onPress: () => {}})}
        headline={<Tag type="promo">Headline</Tag>}
        pretitle="Pretitle"
        title="Title"
        subtitle="Subtitle"
        description="Description"
        slot={[
            <Stack space={4}>
                <Text2 regular>Extra line 1</Text2>
                <Text2 regular>Extra line 2</Text2>
            </Stack>,
            <Stack space={4}>
                <Text2 regular>Extra line 3</Text2>
                <Text2 regular>Extra line 4</Text2>
            </Stack>,
        ]}
    />
);
