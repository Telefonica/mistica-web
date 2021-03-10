import * as React from 'react';
import {Text1} from './text';
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
                        <Text1 regular>{title}</Text1>
                    </Link>
                    <Text1 regular>{BREADCRUMB_SEPARATOR}</Text1>
                </React.Fragment>
            ))}
            <Text1 regular color={theme.colors.textSecondary}>
                {title}
            </Text1>
        </div>
    );
};

export default NavigationBreadcrumbs;
