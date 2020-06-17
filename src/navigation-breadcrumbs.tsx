import * as React from 'react';
import {Link} from 'react-router-dom';
import Text from './text';
import {useTheme} from './hooks';

const BREADCRUMB_SEPARATOR = ' / ';

type NavigationBreadcrumbsProps = {
    title: string;
    breadcrumbs: Readonly<
        Array<{
            readonly title: string;
            readonly url: string;
        }>
    >;
};

const NavigationBreadcrumbs: React.FC<NavigationBreadcrumbsProps> = ({title, breadcrumbs}) => {
    const theme = useTheme();
    return (
        <div>
            {breadcrumbs.map(({title, url}, index) => (
                <React.Fragment key={index}>
                    <Link style={{textDecoration: 'none'}} to={url}>
                        <Text size={14} lineHeight="20px">
                            {title}
                        </Text>
                    </Link>
                    <Text size={14} lineHeight="20px">
                        {BREADCRUMB_SEPARATOR}
                    </Text>
                </React.Fragment>
            ))}
            <Text size={14} lineHeight="20px" color={theme.colors.textSecondary}>
                {title}
            </Text>
        </div>
    );
};

export default NavigationBreadcrumbs;
