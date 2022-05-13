import * as React from 'react';
import {Text1, Text2} from './text';
import {useTheme} from './hooks';
import Inline from './inline';
import {createUseStyles} from './jss';
import {pxToRem} from './utils/css';

const useStyles = createUseStyles((theme) => ({
    right: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        height: pxToRem(20),
        [theme.mq.tabletOrSmaller]: {
            height: pxToRem(16),
        },
    },
}));

type Props = {
    children: React.ReactNode;
    id?: string;
    right?: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4';
};

const SectionTitle: React.FC<Props> = ({children, id, right, as = 'h3'}) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Inline space="between">
            <Text1 color={theme.colors.textSecondary} transform="uppercase" medium as={as} id={id}>
                {children}
            </Text1>
            {!!right && (
                <div className={classes.right}>
                    <Text2 regular>{right}</Text2>
                </div>
            )}
        </Inline>
    );
};

export default SectionTitle;
