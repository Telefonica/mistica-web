'use client';

import * as React from 'react';
import {SidenavBar, SidenavSection, SidenavItem} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../../../generated/mistica-icons/icon-search-regular';

export default {
    title: 'Components/SidenavBar/Docs',
    component: SidenavSection,
    parameters: {
        fullScreen: true,
        docs: {
            source: {state: 'open'},
            description: {
                component: 'Section container for grouping navigation items within a SidenavBar.',
            },
        },
    },
    tags: ['autodocs'],
};

export const DocsSection = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Main navigation">
            <SidenavSection title="Example section">
                <SidenavItem id="item1" label="Item 1" asset={IconHomeRegular} href="#item1" />
                <SidenavItem id="item2" label="Item 2" asset={IconSearchRegular} href="#item2" />
            </SidenavSection>
        </SidenavBar>
    </div>
);

DocsSection.storyName = 'SidenavSection';
DocsSection.parameters = {
    docs: {
        source: {state: 'open'},
    },
};
