import * as React from 'react';
import {GridLayout, ResponsiveLayout} from '..';
import {Placeholder} from '../placeholder';

import type {VerticalSpace} from '../grid-layout';

export default {
    title: 'Layout/Grid layout',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    collapseBreakpoint: 'tablet' | 'mobile';
    verticalSpace: VerticalSpace;
};

const args = {
    collapseBreakpoint: 'tablet',
    verticalSpace: 8,
} as const;

const argTypes = {
    collapseBreakpoint: {
        options: ['tablet', 'mobile'],
        control: {type: 'select'},
    },
    verticalSpace: {
        options: [0, 2, 4, 8, 12, 16, 24, 32, 40],
        control: {type: 'select'},
    },
};

export const WithoutTemplate: StoryComponent<Args> = ({collapseBreakpoint, verticalSpace}) => (
    <ResponsiveLayout>
        <GridLayout collapseBreakpoint={collapseBreakpoint} verticalSpace={verticalSpace}>
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
WithoutTemplate.args = args;
WithoutTemplate.argTypes = argTypes;

export const SixAndSix: StoryComponent<Args> = ({collapseBreakpoint, verticalSpace}) => (
    <ResponsiveLayout>
        <GridLayout
            collapseBreakpoint={collapseBreakpoint}
            verticalSpace={verticalSpace}
            template="6+6"
            left={<Placeholder />}
            right={<Placeholder />}
        />
    </ResponsiveLayout>
);

SixAndSix.storyName = 'Template 6+6';
SixAndSix.args = args;
SixAndSix.argTypes = argTypes;

export const EightAndFour: StoryComponent<Args> = ({collapseBreakpoint, verticalSpace}) => (
    <ResponsiveLayout>
        <GridLayout
            collapseBreakpoint={collapseBreakpoint}
            verticalSpace={verticalSpace}
            template="8+4"
            left={<Placeholder />}
            right={<Placeholder />}
        />
    </ResponsiveLayout>
);

EightAndFour.storyName = 'Template 8+4';
EightAndFour.args = args;
EightAndFour.argTypes = argTypes;

export const FourAndSix: StoryComponent<Args> = ({collapseBreakpoint, verticalSpace}) => (
    <ResponsiveLayout>
        <GridLayout
            collapseBreakpoint={collapseBreakpoint}
            verticalSpace={verticalSpace}
            template="4+6"
            left={<Placeholder />}
            right={<Placeholder />}
        />
    </ResponsiveLayout>
);

FourAndSix.storyName = 'Template 4+6';
FourAndSix.args = args;
FourAndSix.argTypes = argTypes;

export const FiveAndFour: StoryComponent<Args> = ({collapseBreakpoint, verticalSpace}) => (
    <ResponsiveLayout>
        <GridLayout
            collapseBreakpoint={collapseBreakpoint}
            verticalSpace={verticalSpace}
            template="5+4"
            left={<Placeholder />}
            right={<Placeholder />}
        />
    </ResponsiveLayout>
);

FiveAndFour.storyName = 'Template 5+4';
FiveAndFour.args = args;
FiveAndFour.argTypes = argTypes;

export const ThreeAndNine: StoryComponent<Args> = ({collapseBreakpoint, verticalSpace}) => (
    <ResponsiveLayout>
        <GridLayout
            collapseBreakpoint={collapseBreakpoint}
            verticalSpace={verticalSpace}
            template="3+9"
            left={<Placeholder />}
            right={<Placeholder />}
        />
    </ResponsiveLayout>
);

ThreeAndNine.storyName = 'Template 3+9';
ThreeAndNine.args = args;
ThreeAndNine.argTypes = argTypes;
