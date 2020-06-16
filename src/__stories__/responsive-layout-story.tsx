// @flow
import * as React from 'react';
import {ResponsiveLayout} from '..';
import Placeholder from '../placeholder';

export default {
    title: 'Components|Layouts/ResponsiveLayout',
    parameters: {
        fullScreen: true,
    },
};

export const Default = (): React.ReactNode => (
    <ResponsiveLayout>
        <Placeholder />
    </ResponsiveLayout>
);

Default.story = {name: 'ResponsiveLayout'};
