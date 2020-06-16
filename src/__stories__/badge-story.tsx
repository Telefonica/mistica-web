// @flow
import * as React from 'react';
import {StorySection} from './helpers';
import Badge from '../badge';

const IcnSettings = ({color = '#00a9e0'}: {color?: string}) => (
    <svg role="presentation" width="24" height="24" viewBox="0 0 24 24">
        <path
            fill={color}
            fillRule="evenodd"
            d="M11.98 15.998a3.998 3.998 0 1 1 0-7.996 3.998 3.998 0 0 1 0 7.996zm11.769-4.078c-.043-1.471-1.268-2.656-2.837-2.656-.379-.008-.707-.238-.855-.629-.148-.33-.077-.712.236-1.025.517-.51.814-1.217.814-1.939s-.297-1.429-.814-1.939c-1.044-1.03-2.808-1.083-3.959.054a.924.924 0 0 1-1.021.176.885.885 0 0 1-.549-.808v-.169C14.764 1.477 13.524.25 12 .25c-1.525 0-2.765 1.227-2.765 2.735v.166a.895.895 0 0 1-.558.815c-.338.148-.748.076-1.066-.234-1.045-1.029-2.862-1.03-3.903-.001a2.698 2.698 0 0 0-.816 1.94c0 .734.289 1.423.869 1.993.257.259.328.641.161 1.016-.127.341-.462.576-.908.584-1.497 0-2.721 1.185-2.763 2.656l-.001.159h.001c.042 1.472 1.267 2.656 2.836 2.656a.937.937 0 0 1 .854.629c.148.331.077.713-.233 1.025a2.698 2.698 0 0 0-.816 1.94 2.7 2.7 0 0 0 .814 1.938c1.045 1.031 2.806 1.083 3.959-.054a.938.938 0 0 1 1.02-.176c.332.14.548.459.55.808v.169c0 1.509 1.24 2.736 2.765 2.736 1.524 0 2.764-1.227 2.764-2.736v-.166a.891.891 0 0 1 .556-.814c.346-.151.745-.079 1.067.233 1.045 1.03 2.863 1.029 3.906.001.517-.51.814-1.217.814-1.939 0-.723-.297-1.429-.869-1.994-.258-.259-.329-.64-.162-1.015.129-.347.457-.576.909-.585 1.498 0 2.721-1.184 2.764-2.656l.001-.159h-.001z"
        ></path>
    </svg>
);

export default {
    title: 'Components|Hints/Badge',
};

export const badge = (): React.ReactNode => (
    <>
        <StorySection title="Badge (non numeric)">
            <Badge>
                <IcnSettings />
            </Badge>
        </StorySection>

        <StorySection title="Badge (numeric, value 2)">
            <Badge value={2}>
                <IcnSettings />
            </Badge>
        </StorySection>

        <StorySection title="Badge (numeric, value 14)">
            <Badge value={14}>
                <IcnSettings />
            </Badge>
        </StorySection>

        <StorySection title="Badge (numeric, value 0)">
            <Badge value={0}>
                <IcnSettings />
            </Badge>
        </StorySection>

        <StorySection title="Badge (numeric, value 3) (inverse)">
            <div style={{padding: 20, background: '#00a9e0'}}>
                <Badge value={3}>
                    <IcnSettings color="#fff" />
                </Badge>
            </div>
        </StorySection>
    </>
);
