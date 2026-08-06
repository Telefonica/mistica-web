'use client';

import * as React from 'react';
import {SidenavBar, SidenavSection, SidenavItem} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';
import IconDocumentsRegular from '../../../generated/mistica-icons/icon-documents-regular';
import IconSearchRegular from '../../../generated/mistica-icons/icon-search-regular';

export default {
    title: 'Components/SidenavBar/Bar',
};

export const DeepNesting = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Nested items example">
            <SidenavSection>
                <SidenavItem id="home" label="Home" asset={IconHomeRegular} href="#home" />
            </SidenavSection>
            <SidenavSection title="Navigation" dividerTop>
                <SidenavItem id="products" label="Products" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem id="web" label="Web App" asset={IconDocumentsRegular} href="#web" />
                    <SidenavItem id="mobile" label="Mobile App" asset={IconDocumentsRegular} href="#mobile" />
                    <SidenavItem
                        id="desktop"
                        label="Desktop App"
                        asset={IconDocumentsRegular}
                        href="#desktop"
                    />
                    <SidenavItem id="api" label="API Docs" href="#api" />
                </SidenavItem>
                <SidenavItem id="resources" label="Resources" asset={IconFolderRegular}>
                    <SidenavItem id="docs" label="Documentation" asset={IconDocumentsRegular} href="#docs" />
                    <SidenavItem id="examples" label="Examples" asset={IconSearchRegular} href="#examples" />
                    <SidenavItem id="faq" label="FAQ" href="#faq" />
                </SidenavItem>
                <SidenavItem id="other" label="Other" asset={IconSearchRegular} href="#other" />
            </SidenavSection>
        </SidenavBar>
    </div>
);

DeepNesting.storyName = 'Nested items';
