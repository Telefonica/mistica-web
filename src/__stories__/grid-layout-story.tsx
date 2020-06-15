// @flow
import * as React from 'react';
import {GridLayout, ResponsiveLayout} from '..';
import Placeholder from '../placeholder';

export default {
    title: 'Components|Layouts/GridLayout',
    parameters: {
        fullScreen: true,
    },
};

export const sixAndSix = (): React.Node => (
    <ResponsiveLayout>
        <GridLayout>
            <div style={{gridColumn: 'span 6'}}>
                <Placeholder />
            </div>
            <div style={{gridColumn: 'span 6'}}>
                <Placeholder />
            </div>
        </GridLayout>
    </ResponsiveLayout>
);
sixAndSix.story = {name: '6 + 6'};

export const eightAndFour = (): React.Node => (
    <ResponsiveLayout>
        <GridLayout>
            <div style={{gridColumn: 'span 8'}}>
                <Placeholder />
            </div>
            <div style={{gridColumn: 'span 4'}}>
                <Placeholder />
            </div>
        </GridLayout>
    </ResponsiveLayout>
);
eightAndFour.story = {name: '8 + 4'};
