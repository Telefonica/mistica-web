import * as React from 'react';
import {getMisticaLinkComponent} from '../theme';

import type {ThemeConfig} from '../theme';

export const ComponentIdentity = ({forwardRef = false}: {forwardRef?: boolean}): JSX.Element => {
    const Component = forwardRef ? React.forwardRef(() => <></>) : () => <></>;
    return (
        <input
            type="hidden"
            data-testid="same-component"
            value={String(getMisticaLinkComponent(Component as ThemeConfig['Link']) === Component)}
        />
    );
};
const Component = ({children, href}: React.ComponentProps<'a'>) => <a href={href}>{children}</a>;
const Link = getMisticaLinkComponent({Component, type: 'Next13'});
export const CustomLink = (): JSX.Element => <Link to="#">any text</Link>;
