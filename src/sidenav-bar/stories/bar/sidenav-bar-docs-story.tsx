'use client';

import * as React from 'react';
import {SidenavBar, SidenavSection, SidenavItem} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../../../generated/mistica-icons/icon-search-regular';

export default {
    title: 'Components/SidenavBar/Bar',
    component: SidenavBar,
    parameters: {
        fullScreen: true,
        docs: {
            source: {state: 'open'},
        },
    },
    tags: ['autodocs'],
};

export const PropsShowcase = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Main navigation">
            <SidenavSection title="Example section">
                <SidenavItem id="item1" label="Item 1" asset={IconHomeRegular} href="#item1" />
                <SidenavItem id="item2" label="Item 2" asset={IconSearchRegular} href="#item2" />
            </SidenavSection>
        </SidenavBar>
    </div>
);

PropsShowcase.storyName = 'Props showcase (for docs)';
PropsShowcase.parameters = {
    docs: {
        controls: {
            include: [],
            hideNoControlsWarning: true,
        },
        source: {state: 'open'},
    },
};
