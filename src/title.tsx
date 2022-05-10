import * as React from 'react';
import {Text1, Text2, Text5} from './text';
import {useTheme} from './hooks';
import Inline from './inline';
import {createUseStyles} from './jss';
import {pxToRem} from './utils/css';

const useStyles = createUseStyles((theme) => ({
    right: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        height: ({desktopLinkHeight}) => pxToRem(desktopLinkHeight),
        [theme.mq.tabletOrSmaller]: {
            height: ({mobileLinkHeight}) => pxToRem(mobileLinkHeight),
        },
    },
}));

type TitleLayoutProps = {
    title: React.ReactElement;
    desktopLinkHeight: number;
    mobileLinkHeight: number;
    right?: React.ReactNode;
};

const TitleLayout = ({
    title,
    right,
    desktopLinkHeight,
    mobileLinkHeight,
}: TitleLayoutProps): React.ReactElement => {
    const classes = useStyles({desktopLinkHeight, mobileLinkHeight});

    if (!right) {
        return title;
    }

    return (
        <Inline space="between">
            {title}
            <div className={classes.right}>
                <Text2 regular>{right}</Text2>
            </div>
        </Inline>
    );
};

type TitleProps = {
    children: React.ReactNode;
    id?: string;
    right?: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export const Title1 = ({children, as = 'h3', id, right}: TitleProps): React.ReactElement => {
    const theme = useTheme();

    return (
        <TitleLayout
            desktopLinkHeight={20}
            mobileLinkHeight={16}
            title={
                <Text1 color={theme.colors.textSecondary} transform="uppercase" medium as={as} id={id}>
                    {children}
                </Text1>
            }
            right={right}
        />
    );
};

export const Title2 = ({children, as = 'h3', id, right}: TitleProps): React.ReactElement => {
    return (
        <TitleLayout
            desktopLinkHeight={32}
            mobileLinkHeight={24}
            title={
                <Text5 as={as} id={id}>
                    {children}
                </Text5>
            }
            right={right}
        />
    );
};
