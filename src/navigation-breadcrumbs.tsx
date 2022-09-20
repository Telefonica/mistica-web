/**
 * Figma: https://www.figma.com/file/BctaFHf0PVPX2uwRSl8taf/Breadcrumbs?node-id=2%3A61
 * Accessibility: https://www.w3.org/WAI/ARIA/apg/example-index/breadcrumb/index.html
 */
import * as React from 'react';
import {Text1} from './text';
import {useTheme} from './hooks';
import {createUseStyles} from './jss';
import {DataAttributes} from './utils/types';
import {getPrefixedDataAttributes} from './utils/dom';

const BREADCRUMB_SEPARATOR = ' / ';

const useStyles = createUseStyles(() => ({
    link: {
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    current: {
        textDecoration: 'none',
        pointerEvents: 'none',
    },
    list: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',
        '& > li': {
            display: 'inline',
        },
    },
}));

export type NavigationBreadcrumbsProps = {
    title: string;
    breadcrumbs: ReadonlyArray<{
        readonly title: string;
        readonly url: string;
    }>;
    children?: void;
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
};

const NavigationBreadcrumbs: React.FC<NavigationBreadcrumbsProps> = ({
    title,
    breadcrumbs,
    dataAttributes,
    'aria-label': ariaLabel = 'Breadcrumb',
}) => {
    const theme = useTheme();
    const Link = theme.Link;
    const classes = useStyles();
    return (
        <nav aria-label={ariaLabel} {...getPrefixedDataAttributes(dataAttributes)}>
            <ol className={classes.list}>
                {breadcrumbs.map(({title, url}, index) => (
                    <li key={index}>
                        <Link style={{textDecoration: 'none'}} to={url}>
                            <span className={classes.link}>
                                <Text1 regular>{title}</Text1>
                            </span>
                        </Link>
                        <span role="presentation">
                            <Text1 regular>{BREADCRUMB_SEPARATOR}</Text1>
                        </span>
                    </li>
                ))}
                <li>
                    {/* this anchor is added for accessibility, it is disabled */}
                    <a
                        aria-current="page"
                        href={document.location.href}
                        className={classes.current}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <Text1 regular color={theme.colors.textSecondary}>
                            {title}
                        </Text1>
                    </a>
                </li>
            </ol>
        </nav>
    );
};

export default NavigationBreadcrumbs;
