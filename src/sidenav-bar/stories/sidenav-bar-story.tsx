import * as React from 'react';
import SidenavBar from '../index';

export default {
    title: 'Components/SidenavBar',
};

type Args = {
    label: string;
    content: string;
};

export const Default = ({label, content}: Args): React.JSX.Element => (
    <SidenavBar aria-label={label}>{content}</SidenavBar>
);

Default.storyName = 'SidenavBar';

Default.args = {
    label: 'Main navigation',
    content: 'Sidenav bar content',
};
