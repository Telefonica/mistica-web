'use client';

import * as React from 'react';
import {SidenavBar} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';
import IconDocumentsRegular from '../../../generated/mistica-icons/icon-documents-regular';
import IconSearchRegular from '../../../generated/mistica-icons/icon-search-regular';

import type {SidenavSection} from '../../sidenav-types';

export default {
    title: 'Components/SidenavBar/Bar',
    parameters: {
        fullScreen: true,
    },
};

export const DeepNesting = (): React.JSX.Element => {
    const sections: SidenavSection[] = [
        {
            items: [
                {
                    id: 'home',
                    label: 'Home',
                    asset: IconHomeRegular,
                    href: '#home',
                },
            ],
        },
        {
            title: 'Navigation',
            dividerTop: true,
            items: [
                {
                    id: 'products',
                    label: 'Products',
                    asset: IconFolderRegular,
                    defaultOpen: true,
                    children: [
                        {
                            id: 'web',
                            label: 'Web App',
                            asset: IconDocumentsRegular,
                            href: '#web',
                        },
                        {
                            id: 'mobile',
                            label: 'Mobile App',
                            asset: IconDocumentsRegular,
                            href: '#mobile',
                        },
                        {
                            id: 'desktop',
                            label: 'Desktop App',
                            asset: IconDocumentsRegular,
                            href: '#desktop',
                        },
                        {
                            id: 'api',
                            label: 'API Docs',
                            href: '#api',
                        },
                    ],
                },
                {
                    id: 'resources',
                    label: 'Resources',
                    asset: IconFolderRegular,
                    children: [
                        {
                            id: 'docs',
                            label: 'Documentation',
                            asset: IconDocumentsRegular,
                            href: '#docs',
                        },
                        {
                            id: 'examples',
                            label: 'Examples',
                            asset: IconSearchRegular,
                            href: '#examples',
                        },
                        {
                            id: 'faq',
                            label: 'FAQ',
                            href: '#faq',
                        },
                    ],
                },
                {
                    id: 'other',
                    label: 'Other',
                    asset: IconSearchRegular,
                    href: '#other',
                },
            ],
        },
    ];

    return (
        <div style={{height: '100vh'}}>
            <SidenavBar aria-label="Nested items example" sections={sections} />
        </div>
    );
};

DeepNesting.storyName = 'Nested items';
