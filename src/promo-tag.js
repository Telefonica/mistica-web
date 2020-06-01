// @flow
import * as React from 'react';
import Text from './text';
import {useTheme} from './hooks';
import {createUseStyles} from './jss';

const useStyles = createUseStyles((theme) => ({
    tag: {
        backgroundColor: theme.colors.backgroundPromo,
        padding: '0 8px',
        borderRadius: 2,
        height: 20,
        minWidth: 48,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

type Props = {
    children: string,
};

const PromoTag = ({children}: Props): React.Element<'span'> => {
    const classes = useStyles();
    const {colors} = useTheme();
    return (
        <span className={classes.tag}>
            <Text size={12} color={colors.textPrimaryInverse} uppercase>
                {children}
            </Text>
        </span>
    );
};

export default PromoTag;
