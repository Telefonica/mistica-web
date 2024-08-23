import * as React from 'react';
import {InfoFeedbackScreen} from '../feedback';
import {ButtonPrimary} from '../button';
import IconError from '../icons/icon-error';
import {Placeholder} from '../placeholder';

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
    extra: boolean;
};

export const Info: StoryComponent<Args> = ({asset, extra}) => (
    <InfoFeedbackScreen
        title="I'm the title"
        description="I'm the description"
        primaryButton={<ButtonPrimary onPress={() => {}}>Action1</ButtonPrimary>}
        Icon={asset === 'custom' ? IconError : undefined}
        extra={extra ? <Placeholder /> : undefined}
    />
);

Info.storyName = 'InfoFeedbackScreen';
Info.args = {
    asset: 'default',
    extra: false,
};
