import * as React from 'react';
import {InfoFeedbackScreen} from '../feedback';
import {ButtonPrimary} from '../button';
import {Placeholder} from '../placeholder';
import IconShoppingBagRegular from '../generated/mistica-icons/icon-shopping-bag-regular';

export default {
    title: 'Patterns/Feedback/InfoFeedbackScreen',
    parameters: {
        fullScreen: true,
    },
    argTypes: {
        asset: {
            options: ['default', 'custom'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    asset: string;
    title: string;
    description: string;
    multipleParagraphs: boolean;
    extra: boolean;
};

export const Info: StoryComponent<Args> = ({asset, title, description, multipleParagraphs, extra}) => (
    <InfoFeedbackScreen
        title={title}
        description={multipleParagraphs ? [description, 'paragraph 2', 'paragraph 3'] : description}
        primaryButton={<ButtonPrimary onPress={() => {}}>Action1</ButtonPrimary>}
        Icon={asset === 'custom' ? IconShoppingBagRegular : undefined}
        extra={extra ? <Placeholder /> : undefined}
    />
);

Info.storyName = 'InfoFeedbackScreen';
Info.args = {
    asset: 'default',
    title: "I'm the title",
    description: "I'm the description",
    multipleParagraphs: false,
    extra: false,
};
