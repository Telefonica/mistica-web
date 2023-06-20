import * as React from 'react';
import {GridLayout, ResponsiveLayout} from '..';
import {Placeholder} from '../placeholder';

export default {
    title: 'Layout/Grid layout',
};

export const WithoutTemplate: StoryComponent = () => (
    <ResponsiveLayout>
        <GridLayout verticalSpace={8}>
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
        </GridLayout>
    </ResponsiveLayout>
);

WithoutTemplate.storyName = 'Without template';

type WithTemplateArgs = {
    template: '6+6' | '8+4' | '4+6' | '5+4' | '3+9';
};

export const WithTemplate: StoryComponent<WithTemplateArgs> = ({template}) => (
    <ResponsiveLayout>
        <GridLayout template={template} left={<Placeholder />} right={<Placeholder />} />
    </ResponsiveLayout>
);

const templateOptions = ['6+6', '8+4', '4+6', '5+4', '3+9'];

WithTemplate.argTypes = {
    template: {
        options: templateOptions,
        control: {type: 'select'},
    },
};
WithTemplate.storyName = 'With template';
WithTemplate.args = {
    template: '6+6',
};
