import * as React from 'react';
import {NavigationBreadcrumbs, ThemeVariant, useTheme} from '..';

export default {
    title: 'Components/Breadcrumbs',
};

type Args = {
    inverse: boolean;
};

export const Default: StoryComponent<Args> = ({inverse}) => {
    const {colors} = useTheme();
    return (
        <ThemeVariant isInverse={inverse}>
            <div style={{background: inverse ? colors.backgroundBrand : colors.background}}>
                <NavigationBreadcrumbs
                    dataAttributes={{testid: 'story'}}
                    title="Subsection"
                    breadcrumbs={[
                        {title: 'Home', url: 'https://example.org?path=home'},
                        {title: 'Section', url: 'https://example.org?path=section'},
                    ]}
                />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Breadcrumbs';

Default.args = {
    inverse: false,
};
