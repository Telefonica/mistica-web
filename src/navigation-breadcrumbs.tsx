import * as React from 'react';
import {Text7} from './text';
import {useTheme} from './hooks';

const BREADCRUMB_SEPARATOR = ' / ';

type NavigationBreadcrumbsProps = {
    title: string;
    breadcrumbs: ReadonlyArray<{
        readonly title: string;
        readonly url: string;
    }>;
};

const NavigationBreadcrumbs: React.FC<NavigationBreadcrumbsProps> = ({title, breadcrumbs}) => {
    const theme = useTheme();
    const Link = theme.Link;
    return (
        <div>
            {breadcrumbs.map(({title, url}, index) => (
                <React.Fragment key={index}>
                    <Link style={{textDecoration: 'none'}} to={url}>
                        <Text7 regular>{title}</Text7>
                    </Link>
                    <Text7 regular>{BREADCRUMB_SEPARATOR}</Text7>
                </React.Fragment>
            ))}
            <Text7 color={theme.colors.textSecondary}>{title}</Text7>
        </div>
    );
};

export default NavigationBreadcrumbs;
